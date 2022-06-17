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
          <Typography variant="h6">
            Welcome to AVKonnect, the social media platform that helps media
            professionals network and conduct business. Users of the platform
            have diverse backgrounds in the media industry, including film,
            news, music, and event management. We assist in obtaining the
            necessary connection from our platform.
          </Typography>
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
            Our features allow us to better understand you as a user and
            recommend you to a potential match. A director looking for an actor
            for his next project, a news editor looking for a good journalist to
            cover a story, or a singer looking for a music producer are just a
            few examples, but there are endless opportunities available through
            the platform.
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
            We contribute to the development of your media career through the
            various features we offer, which enable you to communicate with many
            media executives and staff from all aspects of media channels.
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
