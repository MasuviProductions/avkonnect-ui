import { createContext, useContext, useEffect, useState } from "react";
import {
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
  updateUserReaction: (reaction?: IReactionTypes) => void;
  reactionsCount: IReactionCountApiModel;
  incrementReactionCount: (reaction: IReactionTypes) => void;
  decrementReactionCount: (reaction: IReactionTypes) => void;
  commentsCount: number;
  incrementCommentsCount: () => void;
  decrementCommentsCount: () => void;
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
});

interface IResourceProviderProps
  extends Pick<
    IAboutResourceContext,
    | "commentsCount"
    | "reactionsCount"
    | "userReaction"
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
  relatedSourceMap,
  createdAt,
  children,
}) => {
  const sourceInfo = relatedSourceMap[sourceId];

  const [userReactionState, setUserReactionState] = useState<
    IReactionTypes | undefined
  >(userReaction);

  const [reactionsCountState, setReactionsCountState] =
    useState<IReactionCountApiModel>(reactionsCount);

  const [commentsCountState, setCommentsCountState] =
    useState<number>(commentsCount);

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

  const incrementCommentsCount = () => {
    setCommentsCountState((prev) => prev + 1);
  };
  const decrementCommentsCount = () => {
    setCommentsCountState((prev) => prev - 1);
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
        reactionsCount: reactionsCountState,
        incrementReactionCount,
        decrementReactionCount,
        commentsCount: commentsCountState,
        incrementCommentsCount,
        decrementCommentsCount,
        relatedSourceMap,
        createdAt,
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
