import { Box, Grid, SvgIconTypeMap, Theme, Typography } from "@mui/material";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import ArrowForwardIcon from "@mui/icons-material/ArrowForwardIos";
import { SxProps } from "@mui/system";

interface IProfileDropdownItemProps {
  Icon: OverridableComponent<SvgIconTypeMap<{}, "svg">>;
  title: string;
  onClick?: () => void;
}

const ProfileDropdownItem: React.FC<IProfileDropdownItemProps> = ({
  Icon,
  title,
  onClick,
}) => {
  return (
    <Box onClick={onClick}>
      <Grid
        container
        sx={profileItemContainer}
        justifyContent="space-between"
        alignItems="center"
      >
        <Grid item xs={10}>
          <Grid container>
            <Grid item>
              <Icon />
            </Grid>
            <Grid item px={1}>
              <Typography variant="body1">{title}</Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <ArrowForwardIcon />
        </Grid>
      </Grid>
    </Box>
  );
};

const profileItemContainer: SxProps<Theme> = (theme: Theme) => ({
  cursor: "pointer",
  padding: 1,
  color: theme.palette.text.primary,

  "&:hover": {
    backgroundColor: theme.palette.grey[800],
    color: theme.palette.text.secondary,
  },
  [theme.breakpoints.up("sm")]: {
    borderRadius: "0.4rem",
  },
});

export default ProfileDropdownItem;
