import { SearchOutlined } from "@mui/icons-material";
import { SxProps, SystemStyleObject } from "@mui/system";
import { Avatar, Box, Grid, Theme, Typography } from "@mui/material";
import { usernameToColor } from "../../../utils/generic";
import Link from "next/link";
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

  return (
    <Box onClick={onSearchItemClick} sx={searchItemContainer}>
      <Link href={compile(APP_ROUTES.PROFILE.route)({ id: id })} passHref>
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
              <Grid item>
                <Typography variant="body1" color="text.primary">
                  {`${name} \u2027 ${headline || "--"}`}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <Avatar alt={name} src={displayPictureUrl} sx={handleUserAvatarSx}>
              {name[0]}
            </Avatar>
          </Grid>
        </Grid>
      </Link>
    </Box>
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
  "&:hover": {
    backgroundColor: theme.palette.text.secondary,
  },
  [theme.breakpoints.up("sm")]: {
    borderRadius: "8px",
  },
});

export default SearchedUserItem;