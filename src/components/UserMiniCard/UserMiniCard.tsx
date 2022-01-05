import { Avatar, Container, Grid, Theme, Typography } from "@mui/material";
import { SxProps, SystemStyleObject } from "@mui/system";
import { compile } from "path-to-regexp";
import Link from "next/link";
import { APP_ROUTES } from "../../constants/app";
import { usernameToColor } from "../../utils/generic";
import { ReactFCWithSkeleton } from "../../interfaces/app";
import UserMiniCardSkeleton from "./UserMiniCardSkeleton";

interface IUserMiniCardProps {
  id: string;
  name: string;
  headline: string;
  displayPictureUrl: string;
}

const UserMiniCard: ReactFCWithSkeleton<IUserMiniCardProps> = ({
  id,
  name,
  headline,
  displayPictureUrl,
}) => {
  const handleUserAvatarSx = (theme: Theme): SystemStyleObject<Theme> => {
    return userAvatar(theme, usernameToColor(name));
  };

  return (
    <Link href={compile(APP_ROUTES.PROFILE.route)({ id: id })} passHref>
      <Grid container spacing={1} alignItems="center" sx={userStripContainer}>
        <Grid item>
          <Avatar alt={name} src={displayPictureUrl} sx={handleUserAvatarSx}>
            {name[0]}
          </Avatar>
        </Grid>
        <Grid item>
          <Grid container>
            <Grid item xs={12}>
              <Typography variant="body2">{name}</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body2"> {headline || "--"}</Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Link>
  );
};
UserMiniCard.Skeleton = UserMiniCardSkeleton;

const userAvatar = (theme: Theme, color: string): SystemStyleObject<Theme> => {
  return {
    width: 55,
    height: 55,
    fontSize: "1rem",
    border: `1px solid ${theme.palette.background.default}`,
    backgroundColor: color,
    color: theme.palette.getContrastText(color),
  };
};

const userStripContainer: SxProps<Theme> = (theme: Theme) => ({
  cursor: "pointer",
});

export default UserMiniCard;
