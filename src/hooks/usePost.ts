import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import API_ENDPOINTS from "../constants/api";
import { useAuthContext } from "../contexts/AuthContext";
import {
  IPatchPostApiRequest,
  IPostContentApiModel,
} from "../interfaces/api/external";
import { deletePost, patchPost } from "../utils/api";

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

  const updatePost = (post: IPatchPostApiRequest) => {
    setUpdatePostReqBody(post);
  };

  const removePost = () => {
    triggerDeletePostApi();
  };

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
