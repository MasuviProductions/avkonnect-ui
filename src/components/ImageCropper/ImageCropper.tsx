import { Box, Container, Theme, Typography } from "@mui/material";
import { SxProps } from "@mui/system";
import { useState } from "react";
import Cropper from "react-easy-crop";
import { Area } from "react-easy-crop/types";
import { LABELS } from "../../constants/labels";

interface IImageCropper {
  aspectRatio?: number;
  image: string;
  fitType?: "horizontal-cover" | "contain" | "vertical-cover";
  onCropComplete?: (_croppedArea: Area, croppedAreaPixels: Area) => void;
}
const ImageCropper: React.FC<IImageCropper> = ({
  aspectRatio = 16 / 9,
  image,
  fitType,
  onCropComplete,
}) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);

  return (
    <Box sx={imageCropperContainer}>
      <Container sx={imageCropper}>
        <Cropper
          image={image}
          crop={crop}
          zoom={zoom}
          aspect={aspectRatio}
          onCropChange={setCrop}
          onCropComplete={onCropComplete}
          restrictPosition
          objectFit={fitType}
          onZoomChange={setZoom}
        />
        <Typography sx={imageCropperMessage} variant="body1">
          {LABELS.IMAGE_CROPPER_MESSAGE}
        </Typography>
      </Container>
    </Box>
  );
};

const imageCropper: SxProps<Theme> = (theme: Theme) => ({
  height: 300,
  position: "relative",
  backgroundColor: "black",
  opacity: 1,
});

const imageCropperContainer: SxProps<Theme> = {
  backgroundColor: "black",
  paddingX: 3,
  paddingY: 2,
};

const imageCropperMessage: SxProps<Theme> = {
  position: "relative",
  top: "260px",
  zIndex: 1,
  padding: 1,
  textAlign: "center",
  color: "whitesmoke",
};

export default ImageCropper;
