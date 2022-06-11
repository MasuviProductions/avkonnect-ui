import { Avatar, Box, Grid, Theme, Typography } from "@mui/material";
import { SxProps } from "@mui/system";
import {
  getNotificationTypeBasedLink,
  getTimeAgo,
} from "../../../utils/generic";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import NotificationsIcon from "@mui/icons-material/Notifications";
import Link from "next/link";
import {
  IUserNotificationRelatedUsersType,
  IUserNotificationResourceType,
} from "../../../interfaces/api/external";

export interface INotificationCard {
  isRead: boolean;
  notificationMessage: string;
  notificationType: IUserNotificationResourceType;
  notificationTime: number;
  relatedUsers: IUserNotificationRelatedUsersType[];
}

const NotificationCard: React.FC<INotificationCard> = ({
  isRead,
  notificationMessage,
  notificationType,
  notificationTime,
  relatedUsers,
}) => {
  return (
    <Box sx={isRead ? notificationReadBoxSx : notificationUnReadBoxSx}>
      <Link href={getNotificationTypeBasedLink(notificationType)} passHref>
        <Grid container alignItems="center" px={1}>
          <Grid item md={1} sm={2} xs={3}>
            {notificationType === "connectionConfirmation" ||
            "connectionRequest" ? (
              <Avatar
                src={relatedUsers[0].displayPictureUrl}
                alt={`${relatedUsers[0].name}'s Profile`}
                sx={notificationAvatarSx}
              />
            ) : (
              <NotificationsIcon sx={{ fontSize: "40px" }} />
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

const notificationReadBoxSx: SxProps<Theme> = (theme: Theme) => ({
  padding: "8px",
  border: `1px solid ${theme.palette.background.paper}`,
  borderRadius: "12px",
  width: "100%",
  ":hover": {
    borderColor: theme.palette.primary.main,
    cursor: "pointer",
  },
});

const notificationUnReadBoxSx: SxProps<Theme> = (theme: Theme) => ({
  padding: "8px",
  margin: "4px 0px",
  width: "100%",
  backgroundColor: theme.palette.background.highlighted,
  border: `1px solid ${theme.palette.background.highlighted}`,
  borderRadius: "12px",
  ":hover": {
    borderColor: theme.palette.primary.main,
    cursor: "pointer",
  },
});

const notificationAvatarSx: SxProps<Theme> = () => ({
  width: "60px",
  height: "60px",
});

export default NotificationCard;
