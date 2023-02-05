import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Box, Drawer, Grid, IconButton, Theme } from "@mui/material";
import { SystemStyleObject } from "@mui/system";
import { useEffect, useState } from "react";

export interface IOverlay {
  showOverlay: boolean;
  onOverlayClose: () => void;
}

interface IViewOverlayProps extends IOverlay {
  HeaderElement?: JSX.Element;
}

const ViewOverlay: React.FC<IViewOverlayProps> = ({
  showOverlay,
  onOverlayClose,
  HeaderElement,
  children,
}) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(showOverlay);

  const handleDrawerClose = () => {
    setIsDrawerOpen(false);
    onOverlayClose();
  };
  useEffect(() => {
    history.pushState(null, "", location.href);
    window.onpopstate = (e) => {
      history.go(1);
      handleDrawerClose();
    };
  });
  useEffect(() => {
    setIsDrawerOpen(showOverlay);
  }, [showOverlay]);

  return (
    <>
      <Drawer anchor="right" open={isDrawerOpen} onClose={handleDrawerClose}>
        <Grid container sx={overlayContainerSx}>
          <Grid item sx={overlayHeaderSx}>
            <Grid container direction="row" justifyContent="space-between">
              <Grid item>
                <IconButton onClick={handleDrawerClose}>
                  <ArrowBackIcon sx={backbuttonSx} />
                </IconButton>
              </Grid>
              <Grid item>{HeaderElement}</Grid>
            </Grid>
          </Grid>

          <Grid item sx={overlayBodySx}>
            {children}
          </Grid>
        </Grid>
      </Drawer>
    </>
  );
};

const overlayHeaderSx = (theme: Theme): SystemStyleObject<Theme> => ({
  backgroundColor: theme.palette.background.paper,
  borderBottom: `1px solid ${theme.palette.secondary.main}`,
  width: "inherit",
  height: "50px",
});

const overlayBodySx = (theme: Theme): SystemStyleObject<Theme> => ({
  height: `calc(100% - 50px)`,
  width: "inherit",
  overflowY: "auto",
});

const overlayContainerSx = (theme: Theme): SystemStyleObject<Theme> => ({
  width: "100vw",
  height: "100%",
  overflow: "hidden",
});

const backbuttonSx = (theme: Theme): SystemStyleObject<Theme> => ({
  color: theme.palette.text.primary,
});

export default ViewOverlay;
