import { createContext, useContext, useEffect, useState } from "react";
import { useQuery } from "react-query";
import API_ENDPOINTS from "../constants/api";
import { LABELS } from "../constants/labels";
import useComments, { IUseComments } from "../hooks/useComments";
import {
  ICommentApiModel,
  ICommentCountApiModel,
  ICreateReactionApiRequest,
  IReactionCountApiModel,
  IReactionTypes,
  IRelatedSource,
  IResourceTypes,
  ISourceTypes,
} from "../interfaces/api/external";
import { createReaction, deleteReaction } from "../utils/api";
import { useAuthContext } from "./AuthContext";

interface IResourceContext {
  id: string;
  type: IResourceTypes;
  sourceId: string;
  sourceType: ISourceTypes;
  sourceInfo: IRelatedSource;
  resourceId?: string;
  resourceType?: IResourceTypes;
  relatedSourceMap: Record<string, IRelatedSource>;
  createdAt: Date;
  userReaction?: IReactionTypes;
  loadedComments: ICommentApiModel[];
  updateUserReaction: (reaction: IReactionTypes) => void;
  reactionsCount: IReactionCountApiModel;
  totalReactionsCount: number;
  incrementReactionCount: (reaction: IReactionTypes) => void;
  decrementReactionCount: (reaction: IReactionTypes) => void;
  commentsCount: ICommentCountApiModel;
  totalCommentsCount: number;
  incrementCommentsCount: () => void;
  decrementCommentsCount: () => void;
  commentsQuery?: IUseComments;
  allCommentsFetched: boolean;
}

const ResourceContext = createContext<IResourceContext | undefined>(undefined);

interface IResourceProviderProps
  extends Pick<
    IResourceContext,
    | "commentsCount"
    | "reactionsCount"
    | "userReaction"
    | "loadedComments"
    | "id"
    | "type"
    | "sourceId"
    | "sourceType"
    | "resourceId"
    | "resourceType"
    | "createdAt"
    | "relatedSourceMap"
  > {}

const ResourceProvider: React.FC<IResourceProviderProps> = ({
  id,
  type,
  sourceId,
  sourceType,
  resourceId,
  resourceType,
  commentsCount,
  reactionsCount,
  userReaction,
  loadedComments,
  relatedSourceMap,
  createdAt,
  children,
}) => {
  const sourceInfo = relatedSourceMap[sourceId];
  const { accessToken } = useAuthContext();
  const [reactionUpdateReqBody, setReactionUpdateReqBody] = useState<
    ICreateReactionApiRequest | undefined
  >();

  const parentResourceContext = useResourceContext();
  if (!parentResourceContext) {
    if (type === "comment") {
      throw Error(LABELS.RESOURCE_CONTEXT_UNINITIALIZED);
    }
  }

  const { status: createReactionResStatus, remove: clearCreateReactionQuery } =
    useQuery(
      `CREATE:${API_ENDPOINTS.CREATE_REACTION.key}-${id}-${type}`,
      () =>
        createReaction(
          accessToken as string,
          reactionUpdateReqBody as ICreateReactionApiRequest
        ),
      { cacheTime: 0, refetchInterval: false, enabled: !!reactionUpdateReqBody }
    );

  const { refetch: deleteReactionTrigger } = useQuery(
    `DELETE${API_ENDPOINTS.DELETE_REACTION.key}-${id}-${type}`,
    () => deleteReaction(accessToken as string, type, id),
    { cacheTime: 0, refetchInterval: false, enabled: false }
  );

  useEffect(() => {
    if (createReactionResStatus === "success") {
      clearCreateReactionQuery;
    }
  }, [clearCreateReactionQuery, createReactionResStatus]);

  const incrementCommentsCount = () => {
    setCommentsCountState((prev) => ({ ...prev, comment: prev.comment + 1 }));
    if (type === "comment") {
      parentResourceContext?.incrementCommentsCount();
    }
  };

  const updateUserReaction = (reaction: IReactionTypes) => {
    const reactionReqBody = {
      resourceId: id as string,
      resourceType: type as IResourceTypes,
      reaction,
    };

    if (userReactionState) {
      if (reaction !== userReactionState) {
        setReactionUpdateReqBody(reactionReqBody);
        setUserReactionState(reaction);
        decrementReactionCount(userReactionState);
        incrementReactionCount(reaction);
      } else {
        decrementReactionCount(reaction);
        setUserReactionState(undefined);
        deleteReactionTrigger();
      }
    } else {
      setReactionUpdateReqBody(reactionReqBody);
      setUserReactionState(reaction);
      incrementReactionCount(reaction);
    }
  };

  const decrementCommentsCount = () => {
    setCommentsCountState((prev) => ({ ...prev, comment: prev.comment - 1 }));
    if (type === "comment") {
      parentResourceContext?.decrementCommentsCount();
    }
  };

  const commentsQuery = useComments(
    type,
    id,
    true,
    incrementCommentsCount,
    decrementCommentsCount
  );

  const [userReactionState, setUserReactionState] = useState<
    IReactionTypes | undefined
  >(userReaction);

  const [reactionsCountState, setReactionsCountState] =
    useState<IReactionCountApiModel>(reactionsCount);

  const [commentsCountState, setCommentsCountState] =
    useState<ICommentCountApiModel>(commentsCount);

  const [loadedCommentsState, setLoadedCommentsState] =
    useState<ICommentApiModel[]>(loadedComments);

  const incrementReactionCount = (reaction: IReactionTypes) => {
    setReactionsCountState((prev) => ({
      ...prev,
      [reaction]: prev[reaction] + 1,
    }));
  };

  const decrementReactionCount = (reaction: IReactionTypes) => {
    setReactionsCountState((prev) => ({
      ...prev,
      [reaction]: prev[reaction] - 1,
    }));
  };

  useEffect(() => {
    loadedComments.forEach((comment) => {
      commentsQuery.appendComment(comment);
    });
  }, [commentsQuery, loadedComments]);

  useEffect(() => {
    setUserReactionState(userReaction);
  }, [userReaction]);

  useEffect(() => {
    setReactionsCountState(reactionsCount);
  }, [reactionsCount]);

  useEffect(() => {
    setCommentsCountState(commentsCount);
  }, [commentsCount]);

  return (
    <ResourceContext.Provider
      value={{
        id,
        type,
        sourceId,
        sourceType,
        sourceInfo: sourceInfo as IRelatedSource,
        resourceId,
        resourceType,
        userReaction: userReactionState,
        updateUserReaction,
        loadedComments: loadedCommentsState,
        reactionsCount: reactionsCountState,
        totalReactionsCount: Object.values(reactionsCountState).reduce(
          (reactionCount, totalCount) => reactionCount + totalCount,
          0
        ),
        incrementReactionCount,
        decrementReactionCount,
        commentsCount: commentsCountState,
        totalCommentsCount: Object.values(commentsCountState).reduce(
          (commentCount, totalCount) => commentCount + totalCount,
          0
        ),
        relatedSourceMap,
        createdAt,
        incrementCommentsCount,
        decrementCommentsCount,
        commentsQuery: commentsQuery,
        allCommentsFetched:
          commentsQuery.uptoDateComments.length === commentsCountState.comment,
      }}
    >
      {children}
    </ResourceContext.Provider>
  );
};

const useResourceContext = (): IResourceContext | undefined => {
  const resourceContext = useContext(ResourceContext);
  return resourceContext;
};

export { useResourceContext };
export default ResourceProvider;
