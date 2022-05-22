import { Box, Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import LayoutCard from "../../components/LayoutCard";
import API_ENDPOINTS from "../../constants/api";
import { LABELS } from "../../constants/labels";
import { useAuthContext } from "../../contexts/AuthContext";
import { useSnackbarContext } from "../../contexts/SnackbarContext";
import { IUserNotificationsApiResponse } from "../../interfaces/api/external";
import { ReactFCWithSkeleton } from "../../interfaces/app";
import { getUserNotifications } from "../../utils/api";
import { generateNotificationMessage } from "../../utils/generic";
import NotificationCard from "./NotificationCard/NotificationCard";
import NotificationsSkeleton from "./NotificationsSkeleton";

const Notifications: ReactFCWithSkeleton = () => {
  const { authUser } = useAuthContext();
  const { accessToken } = useAuthContext();
  const { setSnackbar } = useSnackbarContext();

  const [userNotifications, setUserNotifications] =
    useState<IUserNotificationsApiResponse>([]);

  const {
    data: getUserNotificationsData,
    error: getUserNotificationsError,
    status: getUserNotificationsStatus,
    refetch: triggerGetUserNotificationsApi,
  } = useQuery(`${API_ENDPOINTS.USER_CERTIFICATIONS.key}:${authUser?.id}`, () =>
    getUserNotifications(accessToken as string, authUser?.id as string)
  );

  useEffect(() => {
    if (authUser?.id) {
      triggerGetUserNotificationsApi();
    }
  }, [authUser?.id, triggerGetUserNotificationsApi]);

  useEffect(() => {
    if (getUserNotificationsError) {
      setSnackbar?.(() => ({
        message: LABELS.NOTIFICATION_LOAD_FAIL,
        messageType: "error",
      }));
    }
  }, [getUserNotificationsError, setSnackbar]);

  useEffect(() => {
    if (getUserNotificationsData?.data) {
      setUserNotifications(getUserNotificationsData?.data);
    }
  }, [getUserNotificationsData?.data]);

  return (
    <Box mt={4}>
      <LayoutCard>
        <Grid container>
          <Grid item xs={12} m={2} p={1}>
            <Typography variant="h4">{LABELS.NOTIFICATIONS_HEADER}</Typography>
          </Grid>
          {userNotifications?.map(userNotification => (
            <NotificationCard
              key={userNotification?.id}
              isRead={userNotification?.read}
              notificationMessage={generateNotificationMessage(
                userNotification?.resourceType,
                userNotification?.resourceRef
              )}
              notificationTime={userNotification?.createdAt}
              notificationType={userNotification?.resourceType}
            />
          ))}
        </Grid>
      </LayoutCard>
    </Box>
  );
};
Notifications.Skeleton = NotificationsSkeleton;

// const Notifications = NotificationsSkeleton;

export default Notifications;
