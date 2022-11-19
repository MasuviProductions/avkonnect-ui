import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import API_ENDPOINTS from "../constants/api";
import { useAuthContext } from "../contexts/AuthContext";
import {
  IPatchPostApiRequest,
  IPostContentApiModel,
} from "../interfaces/api/external";
import { deletePost, patchPost } from "../utils/api";
import { useSnackbarContext } from "../contexts/SnackbarContext";
import { LABELS } from "../constants/labels";

const usePost = (
  postId: string,
  onPostUpdate: (content: IPostContentApiModel) => void,
  onPostDelete: () => void
) => {
  const { authUser, accessToken } = useAuthContext();

  const [updatePostReqBody, setUpdatePostReqBody] = useState<
    IPatchPostApiRequest | undefined
  >();

  const {
    data: patchPostData,
    status: patchPostStatus,
    refetch: triggerPatchPostApi,
    remove: clearPatchPostQuery,
  } = useQuery(
    `PATCH- ${API_ENDPOINTS.PATCH_POST.key}:${authUser?.id}:${postId}`,
    () => patchPost(accessToken!, postId, updatePostReqBody!),
    {
      retry: false,
      enabled: !!updatePostReqBody,
      refetchInterval: false,
      refetchOnWindowFocus: false,
    }
  );

  const {
    data: deletePostData,
    status: deletePostStatus,
    refetch: triggerDeletePostApi,
    dataUpdatedAt: deletePostDataUpdatedAt,
    remove: clearDeletePostQuery,
  } = useQuery(
    `DELETE- ${API_ENDPOINTS.DELETE_POST.key}:${authUser?.id}:${postId}`,
    () => deletePost(accessToken!, postId),
    {
      retry: false,
      enabled: false,
      refetchInterval: false,
      refetchOnWindowFocus: false,
    }
  );
  const { setSnackbar } = useSnackbarContext();

  const updatePost = (post: IPatchPostApiRequest) => {
    setUpdatePostReqBody(post);
  };

  const removePost = () => {
    triggerDeletePostApi();
  };

  useEffect(() => {
    if (deletePostStatus==="success") {
      setSnackbar?.({ message: LABELS.POST_DELETE_SUCCESS, messageType: "success" });
    }
    if (deletePostStatus==="error") {
      setSnackbar?.({ message: LABELS.POST_DELETE_FAILURE, messageType: "error" });
    }
  }, [deletePostStatus, setSnackbar]);

  useEffect(() => {
    if (patchPostStatus==="success") {
      setSnackbar?.({ message: LABELS.POST_EDIT_SUCCESS, messageType: "success" });
    }
    if (patchPostStatus==="error") {
      setSnackbar?.({ message: LABELS.POST_EDIT_FAILURE, messageType: "error" });
    }
  }, [patchPostStatus, setSnackbar]);

  useEffect(() => {
    if (deletePostData) {
      onPostDelete();
      clearDeletePostQuery();
    }
  }, [clearDeletePostQuery, deletePostData, onPostDelete]);

  useEffect(() => {
    if (patchPostData?.data) {
      setUpdatePostReqBody(undefined);
      onPostUpdate(patchPostData.data.contents?.slice(-1)?.[0]!);
      clearPatchPostQuery();
    }
  }, [clearPatchPostQuery, patchPostData, onPostDelete, onPostUpdate]);

  return { updatePost, removePost };
};

export default usePost;
