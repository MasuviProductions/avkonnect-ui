import { useMemo, useState } from "react";
import { Box, Grid, Theme, Typography, useTheme } from "@mui/material";
import { SystemStyleObject } from "@mui/system";
import {
  getNotificationTypeBasedLink,
  getTimeAgo,
} from "../../../utils/generic";
import { useRouter } from "next/router";
import NotificationIcon from "../NotificationIcon/NotificationIcon";
import {
  INotificationResourceActivity,
  IRelatedSource,
} from "../../../interfaces/api/external";
import useGetNotificationRedirectUrl from "../../../hooks/useGetNotificationRedirectUrl";

export interface INotificationCardProps {
  isRead: boolean;
  notificationMessage: string;
  notificationId: string;
  notificationActivity: INotificationResourceActivity;
  notificationTime: Date;
  relatedSource: IRelatedSource;
  notificationResourceId: string;
  onReadNotification: (notificationId: string) => void;
}

const NotificationCard: React.FC<INotificationCardProps> = ({
  isRead,
  notificationMessage,
  notificationId,
  notificationActivity,
  notificationTime,
  relatedSource,
  notificationResourceId,
  onReadNotification,
}) => {
  const theme = useTheme();
  const router = useRouter();

  const {
    notificationRedirectUrl,
    triggerRequestToGetNotificationsRedirectLink,
  } = useGetNotificationRedirectUrl(
    notificationActivity,
    notificationResourceId,
    relatedSource.id
  );

  const handleNotificationClick = () => {
    if (!isRead) {
      onReadNotification(notificationId);
    }
    triggerRequestToGetNotificationsRedirectLink();
  };

  useMemo(() => {
    if (notificationRedirectUrl) {
      router.push(notificationRedirectUrl);
    }
  }, [notificationRedirectUrl, router]);

  return (
    <Box
      sx={
        {
          ...parentNotificationBoxSx(theme),
          ...(isRead
            ? notificationReadBoxSx(theme)
            : notificationUnReadBoxSx(theme)),
        } as SystemStyleObject<Theme>
      }
      onClick={handleNotificationClick}
    >
      <Grid container alignItems="center" px={1}>
        <Grid item>
          <NotificationIcon
            notificationType={notificationActivity}
            relatedSource={relatedSource}
          />
        </Grid>
        <Grid item sm={10} xs={9.5} ml={2}>
          <Grid container flexDirection="column" my={1}>
            <Grid item xs={12}>
              <Typography variant="body1">{notificationMessage}</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body2">
                {getTimeAgo(notificationTime)}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

const parentNotificationBoxSx = (theme: Theme): SystemStyleObject<Theme> => ({
  width: "100%",
  padding: "8px",
  borderRadius: "6px",
  margin: "4px 0px",
  ":hover": {
    backgroundColor: theme.palette.secondary.dark,
    cursor: "pointer",
  },
});

const notificationReadBoxSx = (theme: Theme): SystemStyleObject<Theme> => ({});

const notificationUnReadBoxSx = (theme: Theme): SystemStyleObject<Theme> => ({
  backgroundColor: theme.palette.secondary.main,
});

export default NotificationCard;
