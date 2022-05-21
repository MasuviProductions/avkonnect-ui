import { Box, Grid, Theme, Typography } from "@mui/material";
import { SxProps } from "@mui/system";
import { getTimeAgo } from "../../../utils/generic";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import NotificationsIcon from "@mui/icons-material/Notifications";

export interface INotificationCard {
  key: string;
  isRead: boolean;
  notificationMessage: string;
  notificationType: string;
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
    <Box sx={isRead ? notificationReadBoxSx : notificationUnReadBoxSx}>
      <Grid container alignItems="center">
        <Grid item xs={1}>
          {isRead ? (
            <NotificationsIcon sx={{ fontSize: "40px" }} />
          ) : (
            <NotificationsActiveIcon sx={{ fontSize: "40px" }} />
          )}
        </Grid>
        <Grid item xs={10}>
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
    </Box>
  );
};

const notificationReadBoxSx: SxProps<Theme> = (theme: Theme) => ({
  padding: "8px",
  margin: "4px",
  width: "100%",
});

const notificationUnReadBoxSx: SxProps<Theme> = (theme: Theme) => ({
  padding: "8px",
  margin: "4px",
  width: "100%",
  backgroundColor: theme.palette.grey[800],
  borderRadius: "12px",
});

export default NotificationCard;
