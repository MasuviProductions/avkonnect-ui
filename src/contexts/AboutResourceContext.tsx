import { createContext, useContext, useEffect, useState } from "react";
import useComments, { IUseComments } from "../hooks/useComments";
import {
  ICommentApiResponseModel,
  IReactionCountApiModel,
  IReactionTypes,
  IRelatedSource,
  IResourceTypes,
  ISourceTypes,
} from "../interfaces/api/external";

interface IAboutResourceContext {
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
  loadedComments: ICommentApiResponseModel[];
  updateUserReaction: (reaction?: IReactionTypes) => void;
  reactionsCount: IReactionCountApiModel;
  incrementReactionCount: (reaction: IReactionTypes) => void;
  decrementReactionCount: (reaction: IReactionTypes) => void;
  commentsCount: number;
  incrementCommentsCount: () => void;
  decrementCommentsCount: () => void;
  commentsQuery?: IUseComments;
}

const AboutResourceContext = createContext<IAboutResourceContext>({
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
  incrementReactionCount: () => {},
  decrementReactionCount: () => {},
  commentsCount: 0,
  incrementCommentsCount: () => {},
  decrementCommentsCount: () => {},
  commentsQuery: undefined,
});

interface IResourceProviderProps
  extends Pick<
    IAboutResourceContext,
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

const AboutResourceProvider: React.FC<IResourceProviderProps> = ({
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

  const { incrementCommentsCount: incrementParentCommentsCount } =
    useAboutResourceContext();

  const incrementCommentsCount = () => {
    setCommentsCountState((prev) => prev + 1);
    if (type === "comment") {
      incrementParentCommentsCount();
    }
  };

  const decrementCommentsCount = () => {
    setCommentsCountState((prev) => prev - 1);
  };

  const commentsQuery = useComments(
    type,
    id,
    true,
    incrementCommentsCount,
    decrementCommentsCount
  );

  useEffect(() => {
    loadedComments.forEach((comment) => {
      commentsQuery.appendComment(comment);
    });
  }, [commentsQuery, loadedComments]);

  const [userReactionState, setUserReactionState] = useState<
    IReactionTypes | undefined
  >(userReaction);

  const [reactionsCountState, setReactionsCountState] =
    useState<IReactionCountApiModel>(reactionsCount);

  const [commentsCountState, setCommentsCountState] =
    useState<number>(commentsCount);

  const [loadedCommentsState, setLoadedComments] =
    useState<ICommentApiResponseModel[]>(loadedComments);

  const updateUserReaction = (reaction?: IReactionTypes) => {
    setUserReactionState(reaction);
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
    <AboutResourceContext.Provider
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
        incrementReactionCount,
        decrementReactionCount,
        commentsCount: commentsCountState,
        relatedSourceMap,
        createdAt,
        incrementCommentsCount,
        decrementCommentsCount,
        commentsQuery: commentsQuery,
      }}
    >
      {children}
    </AboutResourceContext.Provider>
  );
};

const useAboutResourceContext = (): IAboutResourceContext => {
  const resourceContext = useContext(AboutResourceContext);
  return resourceContext;
};

export { useAboutResourceContext };
export default AboutResourceProvider;
