import { Box, Button, Theme, Typography, Grid } from "@mui/material";
import { SxProps } from "@mui/system";
import LayoutCard from "../../../components/LayoutCard";
import { LABELS } from "../../../constants/labels";
import { ReactFCWithSkeleton } from "../../../interfaces/app";
import Footer from "../../Footer";
import SignInGridSkeleton from "./SignInGridSkeleton";

interface IAuthGridProps {
  handleSignIn: () => void;
}

const SignInGrid: ReactFCWithSkeleton<IAuthGridProps> = ({ handleSignIn }) => {
  return (
    <Box sx={stickyBoxSx}>
      <LayoutCard withBoxShadow>
        <Grid
          container
          p={4}
          spacing={2}
          justifyContent="center"
          alignItems="center"
          flexDirection="column"
        >
          <Grid item xs={12}>
            <Typography variant="h6" textAlign="center">
              {LABELS.SIGNIN_BOX_HEADER_1}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6">{LABELS.SIGNIN_BOX_HEADER_2}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Button
              onClick={handleSignIn}
              variant="contained"
              sx={{ textTransform: "none" }}
            >
              <Typography align="center" variant="h6">
                {LABELS.SIGNUP_OR_SIGNIN}
              </Typography>
            </Button>
          </Grid>
        </Grid>
      </LayoutCard>
      <Footer footerType="side" />
    </Box>
  );
};
SignInGrid.Skeleton = SignInGridSkeleton;

const stickyBoxSx: SxProps<Theme> = {
  position: "sticky",
  top: "140px",
};

export default SignInGrid;
