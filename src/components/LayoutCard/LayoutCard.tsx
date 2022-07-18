import { Container, Theme } from "@mui/material";
import { SystemStyleObject } from "@mui/system";
import LayoutCardHeader, { ILayoutCartHeader } from "./LayoutCardHeader";

interface ILayoutCardProps {
  withBorder?: boolean;
  withBoxShadow?: boolean;
}

const LayoutCard: React.FC<ILayoutCardProps> & {
  Header: React.FC<ILayoutCartHeader>;
} = ({ children, withBorder = false, withBoxShadow = false }) => {
  const handleLayoutCartContainerSx = (
    theme: Theme
  ): SystemStyleObject<Theme> => {
    return layoutCardContainer(theme, withBorder, withBoxShadow);
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
  isBorder: boolean,
  isBoxShadow: boolean
): SystemStyleObject<Theme> => ({
  borderRadius: "0.4rem",
  backgroundColor: theme.palette.background.paper,
  position: "relative",
  border: isBorder ? `1px solid ${theme.palette.secondary.main}` : undefined,
  boxShadow: isBoxShadow
    ? `0px 0px 6px ${theme.palette.primary.dark}`
    : undefined,
  [theme.breakpoints.down("sm")]: {
    borderRadius: "0",
  },
});

export default LayoutCard;
