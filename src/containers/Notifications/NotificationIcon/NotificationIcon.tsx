import { Avatar, SxProps, Theme } from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { usernameToColor } from "../../../utils/generic";
import { SystemStyleObject } from "@mui/system";
import { IRelatedSource } from "../../../interfaces/api/external";

export interface INotificationIconProps {
  notificationType: string;
  relatedSource: IRelatedSource;
}

const NotificationIcon: React.FC<INotificationIconProps> = ({
  notificationType,
  relatedSource,
}) => {
  const handleUserAvatarSx = (theme: Theme): SystemStyleObject<Theme> => {
    return userAvatar(
      theme,
      relatedSource.displayPictureUrl
        ? theme.palette.background.default
        : usernameToColor(relatedSource.name)
    );
  };
  switch (notificationType) {
    case "connectionConfirmation":
      return (
        <Avatar
          src={relatedSource.displayPictureUrl}
          alt={`${relatedSource.name}`}
          sx={handleUserAvatarSx}
        >
          {relatedSource.name[0]}
        </Avatar>
      );
    case "connectionRequest":
      return (
        <Avatar
          src={relatedSource.displayPictureUrl}
          alt={`${relatedSource.name}`}
          sx={handleUserAvatarSx}
        >
          {relatedSource.name[0]}
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
  fontSize: "48px",
  margin: "0px 5px",
};

export default NotificationIcon;
