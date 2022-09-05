import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { useQuery } from "react-query";
import API_ENDPOINTS from "../constants/api";
import { LABELS } from "../constants/labels";
import useCommentsForResource, {
  IUseCommentsForResourceReturn,
} from "../hooks/useCommentsForResource";
import usePost from "../hooks/usePost";
import {
  ICommentApiModel,
  ICommentContentApiModel,
  ICommentCountApiModel,
  ICreateReactionApiRequest,
  IPostContentApiModel,
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
  content: IPostContentApiModel | ICommentContentApiModel;
  relatedSourceMap: Record<string, IRelatedSource>;
  createdAt: Date;
  updatedAt?: Date;
  userReaction?: IReactionTypes;
  loadedComments: ICommentApiModel[];
  updateUserReaction: (reaction: IReactionTypes) => void;
  reactionsCount: IReactionCountApiModel;
  totalReactionsCount: number;
  incrementReactionCount: (reaction: IReactionTypes) => void;
  decrementReactionCount: (reaction: IReactionTypes) => void;
  commentsCount: ICommentCountApiModel;
  totalCommentsCount: number;
  incrementCommentsCount: (isSubComment?: boolean) => void;
  decrementCommentsCount: (subCommentCount?: number) => void;
  isBeingEdited: boolean;
  updateIsBeingEdited: (isEdited: boolean) => void;

  commentsQuery?: IUseCommentsForResourceReturn;
  allCommentsFetched: boolean;
  deleteResource: () => void;
  updateResource: (
    content: IPostContentApiModel | ICommentContentApiModel
  ) => void;
  createCommentForResource: (
    comment: Omit<ICommentContentApiModel, "createdAt">
  ) => void;
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
    | "content"
    | "sourceId"
    | "sourceType"
    | "resourceId"
    | "resourceType"
    | "createdAt"
    | "updatedAt"
    | "relatedSourceMap"
  > {
  onDeleteResource?: (id: string) => void;
}

const ResourceProvider: React.FC<IResourceProviderProps> = ({
  id,
  type,
  content,
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

  onDeleteResource,
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
      clearCreateReactionQuery();
    }
  }, [clearCreateReactionQuery, createReactionResStatus]);

  const incrementCommentsCount = (isSubComment?: boolean) => {
    if (resourceType === "post") {
      parentResourceContext?.incrementCommentsCount(true);
      setCommentsCountState((prev) => ({ ...prev, comment: prev.comment + 1 }));
    } else {
      if (isSubComment) {
        setCommentsCountState((prev) => ({
          ...prev,
          subComment: prev.subComment + 1,
        }));
      } else {
        setCommentsCountState((prev) => ({
          ...prev,
          comment: prev.comment + 1,
        }));
      }
    }
  };

  const decrementCommentsCount = (subCommentCount?: number) => {
    if (resourceType === "post") {
      parentResourceContext?.decrementCommentsCount(1);
      setCommentsCountState((prev) => ({
        ...prev,
        comment: prev.comment - 1,
      }));
    } else {
      if (typeof subCommentCount !== "undefined") {
        setCommentsCountState((prev) => ({
          ...prev,
          subComment: prev.subComment - subCommentCount,
        }));
      } else {
        setCommentsCountState((prev) => ({
          ...prev,
          comment: prev.comment - 1,
        }));
      }
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

  const onResourceUpdate = (
    content: IPostContentApiModel | ICommentContentApiModel
  ) => {
    setContentState(content);
  };

  const onPostDelete = () => {
    onDeleteResource?.(id);
  };

  const { removePost, updatePost } = usePost(
    id,
    onResourceUpdate,
    onPostDelete
  );

  const commentsQuery = useCommentsForResource(
    type,
    id,
    true,
    incrementCommentsCount,
    decrementCommentsCount,
    onResourceUpdate
  );

  const [isBeingEdited, setIsBeingEdited] = useState<boolean>(false);

  const [contentState, setContentState] = useState<
    IPostContentApiModel | ICommentContentApiModel
  >(content);

  const [userReactionState, setUserReactionState] = useState<
    IReactionTypes | undefined
  >(userReaction);

  const [reactionsCountState, setReactionsCountState] =
    useState<IReactionCountApiModel>(reactionsCount);

  const [commentsCountState, setCommentsCountState] =
    useState<ICommentCountApiModel>(commentsCount);

  const [loadedCommentsState, setLoadedCommentsState] =
    useState<ICommentApiModel[]>(loadedComments);

  const updateIsBeingEdited = (_isBeingEdited: boolean) => {
    setIsBeingEdited(_isBeingEdited);
  };

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

  const deleteResource = useCallback(() => {
    if (type === "post") {
      removePost();
    } else {
      if (resourceType === "post") {
        parentResourceContext?.decrementCommentsCount(
          commentsCountState.comment
        );
      }
      parentResourceContext?.commentsQuery?.removeComment(id);
    }
  }, [
    commentsCountState.comment,
    id,
    parentResourceContext,
    removePost,
    resourceType,
    type,
  ]);

  const updateResource = (
    content: IPostContentApiModel | ICommentContentApiModel
  ) => {
    if (type === "post") {
    } else {
      commentsQuery.updateComment(content as ICommentContentApiModel);
    }
  };

  const createCommentForResource = (
    comment: Omit<ICommentContentApiModel, "createdAt">
  ) => {
    commentsQuery.addComment(comment);
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
        content: contentState,
        sourceId,
        sourceType,
        sourceInfo: sourceInfo as IRelatedSource,
        resourceId,
        resourceType,
        userReaction: userReactionState,
        updateUserReaction,
        loadedComments: loadedCommentsState,
        isBeingEdited,
        updateIsBeingEdited,
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
        updatedAt,
        incrementCommentsCount,
        decrementCommentsCount,
        commentsQuery: commentsQuery,
        allCommentsFetched:
          commentsQuery.uptoDateComments.length === commentsCountState.comment,
        deleteResource,
        updateResource,
        createCommentForResource,
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
