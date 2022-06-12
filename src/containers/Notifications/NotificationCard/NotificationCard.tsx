import { Avatar, Box, Grid, Theme, Typography, useTheme } from "@mui/material";
import { SxProps, SystemStyleObject } from "@mui/system";
import {
  getNotificationTypeBasedLink,
  getTimeAgo,
} from "../../../utils/generic";
import NotificationsIcon from "@mui/icons-material/Notifications";
import Link from "next/link";
import {
  IUserNotificationRelatedUsersType,
  IUserNotificationResourceType,
} from "../../../interfaces/api/external";
import { LABELS } from "../../../constants/labels";

export interface INotificationCard {
  isRead: boolean;
  notificationMessage: string;
  notificationId: string;
  notificationType: IUserNotificationResourceType;
  notificationTime: number;
  relatedUsers: IUserNotificationRelatedUsersType[];
  onReadNotification: (notificationId: string) => void;
}

const NotificationCard: React.FC<INotificationCard> = ({
  isRead,
  notificationMessage,
  notificationId,
  notificationType,
  notificationTime,
  relatedUsers,
  onReadNotification,
}) => {
  const theme = useTheme();

  const handleReadNotificationClick = () => {
    onReadNotification(notificationId);
  };
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
      onClick={handleReadNotificationClick}
    >
      <Link href={getNotificationTypeBasedLink(notificationType)} passHref>
        <Grid container alignItems="center" px={1}>
          <Grid item md={1} sm={2} xs={3}>
            {notificationType === "connectionConfirmation" ||
            "connectionRequest" ? (
              <Avatar
                src={relatedUsers[0].displayPictureUrl}
                alt={`${relatedUsers[0].name}${LABELS.NOTIFICATION_PROFILE_ALT}`}
                sx={notificationAvatarSx}
              />
            ) : (
              <NotificationsIcon sx={notificationIconSx} />
            )}
          </Grid>
          <Grid item md={11} sm={10} xs={9}>
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
      </Link>
    </Box>
  );
};

const parentNotificationBoxSx = (theme: Theme): SystemStyleObject<Theme> => ({
  width: "100%",
  padding: "8px",
  borderRadius: "12px",
  margin: "4px 0px",
  ":hover": {
    borderColor: theme.palette.primary.main,
    cursor: "pointer",
  },
});

const notificationReadBoxSx = (theme: Theme): SystemStyleObject<Theme> => ({
  border: `1px solid ${theme.palette.background.paper}`,
});

const notificationUnReadBoxSx = (theme: Theme): SystemStyleObject<Theme> => ({
  backgroundColor: theme.palette.background.highlighted,
  border: `1px solid ${theme.palette.background.highlighted}`,
});

const notificationAvatarSx: SxProps<Theme> = () => ({
  width: "60px",
  height: "60px",
});

const notificationIconSx: SxProps<Theme> = {
  fontSize: "40px",
};

export default NotificationCard;
