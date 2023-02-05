import { Box, Grid, Theme } from "@mui/material";
import { SystemStyleObject } from "@mui/system";
import Image from "next/image";
import { SVG } from "../../assets/SVG";
import { LABELS } from "../../constants/labels";

type ISpinLoaderSizeTypes = "xs" | "sm" | "md" | "lg" | "xl";

type ISpinLoaderSize = Record<ISpinLoaderSizeTypes, number>;

interface ISpinLoaderProps {
  fullWidth?: boolean;
  radiusSize?: ISpinLoaderSizeTypes;
  padding?: number;
}

const SpinLoader: React.FC<ISpinLoaderProps> = ({
  fullWidth,
  radiusSize,
  padding,
}) => {
  const spinLoaderRadius: ISpinLoaderSize = {
    xl: 60,
    lg: 50,
    md: 40,
    sm: 30,
    xs: 20,
  };

  return (
    <Grid container justifyContent="center">
      <Grid item p={padding!==undefined ? padding : 6}>
        <Box sx={loaderGridSx(fullWidth)}>
          <Image
            src={SVG.Spinner}
            alt={LABELS.LOADING}
            width={spinLoaderRadius[radiusSize || "md"]}
            height={spinLoaderRadius[radiusSize || "md"]}
          />
        </Box>
      </Grid>
    </Grid>
  );
};

const loaderGridSx: (fullWidth?: boolean) => () => SystemStyleObject<Theme> = (
  fullWidth?: boolean
) => {
  return () => ({
    width: fullWidth ? "100%" : "fit-content",
  });
};

export default SpinLoader;
