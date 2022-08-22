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
  ICreateReactionApiRequest,
  IGetPostReactionsApiResponse,
  IReactionApiModel,
  IReactionTypes,
  IRelatedSource,
  IResourceTypes,
} from "../interfaces/api/external";
import {
  createReaction,
  getCommentReactions,
  getPostReactions,
} from "../utils/api";
import { transformUsersListToUserIdUserMap } from "../utils/transformers";
import useInfiniteLoading from "./useInfiniteLoading";

interface IUseReactions {}

type IIndividualUptoDateReactionModel = Record<
  "all" | IReactionTypes,
  IReactionApiModel[]
>;

const useReactions = (
  resourceType: IResourceTypes,
  id: string,
  reactionType?: IReactionTypes
): IUseReactions => {
  const { authUser, accessToken } = useAuthContext();

  const [uptoDateReactions, setUptoDateReactions] =
    useState<IIndividualUptoDateReactionModel>(
      {} as IIndividualUptoDateReactionModel
    );
  const [relatedSourcesMap, setRelatedSourcesMap] = useState<
    Record<string, IRelatedSource>
  >({});
  const [nextSearchStartFromKey, setNextSearchStartFromKey] =
    useState<Record<string, unknown>>();

  const {
    data: getReactionsData,
    refetch: triggerGetReactionsApi,
    isFetching: getReactionsFetching,
    status: getReactionsStatus,
    remove: clearGetReactionsQueryData,
  } = useQuery<AVKonnectApiResponse<IGetPostReactionsApiResponse>>(
    resourceType === "post"
      ? `GET-${API_ENDPOINTS.GET_POST_REACTIONS.key}:${id}`
      : `GET-${API_ENDPOINTS.GET_COMMENT_REACTIONS.key}:${id}`,
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
    if (uptoDateReactions) {
      if (reactionType && uptoDateReactions[reactionType].length > 0) {
        if (authUser) {
          triggerGetReactionsApi();
        }
      }
    }
  }, [authUser, reactionType, triggerGetReactionsApi, uptoDateReactions]);

  const infiniteLoadRef = useInfiniteLoading(
    getReactionsFetching,
    infiniteLoadCallback
  );

  const mergeReactions = useCallback(
    (reactions: IReactionApiModel[]) => {
      setUptoDateReactions(prev => ({
        ...prev,
        reactionType: [...prev[reactionType || "all"], ...reactions],
      }));
    },
    [reactionType]
  );

  const resetQueryData = useCallback(() => {
    setNextSearchStartFromKey(undefined);
    setUptoDateReactions({} as IIndividualUptoDateReactionModel);
    clearGetReactionsQueryData();
  }, [clearGetReactionsQueryData]);

  useEffect(() => {
    triggerGetReactionsApi();
  }, [reactionType, triggerGetReactionsApi]);

  useEffect(() => {
    if (getReactionsData?.data) {
      mergeReactions(getReactionsData?.data?.reactions);
      handleUpdateRelatedSources(getReactionsData?.data?.relatedSources);
      setNextSearchStartFromKey(
        getReactionsData?.dDBPagination?.nextSearchStartFromKey
      );
    }
  }, [
    getReactionsData?.dDBPagination?.nextSearchStartFromKey,
    getReactionsData?.data,
    handleUpdateRelatedSources,
    mergeReactions,
  ]);

  return {
    uptoDateReactions,
    infiniteLoadRef,
    triggerGetReactionsApi,
    relatedSourcesMap,
    getReactionsFetching,
    resetQueryData,
  };
};

export default useReactions;
