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
    <Container sx={handleLayoutCartContainerSx} disableGutters>
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
    ? "0px 1px 2px 0px rgb(60 64 67 / 30%), 0px 2px 6px 2px rgb(60 64 67 / 15%)"
    : undefined,
  [theme.breakpoints.down("sm")]: {
    borderRadius: "0",
  },
});

export default LayoutCard;
