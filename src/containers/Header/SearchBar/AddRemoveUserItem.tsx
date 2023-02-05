import { AddCircle, RemoveCircle, BlockOutlined } from "@mui/icons-material";
import { SxProps, SystemStyleObject } from "@mui/system";
import Link from "next/link";
import { Avatar, Box, Grid, Hidden, Theme, Typography } from "@mui/material";
import { getEllipsedText, usernameToColor } from "../../../utils/generic";
import { compile } from "path-to-regexp";
import { APP_ROUTES } from "../../../constants/app";

interface IAddRemoveUserItemProps {
  id: string;
  name: string;
  headline: string;
  displayPictureUrl: string;
  onSearchItemClick?: () => void;
  exists: boolean;
  addIcon?:JSX.Element
}
const AddRemoveUserItem: React.FC<IAddRemoveUserItemProps> = ({
  id,
  name,
  headline,
  displayPictureUrl,
  onSearchItemClick,
  exists,
  addIcon,
}) => {
  const handleUserAvatarSx = (theme: Theme): SystemStyleObject<Theme> => {
    return userAvatar(theme, usernameToColor(name));
  };

  const searchedUser = `${name} \u2027 ${headline || "--"}`;

  return (
    <Box onClick={onSearchItemClick} sx={searchItemContainer}>
      <Grid
        container
        justifyContent="space-between"
        alignItems="center"
        spacing={0}
      >
        <Grid item xs={11}>
          <Grid container alignItems="center">
            <Grid item xs={1.5}>
              <Avatar
                alt={name}
                src={displayPictureUrl}
                sx={handleUserAvatarSx}
              >
                {name[0]}
              </Avatar>
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
        <Grid item display="flex" alignItems="center">
          {!exists ? addIcon ? addIcon : <AddCircle /> : <RemoveCircle />}
        </Grid>
      </Grid>
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
  color: theme.palette.text.primary,

  "&:hover": {
    backgroundColor: theme.palette.secondary.main,
  },

  [theme.breakpoints.up("sm")]: {
    borderRadius: "0.4rem",
  },
});

export default AddRemoveUserItem;
