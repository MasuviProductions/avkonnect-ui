import { Grid, Theme } from "@mui/material";
import { SystemStyleObject } from "@mui/system";
import Image from "next/image";
import { SVG } from "../../assets/SVG";
import { LABELS } from "../../constants/labels";
import { ISpinLoaderSizeTypes } from "../../interfaces/app";
import { getSpinLoaderSize } from "../../utils/generic";

interface ISpinLoaderProps {
  fullWidth?: boolean;
  radius?: ISpinLoaderSizeTypes;
  padding?: number;
}

const SpinLoader: React.FC<ISpinLoaderProps> = ({
  fullWidth,
  radius,
  padding,
}) => {
  return (
    <Grid container>
      <Grid
        item
        display="flex"
        justifyContent="center"
        p={padding ? padding : 6}
        sx={loaderGridSx(fullWidth)}
      >
        <Image
          src={SVG.Spinner}
          alt={LABELS.LOADING}
          width={getSpinLoaderSize(radius)}
          height={getSpinLoaderSize(radius)}
          style={{ fill: "#000" }}
        />
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
