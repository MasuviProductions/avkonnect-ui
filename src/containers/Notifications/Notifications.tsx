import { Box, Grid, Typography } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { useQuery } from "react-query";
import LayoutCard from "../../components/LayoutCard";
import API_ENDPOINTS from "../../constants/api";
import { LABELS } from "../../constants/labels";
import { useAuthContext } from "../../contexts/AuthContext";
import { useSnackbarContext } from "../../contexts/SnackbarContext";
import { useUserNotificationsContext } from "../../contexts/UserNotificatonsContext";
import useInfiniteLoading from "../../hooks/useInfiniteLoading";
import useRemountKey from "../../hooks/useRemountKey";
import { IUserNotificationsApiResponse } from "../../interfaces/api/external";
import { ReactFCWithSkeleton } from "../../interfaces/app";
import {
  getUserNotifications,
  patchReadUserNotification,
} from "../../utils/api";
import { generateNotificationMessage } from "../../utils/generic";
import NotificationCard from "./NotificationCard/NotificationCard";
import NotificationsSkeleton from "./NotificationsSkeleton";

const Notifications: ReactFCWithSkeleton = () => {
  const { triggerDeleteUserNotificationCountApi, userNotificationsCount } =
    useUserNotificationsContext();
  const { authUser } = useAuthContext();
  const { accessToken } = useAuthContext();
  const { setSnackbar } = useSnackbarContext();

  const { remountKey } = useRemountKey(4);

  const [uptoDateUserNotifications, setUptoDateUserNotifications] =
    useState<IUserNotificationsApiResponse>([]);

  const [nextNotificationsSearchKey, setNextNotificationsSearchKey] =
    useState<Record<string, unknown>>();

  const [notificationReadId, setNotificationReadId] = useState<string>();

  const {
    data: getUserNotificationsData,
    error: getUserNotificationsError,
    status: getUserNotificationsStatus,
    refetch: triggerGetUserNotificationsApi,
    isFetching: getUserNotificationsFetching,
  } = useQuery(
    `${API_ENDPOINTS.USER_NOTIFICATIONS.key}:${authUser?.id}:PENDING:${remountKey}`,
    () =>
      getUserNotifications(
        accessToken as string,
        authUser?.id as string,
        10,
        nextNotificationsSearchKey
          ? encodeURI(JSON.stringify(nextNotificationsSearchKey))
          : undefined
      ),
    { enabled: false }
  );

  const { refetch: triggerPatchReadUserNotificationApi } = useQuery(
    `${API_ENDPOINTS.USER_NOTIFICATION_READ.key}:${authUser?.id}`,
    () =>
      patchReadUserNotification(
        accessToken as string,
        authUser?.id as string,
        notificationReadId as string
      ),
    { enabled: false, cacheTime: 0, refetchInterval: 0 }
  );

  const onReadNotification = (notificationId: string) => {
    setNotificationReadId(notificationId);
  };

  const infiniteLoadCallback = useCallback(() => {
    if (uptoDateUserNotifications.length > 0 && nextNotificationsSearchKey) {
      if (authUser) {
        triggerGetUserNotificationsApi();
      }
    }
  }, [
    authUser,
    nextNotificationsSearchKey,
    triggerGetUserNotificationsApi,
    uptoDateUserNotifications.length,
  ]);

  const infiniteLoadRef = useInfiniteLoading(
    getUserNotificationsFetching,
    infiniteLoadCallback
  );

  useEffect(() => {
    if (notificationReadId) {
      triggerPatchReadUserNotificationApi();
    }
  }, [notificationReadId, triggerPatchReadUserNotificationApi]);

  useEffect(() => {
    if (authUser?.id) {
      triggerGetUserNotificationsApi();
    }
  }, [authUser?.id, triggerGetUserNotificationsApi]);

  useEffect(() => {
    if (authUser?.id && (userNotificationsCount || 0) > 0) {
      triggerDeleteUserNotificationCountApi?.();
    }
  }, [
    authUser?.id,
    triggerDeleteUserNotificationCountApi,
    userNotificationsCount,
  ]);

  useEffect(() => {
    if (getUserNotificationsError) {
      setSnackbar?.(() => ({
        message: LABELS.NOTIFICATION_LOAD_FAIL,
        messageType: "error",
      }));
    }
  }, [getUserNotificationsError, setSnackbar]);

  useEffect(() => {
    if (getUserNotificationsData) {
      setUptoDateUserNotifications(prev => {
        return [
          ...prev,
          ...(getUserNotificationsData?.data as IUserNotificationsApiResponse),
        ];
      });
      setNextNotificationsSearchKey(
        getUserNotificationsData.dDBPagination?.nextSearchStartFromKey
      );
    }
  }, [getUserNotificationsData]);

  if (getUserNotificationsStatus === "loading") {
    return <NotificationsSkeleton />;
  }

  return (
    <Box mt={4}>
      <LayoutCard>
        <Grid container>
          <Grid item xs={12} m={1} p={1}>
            <Typography variant="h4">{LABELS.NOTIFICATIONS_HEADER}</Typography>
          </Grid>
          {uptoDateUserNotifications?.map((userNotification, index) => (
            <Grid
              item
              xs={12}
              px={1}
              key={userNotification?.id || index.toString()}
              ref={
                index === uptoDateUserNotifications.length - 1
                  ? infiniteLoadRef
                  : undefined
              }
            >
              <NotificationCard
                isRead={userNotification?.read}
                notificationMessage={generateNotificationMessage(
                  userNotification?.resourceType,
                  userNotification?.relatedUsers
                )}
                notificationId={userNotification?.id}
                notificationTime={userNotification?.createdAt}
                notificationType={userNotification?.resourceType}
                relatedUsers={userNotification?.relatedUsers}
                onReadNotification={onReadNotification}
              />
            </Grid>
          ))}
        </Grid>
      </LayoutCard>
    </Box>
  );
};
Notifications.Skeleton = NotificationsSkeleton;

// const Notifications = NotificationsSkeleton;

export default Notifications;
