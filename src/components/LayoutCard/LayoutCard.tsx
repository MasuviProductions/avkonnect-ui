import { Container, Grid, Theme } from "@mui/material";
import { SxProps } from "@mui/system";
import LayoutCardHeader, { ILayoutCartHeader } from "./LayoutCardHeader";

interface ILayoutCardProps {}

const LayoutCard: React.FC<ILayoutCardProps> & {
  Header: React.FC<ILayoutCartHeader>;
} = ({ children }) => {
  return (
    <Container fixed sx={layoutCardContainer} disableGutters>
      {children}
    </Container>
  );
};

LayoutCard.Header = LayoutCardHeader;

const layoutCardContainer: SxProps<Theme> = (theme: Theme) => ({
  borderRadius: "0.8rem",
  backgroundColor: theme.palette.background.paper,
  position: "relative",

  [theme.breakpoints.down("sm")]: {
    borderRadius: "0",
  },
});

export default LayoutCard;
