import { createContext, useContext, useEffect, useState } from "react";
import { useQuery } from "react-query";
import API_ENDPOINTS from "../constants/api";
import useComments, { IUseComments } from "../hooks/useComments";
import {
  ICommentApiResponseModel,
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
  updatedAt?: Date;
  userReaction?: IReactionTypes;
  loadedComments: ICommentApiResponseModel[];
  updateUserReaction: (reaction: IReactionTypes) => void;
  reactionsCount: IReactionCountApiModel;
  totalReactionsCount: number;
  incrementReactionCount: (reaction: IReactionTypes) => void;
  decrementReactionCount: (reaction: IReactionTypes) => void;
  commentsCount: number;
  incrementCommentsCount: () => void;
  decrementCommentsCount: () => void;
  commentsQuery?: IUseComments;
  allCommentsFetched: boolean;
}

const ResourceContext = createContext<IResourceContext>({
  id: "",
  type: "post",
  sourceId: "",
  sourceType: "user",
  sourceInfo: {
    name: "",
    headline: "",
    displayPictureUrl: "",
    backgroundImageUrl: "",
    id: "",
    email: "",
  },
  createdAt: new Date(Date.now()),
  updatedAt: new Date(Date.now()),
  resourceId: undefined,
  resourceType: undefined,
  userReaction: undefined,
  loadedComments: [],
  relatedSourceMap: {},
  updateUserReaction: () => {},
  reactionsCount: {
    laugh: 0,
    like: 0,
    support: 0,
    sad: 0,
    love: 0,
  },
  totalReactionsCount: 0,
  incrementReactionCount: () => {},
  decrementReactionCount: () => {},
  commentsCount: 0,
  incrementCommentsCount: () => {},
  decrementCommentsCount: () => {},
  commentsQuery: undefined,
  allCommentsFetched: false,
});

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
    | "updatedAt"
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
  updatedAt,
  children,
}) => {
  const sourceInfo = relatedSourceMap[sourceId];
  const { accessToken } = useAuthContext();
  const [reactionUpdateReqBody, setReactionUpdateReqBody] = useState<
    ICreateReactionApiRequest | undefined
  >();

  const { incrementCommentsCount: incrementParentCommentsCount } =
    useResourceContext();

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
    setCommentsCountState((prev) => prev + 1);
    if (type === "comment") {
      incrementParentCommentsCount();
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
    setCommentsCountState(prev => prev - 1);
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
    useState<number>(commentsCount);

  const [loadedCommentsState, setLoadedComments] =
    useState<ICommentApiResponseModel[]>(loadedComments);

  const incrementReactionCount = (reaction: IReactionTypes) => {
    setReactionsCountState(prev => ({
      ...prev,
      [reaction]: prev[reaction] + 1,
    }));
  };

  const decrementReactionCount = (reaction: IReactionTypes) => {
    setReactionsCountState(prev => ({
      ...prev,
      [reaction]: prev[reaction] - 1,
    }));
  };

  useEffect(() => {
    loadedComments.forEach(comment => {
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
        totalReactionsCount: Object.values(reactionsCount).reduce(
          (reactionCount, totalCount) => reactionCount + totalCount,
          0
        ),
        incrementReactionCount,
        decrementReactionCount,
        commentsCount: commentsCountState,
        relatedSourceMap,
        createdAt,
        updatedAt,
        incrementCommentsCount,
        decrementCommentsCount,
        commentsQuery: commentsQuery,
        allCommentsFetched:
          commentsQuery.uptoDateComments.length === commentsCount,
      }}
    >
      {children}
    </ResourceContext.Provider>
  );
};

const useResourceContext = (): IResourceContext => {
  const resourceContext = useContext(ResourceContext);
  return resourceContext;
};

export { useResourceContext };
export default ResourceProvider;