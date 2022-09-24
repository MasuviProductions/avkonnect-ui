import { Box, Grid, Theme, Typography, useTheme } from "@mui/material";
import { SystemStyleObject } from "@mui/system";
import {
  getNotificationTypeBasedLink,
  getTimeAgo,
} from "../../../utils/generic";
import Link from "next/link";
import NotificationIcon from "../NotificationIcon/NotificationIcon";
import {
  INotificationResourceActivity,
  INotificationResourceType,
  IRelatedSource,
} from "../../../interfaces/api/external";

export interface INotificationCardProps {
  isRead: boolean;
  notificationMessage: string;
  notificationId: string;
  notificationActivity: INotificationResourceActivity;
  notificationResourceType: INotificationResourceType;
  notificationTime: Date;
  relatedSource: IRelatedSource;
  onReadNotification: (notificationId: string) => void;
}

const NotificationCard: React.FC<INotificationCardProps> = ({
  isRead,
  notificationMessage,
  notificationId,
  notificationResourceType,
  notificationActivity,
  notificationTime,
  relatedSource,
  onReadNotification,
}) => {
  const theme = useTheme();

  const handleReadNotificationClick = () => {
    if (!isRead) {
      onReadNotification(notificationId);
    }
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
      <Link href={`${getNotificationTypeBasedLink(notificationActivity)}/${relatedSource.id}`} passHref>
        <Grid container alignItems="center" px={1}>
          <Grid item md={1} sm={2} xs={2}>
            <NotificationIcon
              notificationType={notificationActivity}
              relatedSource={relatedSource}
            />
          </Grid>
          <Grid item md={10} sm={9} xs={9} ml={1}>
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
