import { Grid, Box, Button, Hidden, Theme, Typography } from "@mui/material";
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
  // const imageTheme =(theme:Theme): SystemStyleObject<Theme>=>{

  //     if (theme.palette.background.default) {
  //     return{
  //       PNG.AvkDeskLogo
  //     }
  //     } else {
  //       return{
  //         PNG.AvkDeskLogoInverted
  //       }
  //     }

  // }
  return (
    <Grid container justifyContent="center" alignItems="center" p={1}>
      <Grid item xs={12}>
        {/* TODO: START DESCRIPTION HERE */}
        <Box p={1} sx={descriptionGridSx} textAlign="center">
          <Image
            src={PNG.AvkDeskLogo}
            alt="1080p placeholder"
            width="208"
            height="78"
          />
        </Box>
        <Box my={2}>
          <Typography variant="h6">{LABELS.DESCRIPTION_INTRO}</Typography>
        </Box>
        <Box>
          <Image
            src={PNG.avkonnectPost1}
            alt="1080p placeholder"
            width="720"
            height="720"
          />
        </Box>
        <Box my={1}>
          <Typography variant="inherit">
            {LABELS.DESCRIPTION_PARAGRAPH_1}
          </Typography>
        </Box>
        <Box>
          <Image
            src={PNG.avkonnectPost2}
            alt="1080p placeholder"
            width="720"
            height="720"
          />
        </Box>
        <Box my={1}>
          <Typography variant="inherit">
            {LABELS.DESCRIPTION_PARAGRAPH_2}
          </Typography>
        </Box>
        {/* TODO: END DESCRIPTION HERE */}
      </Grid>
      <Grid item sx={floatingBtnSx}>
        <Hidden mdUp>
          <Button variant="contained" onClick={handleSignIn}>
            {LABELS.SIGNUP_OR_SIGNIN}
          </Button>
        </Hidden>
      </Grid>
    </Grid>
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
