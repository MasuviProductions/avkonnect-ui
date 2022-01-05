import { Container, Grid, Theme } from "@mui/material";
import { SxProps, SystemStyleObject } from "@mui/system";
import LayoutCardHeader, { ILayoutCartHeader } from "./LayoutCardHeader";

interface ILayoutCardProps {
  withBorder?: boolean;
}

const LayoutCard: React.FC<ILayoutCardProps> & {
  Header: React.FC<ILayoutCartHeader>;
} = ({ children, withBorder = false }) => {
  const handleLayoutCartContainerSx = (
    theme: Theme
  ): SystemStyleObject<Theme> => {
    return layoutCardContainer(theme, withBorder);
  };

  return (
    <Container fixed sx={handleLayoutCartContainerSx} disableGutters>
      {children}
    </Container>
  );
};

LayoutCard.Header = LayoutCardHeader;

const layoutCardContainer = (
  theme: Theme,
  isBorder: boolean
): SystemStyleObject<Theme> => ({
  borderRadius: "0.8rem",
  backgroundColor: theme.palette.background.paper,
  position: "relative",
  border: isBorder ? `1px solid ${theme.palette.grey[800]}` : undefined,
  [theme.breakpoints.down("sm")]: {
    borderRadius: "0",
  },
});

export default LayoutCard;
