import { useState, useCallback, useEffect } from "react";
import {
  QueryFunction,
  QueryKey,
  useQuery,
  UseQueryOptions,
} from "react-query";
import API_ENDPOINTS from "../constants/api";
import { useAuthContext } from "../contexts/AuthContext";
import {
  AVKonnectApiResponse,
  ICommentApiResponseModel,
  ICommentContentApiModel,
  ICreateCommentApiRequest,
  IGetCommentsCommentsApiResponse,
  IGetPostCommentsApiResponse,
  IRelatedSource,
  IResourceTypes,
} from "../interfaces/api/external";
import {
  createComment,
  getCommentsComments,
  getPostComments,
} from "../utils/api";
import { transformUsersListToUserIdUserMap } from "../utils/transformers";
import useInfiniteLoading from "./useInfiniteLoading";

export type ICommentsResponseApiModel = IGetPostCommentsApiResponse &
  IGetCommentsCommentsApiResponse;

export interface IUseComments {
  uptoDateComments: ICommentApiResponseModel[];
  relatedSourcesMap: Record<string, IRelatedSource>;
  resetQueryData: () => void;
  infiniteLoadRef: (node: any) => void;
  triggerGetCommentsApi: () => void;
  getCommentsStatus: "loading" | "idle" | "error" | "success";
  getCommentsFetching: boolean;
  appendComment: (comment: ICommentApiResponseModel) => void;
  addComment: (comment: Omit<ICommentContentApiModel, "createdAt">) => void;
}

export const useComments = (
  type: IResourceTypes,
  id: string,
  withInfiniteLoading: boolean,
  onCommentAdd: () => void,
  onCommentRemove: () => void
): IUseComments => {
  const { authUser, accessToken } = useAuthContext();

  const [uptoDateComments, setUptoDateComments] = useState<
    ICommentApiResponseModel[]
  >([]);
  const [relatedSourcesMap, setRelatedSourcesMap] = useState<
    Record<string, IRelatedSource>
  >({});
  const [nextSearchStartFromKey, setNextSearchStartFromKey] =
    useState<Record<string, unknown>>();
  const [createCommentReqBody, setCreateCommentReqBody] = useState<
    ICreateCommentApiRequest | undefined
  >();

  const {
    data: getCommentsRes,
    refetch: triggerGetCommentsApi,
    isFetching: getCommentsFetching,
    status: getCommentsStatus,
    remove: clearGetCommentsQueryData,
  } = useQuery<AVKonnectApiResponse<ICommentsResponseApiModel>>(
    type === "post"
      ? `GET:${API_ENDPOINTS.GET_POST_COMMENTS.key}-${id}`
      : `GET:${API_ENDPOINTS.GET_COMMENTS_COMMENTS.key}-${id}`,
    () =>
      type === "post"
        ? getPostComments(
            accessToken as string,
            id,
            5,
            nextSearchStartFromKey
              ? encodeURI(JSON.stringify(nextSearchStartFromKey))
              : undefined
          )
        : getCommentsComments(
            accessToken as string,
            id,
            5,
            nextSearchStartFromKey
              ? encodeURI(JSON.stringify(nextSearchStartFromKey))
              : undefined
          ),
    { refetchOnWindowFocus: false, refetchInterval: false, enabled: false }
  );

  const {
    data: createCommentResData,
    // refetch: triggerCreateCommentApi,
    // status: createCommentStatus,
    // isFetching: createCommentFetching,
    remove: clearCreateCommentQueryData,
  } = useQuery(
    `POST:${API_ENDPOINTS.CREATE_COMMENT.key}-${id}`,
    () =>
      createComment(
        accessToken as string,
        createCommentReqBody as ICreateCommentApiRequest
      ),
    { cacheTime: 0, refetchInterval: false, enabled: !!createCommentReqBody }
  );

  const addComment = (comment: Omit<ICommentContentApiModel, "createdAt">) => {
    setCreateCommentReqBody({
      resourceId: id,
      resourceType: type,
      comment: comment,
    });
  };

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

  const handleUpdateRelatedSources = useCallback(
    (relatedSources: IRelatedSource[]) => {
      setRelatedSourcesMap((prev) => {
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

  const mergeComments = useCallback((comments: ICommentApiResponseModel[]) => {
    setUptoDateComments((prev) => [
      ...prev,
      ...(comments.filter((comment) => {
        const isCommentAlreadyPresent = prev.findIndex(
          (cmt) => cmt.id === comment.id
        );
        return isCommentAlreadyPresent < 0;
      }) || []),
    ]);
  }, []);

  const appendComment = useCallback(
    (comment: ICommentApiResponseModel) => {
      handleUpdateRelatedSources(comment.relatedSources);
      mergeComments([comment]);
    },
    [handleUpdateRelatedSources, mergeComments]
  );

  useEffect(() => {
    if (getCommentsRes?.data) {
      mergeComments(getCommentsRes?.data?.comments);
      handleUpdateRelatedSources(getCommentsRes.data?.relatedSources || []);
      setNextSearchStartFromKey(
        getCommentsRes.dDBPagination?.nextSearchStartFromKey
      );
    }
  }, [
    getCommentsRes?.dDBPagination?.nextSearchStartFromKey,
    getCommentsRes?.data,
    handleUpdateRelatedSources,
    setNextSearchStartFromKey,
    mergeComments,
  ]);

  useEffect(() => {
    if (createCommentResData?.data) {
      appendComment(createCommentResData.data);
      onCommentAdd();
      setCreateCommentReqBody(undefined);
      clearCreateCommentQueryData();
    }
  }, [
    appendComment,
    clearCreateCommentQueryData,
    createCommentResData?.data,
    onCommentAdd,
  ]);

  return {
    uptoDateComments,
    relatedSourcesMap,
    resetQueryData,
    infiniteLoadRef,
    triggerGetCommentsApi,
    getCommentsStatus,
    getCommentsFetching,
    appendComment,
    addComment,
  };
};

export default useComments;
