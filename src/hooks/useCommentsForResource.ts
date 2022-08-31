import { useState, useCallback, useEffect } from "react";
import { useQuery } from "react-query";
import API_ENDPOINTS from "../constants/api";
import { useAuthContext } from "../contexts/AuthContext";
import {
  AVKonnectApiResponse,
  ICommentApiModel,
  ICommentContentApiModel,
  ICreateCommentApiRequest,
  IGetCommentsCommentsApiResponse,
  IGetPostCommentsApiResponse,
  IRelatedSource,
  IResourceTypes,
} from "../interfaces/api/external";
import {
  createComment,
  deleteComment,
  getCommentsComments,
  getPostComments,
} from "../utils/api";
import { transformUsersListToUserIdUserMap } from "../utils/transformers";
import useInfiniteLoading from "./useInfiniteLoading";

export type ICommentsResponseApiModel = IGetPostCommentsApiResponse &
  IGetCommentsCommentsApiResponse;

export interface IUseCommentsForResourceReturn {
  uptoDateComments: ICommentApiModel[];
  relatedSourcesMap: Record<string, IRelatedSource>;
  resetQueryData: () => void;
  infiniteLoadRef: (node: any) => void;
  triggerGetCommentsApi: () => void;
  getCommentsStatus: "loading" | "idle" | "error" | "success";
  getCommentsFetching: boolean;
  appendCommentToResource: (comment: ICommentApiModel) => void;
  addCommentToResource: (
    comment: Omit<ICommentContentApiModel, "createdAt">
  ) => void;
  removeCommentToResource: (commentId: string) => void;
}

export const useCommentsForResource = (
  type: IResourceTypes,
  id: string,
  withInfiniteLoading: boolean,
  onCommentAdd: () => void,
  onCommentRemove: () => void
): IUseCommentsForResourceReturn => {
  const { authUser, accessToken } = useAuthContext();

  const [uptoDateComments, setUptoDateComments] = useState<ICommentApiModel[]>(
    []
  );
  const [relatedSourcesMap, setRelatedSourcesMap] = useState<
    Record<string, IRelatedSource>
  >({});
  const [nextSearchStartFromKey, setNextSearchStartFromKey] =
    useState<Record<string, unknown>>();
  const [createCommentReqBody, setCreateCommentReqBody] = useState<
    ICreateCommentApiRequest | undefined
  >();
  const [commentToDelete, setCommentToDelete] = useState<string | undefined>();

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

  const {
    data: deleteCommentResData,
    // status: deleteCommentStatus,
    isFetching: deleteCommentFetching,
    remove: clearDeleteCommentQueryData,
  } = useQuery(
    `DELETE:${API_ENDPOINTS.DELETE_COMMENT.key}-${commentToDelete}`,
    () => deleteComment(accessToken as string, commentToDelete as string),
    { cacheTime: 0, refetchInterval: false, enabled: !!commentToDelete }
  );

  const removeCommentToResource = (commentId: string) => {
    setCommentToDelete(commentId);
  };

  const addCommentToResource = (
    comment: Omit<ICommentContentApiModel, "createdAt">
  ) => {
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

  const mergeComments = useCallback((comments: ICommentApiModel[]) => {
    setUptoDateComments((prev) => {
      const updatedComments = comments.filter((comment) => {
        const isCommentAlreadyPresent = prev.findIndex(
          (cmt) => cmt.id === comment.id
        );
        return isCommentAlreadyPresent < 0;
      });
      return [...prev, ...updatedComments];
    });
  }, []);

  const appendCommentToResource = useCallback(
    (comment: ICommentApiModel) => {
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
      appendCommentToResource(createCommentResData.data);
      setCreateCommentReqBody(undefined);
      clearCreateCommentQueryData();
      onCommentAdd();
    }
  }, [
    appendCommentToResource,
    clearCreateCommentQueryData,
    createCommentResData?.data,
    onCommentAdd,
  ]);

  useEffect(() => {
    if (deleteCommentResData?.data) {
      setCommentToDelete(undefined);
      setUptoDateComments((prev) =>
        prev.filter((comment) => comment.id !== deleteCommentResData?.data?.id)
      );
      onCommentRemove();

      clearDeleteCommentQueryData();
    }
  }, [
    clearDeleteCommentQueryData,
    deleteCommentResData?.data,
    onCommentRemove,
  ]);

  return {
    uptoDateComments,
    relatedSourcesMap,
    resetQueryData,
    infiniteLoadRef,
    triggerGetCommentsApi,
    getCommentsStatus,
    getCommentsFetching,
    appendCommentToResource,
    addCommentToResource,
    removeCommentToResource,
  };
};

export default useCommentsForResource;
