import { useState, useEffect, useCallback } from "react";
import { useQuery } from "react-query";
import API_ENDPOINTS from "../constants/api";
import {
  GET_COMMENT_REACTION_PAGINATION_LIMIT,
  GET_POST_REACTION_PAGINATION_LIMIT,
} from "../constants/app";
import { useAuthContext } from "../contexts/AuthContext";
import {
  AVKonnectApiResponse,
  IGetReactionsResponseApiModel,
  IReactionApiModel,
  IReactionTypes,
  IRelatedSource,
  IResourceTypes,
} from "../interfaces/api/external";
import { getCommentReactions, getPostReactions } from "../utils/api";
import { transformUsersListToUserIdUserMap } from "../utils/transformers";
import useInfiniteLoading from "./useInfiniteLoading";

interface IUseReactions {
  uptoDateReactions: IReactionApiModel[];
  infiniteLoadRef: (node: any) => void;
  triggerGetReactionsApi: () => void;
  relatedSourcesMap: Record<string, IRelatedSource>;
  getReactionsFetching: boolean;
  resetQueryData: () => void;
  appendReactions: (reactions: IReactionApiModel[]) => void;
}

const useReactions = (
  resourceType: IResourceTypes,
  id: string,
  reactionType?: IReactionTypes
): IUseReactions => {
  const { authUser, accessToken } = useAuthContext();

  const [uptoDateReactions, setUptoDateReactions] = useState<
    IReactionApiModel[]
  >([]);
  const [relatedSourcesMap, setRelatedSourcesMap] = useState<
    Record<string, IRelatedSource>
  >({});
  const [nextSearchStartFromKey, setNextSearchStartFromKey] =
    useState<Record<string, unknown>>();

  const {
    data: getReactionsData,
    refetch: triggerGetReactionsApi,
    isFetching: getReactionsFetching,
    remove: clearGetReactionsQueryData,
  } = useQuery<AVKonnectApiResponse<IGetReactionsResponseApiModel>>(
    resourceType === "post"
      ? `GET-${API_ENDPOINTS.GET_POST_REACTIONS.key}:${id}:${reactionType}`
      : `GET-${API_ENDPOINTS.GET_COMMENT_REACTIONS.key}:${id}:${reactionType}`,
    () =>
      resourceType === "post"
        ? getPostReactions(
            accessToken as string,
            id,
            GET_POST_REACTION_PAGINATION_LIMIT,
            reactionType,
            nextSearchStartFromKey
              ? encodeURI(JSON.stringify(nextSearchStartFromKey))
              : undefined
          )
        : getCommentReactions(
            accessToken as string,
            id,
            GET_COMMENT_REACTION_PAGINATION_LIMIT,
            reactionType,
            nextSearchStartFromKey
              ? encodeURI(JSON.stringify(nextSearchStartFromKey))
              : undefined
          ),
    { refetchOnWindowFocus: false, refetchInterval: false, enabled: false }
  );

  const handleUpdateRelatedSources = useCallback(
    (relatedSources: IRelatedSource[]) => {
      setRelatedSourcesMap(prev => {
        const sourcesMap = transformUsersListToUserIdUserMap(
          relatedSources
        ) as Record<string, IRelatedSource>;
        const updatedRelatedSourcesMap = {
          ...prev,
          ...sourcesMap,
        };
        return updatedRelatedSourcesMap;
      });
    },
    []
  );

  const infiniteLoadCallback = useCallback(() => {
    if (uptoDateReactions.length > 0 && nextSearchStartFromKey) {
      if (authUser) {
        triggerGetReactionsApi();
      }
    }
  }, [
    authUser,
    nextSearchStartFromKey,
    triggerGetReactionsApi,
    uptoDateReactions.length,
  ]);

  const infiniteLoadRef = useInfiniteLoading(
    getReactionsFetching,
    infiniteLoadCallback
  );

  const appendReactions = useCallback((reactions: IReactionApiModel[]) => {
    setUptoDateReactions(prev => {
      const updatedReactions = reactions.filter(reaction => {
        const isReactionAlreadyPresent = prev.findIndex(
          rct => rct.id === reaction.id
        );
        return isReactionAlreadyPresent < 0;
      });
      return [...prev, ...updatedReactions];
    });
  }, []);

  const resetQueryData = useCallback(() => {
    setNextSearchStartFromKey(undefined);
    clearGetReactionsQueryData();
    setUptoDateReactions([]);
  }, [clearGetReactionsQueryData]);

  useEffect(() => {
    triggerGetReactionsApi();
  }, [triggerGetReactionsApi]);

  useEffect(() => {
    if (getReactionsData?.data) {
      appendReactions(getReactionsData?.data?.reactions);
      handleUpdateRelatedSources(getReactionsData?.data?.relatedSources);
      setNextSearchStartFromKey(
        getReactionsData?.dDBPagination?.nextSearchStartFromKey
      );
    }
  }, [
    getReactionsData?.dDBPagination?.nextSearchStartFromKey,
    getReactionsData?.data,
    handleUpdateRelatedSources,
    appendReactions,
  ]);

  return {
    uptoDateReactions,
    infiniteLoadRef,
    triggerGetReactionsApi,
    relatedSourcesMap,
    getReactionsFetching,
    resetQueryData,
    appendReactions,
  };
};

export default useReactions;
