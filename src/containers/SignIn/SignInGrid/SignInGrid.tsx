import { Box, Button, Theme, Typography, Grid } from "@mui/material";
import { SxProps } from "@mui/system";
import LayoutCard from "../../../components/LayoutCard";
import { LABELS } from "../../../constants/labels";
import { ReactFCWithSkeleton } from "../../../interfaces/app";
import SignInGridSkeleton from "./SignInGridSkeleton";

interface IAuthGridProps {
  handleSignIn: () => void;
}

const SignInGrid: ReactFCWithSkeleton<IAuthGridProps> = ({ handleSignIn }) => {
  return (
    <Box sx={stickyBoxSx}>
      <LayoutCard withBorder>
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
    </Box>
  );
};
SignInGrid.Skeleton = SignInGridSkeleton;

const authGridSx: SxProps<Theme> = (theme: Theme) => ({
  backgroundColor: theme.palette.background.paper,
  padding: "16px",
  borderRadius: "12px",
  height: "400px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
});

const stickyBoxSx: SxProps<Theme> = (theme: Theme) => ({
  position: "sticky",
  top: "140px",
});

export default SignInGrid;
