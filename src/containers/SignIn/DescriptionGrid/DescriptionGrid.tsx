import { Box, Button, Hidden, Theme, Typography } from "@mui/material";
import { SxProps } from "@mui/system";
import Image from "next/image";
import { PNG } from "../../../assets/PNG";
import { LABELS } from "../../../constants/labels";
import { ReactFCWithSkeleton } from "../../../interfaces/app";
import DescriptionGridSkeleton from "./DescriptionGridSkeleton";

interface IDescriptionGridProps {
  handleSignIn: () => void;
}

const DescriptionGrid: ReactFCWithSkeleton<IDescriptionGridProps> = ({
  handleSignIn,
}) => {
  return (
    <Box>
      <Box>
        <Box p={1} sx={descriptionGridSx} textAlign="center">
          <Typography variant="h5" sx={{ marginTop: "8px" }}>
            AVKonnect Description
          </Typography>
        </Box>
        <Box my={2}>
          <Typography variant="button">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Deserunt
            porro deleniti itaque, voluptas, pariatur mollitia officiis magnam
            voluptatibus laudantium enim aut.
          </Typography>
        </Box>
        <Box>
          <Image
            src={PNG.PlaceHolder}
            alt="1080p placeholder"
            width="1368"
            height="720"
          />
        </Box>
        <Box my={1}>
          <Typography variant="body2">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui
            voluptatem, ratione magni perferendis natus, ex numquam quisquam
            officiis illum quas fugiat. Error, in amet omnis aperiam unde
            consectetur expedita illo, blanditiis odit autem corporis facere
            maxime repellat veritatis atque culpa aliquam quisquam tenetur rerum
            ipsum neque ut libero! Qui tempora nemo non labore unde, placeat ex
            explicabo ullam, esse voluptate vitae inventore nulla assumenda?
            Dolor officiis deleniti labore ducimus neque numquam tempore
            repellendus rerum hic eum! Cupiditate magnam dolores optio ad quae!
            Id nobis voluptate provident est atque? Pariatur consectetur
            asperiores architecto voluptates voluptas non corrupti totam hic
            doloremque sequi?
          </Typography>
        </Box>
        <Box>
          <Image
            src={PNG.PlaceHolder}
            alt="1080p placeholder"
            width="1368"
            height="720"
          />
        </Box>
        <Box my={1}>
          <Typography variant="body2">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui
            voluptatem, ratione magni perferendis natus, ex numquam quisquam
            officiis illum quas fugiat. Error, in amet omnis aperiam unde
            consectetur expedita illo, blanditiis odit autem corporis facere
            maxime repellat veritatis atque culpa aliquam quisquam tenetur rerum
            ipsum neque ut libero! Qui tempora nemo non labore unde, placeat ex
            explicabo ullam, esse voluptate vitae inventore nulla assumenda?
            Dolor officiis deleniti labore ducimus neque numquam tempore
            repellendus rerum hic eum! Cupiditate magnam dolores optio ad quae!
            Id nobis voluptate provident est atque? Pariatur consectetur
            asperiores architecto voluptates voluptas non corrupti totam hic
            doloremque sequi?
          </Typography>
        </Box>
      </Box>
      <Hidden mdUp>
        <Box textAlign="center" sx={floatingBtnSx}>
          <Button variant="contained" onClick={handleSignIn}>
            {LABELS.LOGIN_OR_REGISTER}
          </Button>
        </Box>
      </Hidden>
    </Box>
  );
};
DescriptionGrid.Skeleton = DescriptionGridSkeleton;

const descriptionGridSx: SxProps<Theme> = (theme: Theme) => ({
  paddingX: "16px",
  color: theme.palette.text.primary,
});

const floatingBtnSx: SxProps<Theme> = (theme: Theme) => ({
  position: "sticky",
  bottom: "20px",
  button: {
    boxShadow: `0px 0px 10px ${theme.palette.primary.dark}`,
  },
});

export default DescriptionGrid;
