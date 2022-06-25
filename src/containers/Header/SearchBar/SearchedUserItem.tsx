import { SearchOutlined } from "@mui/icons-material";
import { SxProps, SystemStyleObject } from "@mui/system";
import Link from "next/link";
import { Avatar, Box, Grid, Hidden, Theme, Typography } from "@mui/material";
import { getEllipsedText, usernameToColor } from "../../../utils/generic";
import { compile } from "path-to-regexp";
import { APP_ROUTES } from "../../../constants/app";

interface ISearchedUserItemProps {
  id: string;
  name: string;
  headline: string;
  displayPictureUrl: string;
  onSearchItemClick?: () => void;
}
const SearchedUserItem: React.FC<ISearchedUserItemProps> = ({
  id,
  name,
  headline,
  displayPictureUrl,
  onSearchItemClick,
}) => {
  const handleUserAvatarSx = (theme: Theme): SystemStyleObject<Theme> => {
    return userAvatar(theme, usernameToColor(name));
  };

  const searchedUser = `${name} \u2027 ${headline || "--"}`;

  return (
    <Link href={compile(APP_ROUTES.PROFILE.route)({ id: id })} passHref>
      <Box onClick={onSearchItemClick} sx={searchItemContainer}>
        <Grid
          container
          justifyContent="space-between"
          alignItems="center"
          spacing={0}
        >
          <Grid item xs={10}>
            <Grid container alignItems="center">
              <Grid item xs={1}>
                <SearchOutlined fontSize="small" sx={searchIcon} />
              </Grid>
              <Hidden smUp>
                <Grid item>
                  <Typography variant="body1">
                    {getEllipsedText(searchedUser, 28)}
                  </Typography>
                </Grid>
              </Hidden>

              <Hidden smDown>
                <Grid item>
                  <Typography variant="body1">
                    {getEllipsedText(searchedUser, 30)}
                  </Typography>
                </Grid>
              </Hidden>
            </Grid>
          </Grid>
          <Grid item>
            <Avatar alt={name} src={displayPictureUrl} sx={handleUserAvatarSx}>
              {name[0]}
            </Avatar>
          </Grid>
        </Grid>
      </Box>
    </Link>
  );
};

const searchIcon: SxProps<Theme> = {
  color: "text.secondary",
  marginBottom: "-4px",
};

const userAvatar = (theme: Theme, color: string): SystemStyleObject<Theme> => {
  return {
    width: 30,
    height: 30,
    fontSize: "1rem",
    border: `1px solid ${theme.palette.background.default}`,
    backgroundColor: color,
    color: theme.palette.getContrastText(color),
  };
};

const searchItemContainer: SxProps<Theme> = (theme: Theme) => ({
  cursor: "pointer",
  padding: "10px 8px",
  color: theme.palette.text.primary,

  "&:hover": {
    backgroundColor: theme.palette.background.highlighted,
    color: theme.palette.getContrastText(theme.palette.background.highlighted),
  },

  [theme.breakpoints.up("sm")]: {
    borderRadius: "0.4rem",
  },
});

export default SearchedUserItem;
