import { useCallback, useMemo, useState } from "react";
import { useQuery } from "react-query";
import API_ENDPOINTS from "../constants/api";
import { useAuthContext } from "../contexts/AuthContext";
import { INotificationResourceActivity } from "../interfaces/api/external";
import { getRootPostInfoForComment } from "../utils/api";
import { getNotificationTypeBasedLink } from "../utils/generic";
import useRemountKey from "./useRemountKey";

const useGetNotificationRedirectUrl = (
  notificationActivity: INotificationResourceActivity,
  resourceId?: string,
  userId?: string
) => {
  const { accessToken } = useAuthContext();

  const { remountKey } = useRemountKey(10);

  const {
    refetch: getRootPostInfoForCommentTriggerApi,
    data: getRootPostInfoForCommentData,
    error: getRootPostInfoForCommentError,
    isFetching: getRootPostInfoForCommentLoading,
  } = useQuery(
    `${API_ENDPOINTS.GET_ROOT_POST_INFO_FOR_COMMENT.key}-${remountKey}`,
    () => getRootPostInfoForComment(accessToken as string, resourceId || ""),
    { enabled: false, staleTime: Infinity }
  );
  const [notificationRedirectUrl, setNotificationRedirectUrl] = useState<
    string | undefined
  >();

  useMemo(() => {
    if (getRootPostInfoForCommentData?.data) {
      setNotificationRedirectUrl(
        getNotificationTypeBasedLink(
          notificationActivity,
          getRootPostInfoForCommentData.data.postId
        )
      );
    }
  }, [getRootPostInfoForCommentData?.data, notificationActivity]);

  const triggerRequestToGetNotificationsRedirectLink = useCallback(() => {
    if (
      ["commentReaction", "commentComment", "commentCreation"].includes(
        notificationActivity
      )
    ) {
      getRootPostInfoForCommentTriggerApi();
    } else {
      setNotificationRedirectUrl(
        getNotificationTypeBasedLink(notificationActivity, resourceId, userId)
      );
    }
  }, [
    getRootPostInfoForCommentTriggerApi,
    notificationActivity,
    resourceId,
    userId,
  ]);

  return {
    notificationRedirectUrl,
    triggerRequestToGetNotificationsRedirectLink,
  };
};

export default useGetNotificationRedirectUrl;
