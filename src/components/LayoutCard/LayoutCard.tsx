import { Container, Grid, Theme } from "@mui/material";
import { SxProps } from "@mui/system";

interface ILayoutCardProps {}
const LayoutCard: React.FC<ILayoutCardProps> = ({ children }) => {
  return (
    <Container fixed sx={layoutCardContainer} disableGutters>
      {children}
    </Container>
  );
};

const layoutCardContainer: SxProps<Theme> = (theme: Theme) => ({
  borderRadius: "0.8rem",
  backgroundColor: theme.palette.background.paper,
  position: "relative",
});

export default LayoutCard;
