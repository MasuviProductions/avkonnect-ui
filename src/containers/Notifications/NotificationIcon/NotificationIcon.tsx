import { Avatar, SxProps, Theme } from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { IUserNotificationRelatedUsersType } from "../../../interfaces/api/external";
import { usernameToColor } from "../../../utils/generic";
import { SystemStyleObject } from "@mui/system";

export interface INotificationIconProps {
  notificationType: string;
  relatedUsers: IUserNotificationRelatedUsersType[];
}

const NotificationIcon: React.FC<INotificationIconProps> = ({
  notificationType,
  relatedUsers,
}) => {
  const handleUserAvatarSx = (theme: Theme): SystemStyleObject<Theme> => {
    return userAvatar(
      theme,
      relatedUsers[0].displayPictureUrl
        ? theme.palette.background.default
        : usernameToColor(relatedUsers[0].name)
    );
  };
  switch (notificationType) {
    case "connectionConfirmation":
      return (
        <Avatar
          src={relatedUsers[0].displayPictureUrl}
          alt={`${relatedUsers[0].name}`}
          sx={handleUserAvatarSx}
        >
          {relatedUsers[0].name[0]}
        </Avatar>
      );
    case "connectionRequest":
      return (
        <Avatar
          src={relatedUsers[0].displayPictureUrl}
          alt={`${relatedUsers[0].name}`}
          sx={handleUserAvatarSx}
        >
          {relatedUsers[0].name[0]}
        </Avatar>
      );

    default:
      return <NotificationsIcon sx={notificationIconSx} />;
  }
};

const userAvatar = (theme: Theme, color: string): SystemStyleObject<Theme> => {
  return {
    width: 60,
    height: 60,
    fontSize: "2rem",
    border: `1px solid ${theme.palette.background.default}`,
    backgroundColor: color,
    color: theme.palette.getContrastText(color),
    cursor: "pointer",
  };
};

const notificationIconSx: SxProps<Theme> = {
  fontSize: "40px",
};

export default NotificationIcon;
