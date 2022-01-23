import { Avatar, Box, Container, Grid, Theme, Typography } from "@mui/material";
import { SxProps, SystemStyleObject } from "@mui/system";
import { compile } from "path-to-regexp";
import Link from "next/link";
import { APP_ROUTES } from "../../constants/app";
import { usernameToColor } from "../../utils/generic";
import { ReactFCWithSkeleton } from "../../interfaces/app";
import UserMiniCardSkeleton from "./UserMiniCardSkeleton";
import { useCallback, useMemo } from "react";

interface IUserMiniCardProps {
  id: string;
  name: string;
  headline: string;
  displayPictureUrl: string;
  onlyThumbnail?: boolean;
  onCardClick?: (id: string) => void;
}

const UserMiniCard: ReactFCWithSkeleton<IUserMiniCardProps> = ({
  id,
  name,
  headline,
  displayPictureUrl,
  onlyThumbnail = false,
  onCardClick,
}) => {
  const handleUserAvatarSx = useCallback(
    (theme: Theme): SystemStyleObject<Theme> => {
      return userAvatar(theme, usernameToColor(name), onlyThumbnail);
    },
    [name, onlyThumbnail]
  );

  const handleCardClick = () => {
    onCardClick?.(id);
  };

  const userCard = useMemo(
    (): JSX.Element => (
      <Grid container spacing={1} alignItems="center" sx={userStripContainer}>
        <Grid item>
          <Avatar alt={name} src={displayPictureUrl} sx={handleUserAvatarSx}>
            {name[0]}
          </Avatar>
        </Grid>
        {!onlyThumbnail && (
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
        )}
      </Grid>
    ),
    [displayPictureUrl, handleUserAvatarSx, headline, name, onlyThumbnail]
  );

  return (
    <>
      {onCardClick ? (
        <Box onClick={handleCardClick}>{userCard}</Box>
      ) : (
        <Link href={compile(APP_ROUTES.PROFILE.route)({ id: id })} passHref>
          {userCard}
        </Link>
      )}
    </>
  );
};
UserMiniCard.Skeleton = UserMiniCardSkeleton;

const userAvatar = (
  theme: Theme,
  color: string,
  isMini: boolean
): SystemStyleObject<Theme> => {
  return {
    width: isMini ? 40 : 55,
    height: isMini ? 40 : 55,
    fontSize: "1rem",
    border: `1px solid ${theme.palette.background.default}`,
    backgroundColor: color,
    color: theme.palette.getContrastText(color),
  };
};

const userStripContainer: SxProps<Theme> = (theme: Theme) => ({
  cursor: "pointer",
  color: theme.palette.text.primary,
});

export default UserMiniCard;
