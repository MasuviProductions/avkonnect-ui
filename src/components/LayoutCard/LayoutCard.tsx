import { Grid, Theme } from "@mui/material";
import { SxProps } from "@mui/system";

const LayoutCard: React.FC = ({ children }) => {
  return (
    <Grid container sx={layoutCardContainer}>
      {children}
    </Grid>
  );
};

const layoutCardContainer: SxProps<Theme> = (theme: Theme) => ({
  border: `2px solid ${theme.palette.background.paper}`,
  borderRadius: "10px",
  backgroundColor: theme.palette.background.paper,
});

export default LayoutCard;
