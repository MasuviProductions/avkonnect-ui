import { Avatar, SxProps, Theme } from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { LABELS } from "../../../constants/labels";
import { IUserNotificationRelatedUsersType } from "../../../interfaces/api/external";

export interface INotificationIconProps {
  notificationType: string;
  relatedUsers: IUserNotificationRelatedUsersType[];
}

const NotificationIcon: React.FC<INotificationIconProps> = ({
  notificationType,
  relatedUsers,
}) => {
  switch (notificationType) {
    case "connectionConfirmation":
      return (
        <Avatar
          src={relatedUsers[0].displayPictureUrl}
          alt={`${relatedUsers[0].name}${LABELS.NOTIFICATION_PROFILE_ALT}`}
          sx={notificationAvatarSx}
        />
      );
    case "connectionRequest":
      return (
        <Avatar
          src={relatedUsers[0].displayPictureUrl}
          alt={`${relatedUsers[0].name}${LABELS.NOTIFICATION_PROFILE_ALT}`}
          sx={notificationAvatarSx}
        />
      );

    default:
      return <NotificationsIcon sx={notificationIconSx} />;
  }
};

const notificationAvatarSx: SxProps<Theme> = {
  width: "60px",
  height: "60px",
};

const notificationIconSx: SxProps<Theme> = {
  fontSize: "40px",
};

export default NotificationIcon;
