import { Grid } from "@mui/material";
import Image from "next/image";
import { SVG } from "../../assets/SVG";

interface ISpinLoaderProps {
  isLoading: boolean;
  radius?: number;
  padding?: number;
}

const SpinLoader: React.FC<ISpinLoaderProps> = ({
  isLoading,
  radius,
  padding,
}) => {
  if (isLoading) {
    return (
      <Grid container>
        <Grid
          item
          xs={12}
          display="flex"
          justifyContent="center"
          p={padding ? padding : 6}
        >
          <Image
            src={SVG.Spinner}
            alt="loading..."
            width={radius ? radius : 50}
            height={radius ? radius : 50}
            style={{ fill: "#000" }}
          />
        </Grid>
      </Grid>
    );
  } else {
    return <></>;
  }
};

export default SpinLoader;
