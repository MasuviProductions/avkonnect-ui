import { Grid, Theme, Typography } from "@mui/material";
import { SystemStyleObject } from "@mui/system";
import ViewOverlay from "../../../components/ViewOverlay";
import { IOverlay } from "../../../components/ViewOverlay/ViewOverlay";
import { LABELS } from "../../../constants/labels";

interface IMediaUploadOverlayProps extends IOverlay {}

const MediaUploadOverlay: React.FC<IMediaUploadOverlayProps> = ({
  showOverlay,
  onOverlayClose,
}) => {
  return (
    <>
      <ViewOverlay showOverlay={showOverlay} onOverlayClose={onOverlayClose}>
        <Grid container alignItems="center" sx={MediaUploadOverlayContainerSx}>
          <Grid item xs={12} sx={MediaUploadContainerSx}>
            <Typography align="center">{LABELS.COMING_SOON}</Typography>
          </Grid>
        </Grid>
      </ViewOverlay>
    </>
  );
};

const MediaUploadOverlayContainerSx = (
  theme: Theme
): SystemStyleObject<Theme> => ({
  height: "100%",
  overflowY: "hidden",
  width: "inherit",
});

const mediaActionBarHeightInPx = 50 + 20;

const MediaUploadContainerSx = (theme: Theme): SystemStyleObject<Theme> => ({
  overflowY: "auto",
  // Height of postActionBarContainerSx
  // height: `calc(100% - ${mediaActionBarHeightInPx}px)`,
  padding: 1.5,
  paddingBottom: 5,
  // justifyItems:"center"
});

export default MediaUploadOverlay;
