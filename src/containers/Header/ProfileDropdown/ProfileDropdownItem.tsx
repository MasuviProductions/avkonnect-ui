import { Box, Grid, SvgIconTypeMap, Theme, Typography } from "@mui/material";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import ArrowForwardIcon from "@mui/icons-material/ArrowForwardIos";
import { SxProps } from "@mui/system";

interface IProfileDropdownItemProps {
  // Icon: OverridableComponent<SvgIconTypeMap<{}, "svg">>;
  title: string;
  description?: string;
  onClick?: () => void;
  showArrow?: boolean;
}

const ProfileDropdownItem: React.FC<IProfileDropdownItemProps> = ({
  title,
  description,
  onClick,
  showArrow = true,
  children,
}) => {
  return (
    <Box onClick={onClick}>
      <Grid
        container
        sx={profileItemContainer}
        justifyContent="space-between"
        alignItems="center"
      >
        <Grid item xs={showArrow ? 10 : 12}>
          <Grid container>
            {!!children && <Grid item>{children}</Grid>}
            <Grid item px={1} ml={1}>
              <Typography variant="body1" color="text.primary">
                {title}
              </Typography>
              {description && (
                <Typography variant="caption" color="text.secondary" mt={2}>
                  {description}
                </Typography>
              )}
            </Grid>
          </Grid>
        </Grid>
        {showArrow && (
          <Grid item>
            <ArrowForwardIcon />
          </Grid>
        )}
      </Grid>
    </Box>
  );
};

const profileItemContainer: SxProps<Theme> = {
  cursor: "pointer",
  padding: 1,
  color: "text.primary",

  "&:hover": {
    backgroundColor: "secondary.main",
  },
  borderRadius: { xs: "0.4rem" },
};

export default ProfileDropdownItem;
