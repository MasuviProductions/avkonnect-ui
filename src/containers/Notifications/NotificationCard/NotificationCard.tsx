import { Box, Grid, Theme, Typography, useTheme } from "@mui/material";
import { SystemStyleObject } from "@mui/system";
import {
  getNotificationTypeBasedLink,
  getTimeAgo,
} from "../../../utils/generic";
import Link from "next/link";
import {
  IUserNotificationRelatedUsersType,
  IUserNotificationResourceType,
} from "../../../interfaces/api/external";
import NotificationIcon from "../NotificationIcon/NotificationIcon";

export interface INotificationCardProps {
  isRead: boolean;
  notificationMessage: string;
  notificationId: string;
  notificationType: IUserNotificationResourceType;
  notificationTime: Date;
  relatedUsers: IUserNotificationRelatedUsersType[];
  onReadNotification: (notificationId: string) => void;
}

const NotificationCard: React.FC<INotificationCardProps> = ({
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
            <NotificationIcon
              notificationType={notificationType}
              relatedUsers={relatedUsers}
            />
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

export default NotificationCard;
