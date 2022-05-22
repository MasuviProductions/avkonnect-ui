import { Box, Grid, Theme, Typography } from "@mui/material";
import { SxProps } from "@mui/system";
import {
  getNotificationTypeBasedLink,
  getTimeAgo,
} from "../../../utils/generic";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import NotificationsIcon from "@mui/icons-material/Notifications";
import Link from "next/link";
import { IUserNotificationResourceType } from "../../../interfaces/api/external";

export interface INotificationCard {
  key: string;
  isRead: boolean;
  notificationMessage: string;
  notificationType: IUserNotificationResourceType;
  notificationTime: number;
}

const NotificationCard: React.FC<INotificationCard> = ({
  key,
  isRead,
  notificationMessage,
  notificationType,
  notificationTime,
}) => {
  return (
    <Box
      key={key}
      sx={isRead ? notificationReadBoxSx : notificationUnReadBoxSx}
    >
      <Link href={getNotificationTypeBasedLink(notificationType)} passHref>
        <Grid container alignItems="center" px={1}>
          <Grid item sm={1} xs={2}>
            {isRead ? (
              <NotificationsIcon sx={{ fontSize: "40px" }} />
            ) : (
              <NotificationsActiveIcon sx={{ fontSize: "40px" }} />
            )}
          </Grid>
          <Grid item sm={11} xs={10}>
            <Grid container flexDirection="column" my={1}>
              <Grid item xs={12}>
                <Typography variant="h6">{notificationMessage}</Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body1">
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
  margin: "4px",
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
  margin: "4px",
  width: "100%",
  backgroundColor: theme.palette.background.highlighted,
  border: `1px solid ${theme.palette.background.highlighted}`,
  borderRadius: "12px",
  ":hover": {
    borderColor: theme.palette.primary.main,
    cursor: "pointer",
  },
});

export default NotificationCard;
