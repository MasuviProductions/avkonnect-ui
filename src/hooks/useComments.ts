import { useState, useCallback, useEffect } from "react";
import {
  QueryFunction,
  QueryKey,
  useQuery,
  UseQueryOptions,
} from "react-query";
import { useAuthContext } from "../contexts/AuthContext";
import {
  AVKonnectApiResponse,
  ICommentApiResponseModel,
  IGetCommentsCommentsApiResponse,
  IGetPostCommentsApiResponse,
  IRelatedSource,
} from "../interfaces/api/external";
import { transformUsersListToUserIdUserMap } from "../utils/transformers";
import useInfiniteLoading from "./useInfiniteLoading";

type ICommentsResponseApiModel = IGetPostCommentsApiResponse &
  IGetCommentsCommentsApiResponse;

type IUseCommentsQueryFunction = QueryFunction<
  AVKonnectApiResponse<ICommentsResponseApiModel>,
  QueryKey
>;

type IUseCommentsQueryOptions = Omit<
  UseQueryOptions<
    AVKonnectApiResponse<ICommentsResponseApiModel>,
    unknown,
    AVKonnectApiResponse<ICommentsResponseApiModel>,
    QueryKey
  >,
  "queryKey" | "queryFn"
>;

export const useComments = (
  queryKey: QueryKey,
  queryFn: (nxtSrchKey: string | undefined) => IUseCommentsQueryFunction,
  options: IUseCommentsQueryOptions,
  withInfiniteLoading: boolean
): {
  uptoDateComments: ICommentApiResponseModel[];
  relatedSourcesMap: Record<string, IRelatedSource>;
  resetQueryData: () => void;
  infiniteLoadRef: (node: any) => void;
  triggerGetCommentsApi: () => void;
  getCommentsStatus: "loading" | "idle" | "error" | "success";
  allCommentsFetched: boolean;
  updateComments: (comments: ICommentApiResponseModel[]) => void;
} => {
  const { authUser } = useAuthContext();
  const [uptoDateComments, setUptoDateComments] = useState<
    ICommentApiResponseModel[]
  >([]);
  const [relatedSourcesMap, setRelatedSourcesMap] = useState<
    Record<string, IRelatedSource>
  >({});
  const [nextSearchStartFromKey, setNextSearchStartFromKey] =
    useState<Record<string, unknown>>();

  const {
    data: getCommentsRes,
    refetch: triggerGetCommentsApi,
    isFetching: getCommentsFetching,
    status: getCommentsStatus,
    remove: clearGetCommentsQueryData,
  } = useQuery(
    queryKey,
    queryFn(
      nextSearchStartFromKey
        ? encodeURI(JSON.stringify(nextSearchStartFromKey))
        : undefined
    ),
    { ...options, refetchOnWindowFocus: false, refetchInterval: false }
  );

  const infiniteLoadCallback = useCallback(() => {
    if (withInfiniteLoading) {
      if (uptoDateComments.length > 0 && nextSearchStartFromKey) {
        if (authUser) {
          triggerGetCommentsApi();
        }
      }
    }
  }, [
    authUser,
    nextSearchStartFromKey,
    triggerGetCommentsApi,
    uptoDateComments.length,
    withInfiniteLoading,
  ]);

  const infiniteLoadRef = useInfiniteLoading(
    getCommentsFetching,
    infiniteLoadCallback
  );

  const resetQueryData = useCallback(() => {
    setNextSearchStartFromKey(undefined);
    setUptoDateComments([]);
    clearGetCommentsQueryData();
  }, [clearGetCommentsQueryData]);

  const updateComments = useCallback((comments: ICommentApiResponseModel[]) => {
    setUptoDateComments(comments);
  }, []);

  useEffect(() => {
    if (getCommentsRes?.data) {
      setUptoDateComments((prev) => [
        ...prev,
        ...(getCommentsRes?.data?.comments || []),
      ]);
      setRelatedSourcesMap((prev) => {
        const sourcesMap = transformUsersListToUserIdUserMap(
          getCommentsRes.data?.relatedSources || []
        ) as Record<string, IRelatedSource>;
        const updatedRelatedSourcesMap = {
          ...prev,
          ...sourcesMap,
        };
        return updatedRelatedSourcesMap;
      });

      setNextSearchStartFromKey(
        getCommentsRes.dDBPagination?.nextSearchStartFromKey
      );
    }
  }, [
    getCommentsRes?.dDBPagination?.nextSearchStartFromKey,
    getCommentsRes?.data,
    setNextSearchStartFromKey,
  ]);

  return {
    uptoDateComments,
    relatedSourcesMap,
    resetQueryData,
    infiniteLoadRef,
    triggerGetCommentsApi,
    getCommentsStatus,
    allCommentsFetched: !nextSearchStartFromKey,
    updateComments,
  };
};

export default useComments;
