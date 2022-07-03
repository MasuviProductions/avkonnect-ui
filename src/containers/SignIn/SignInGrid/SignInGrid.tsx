import { Box, Button, Theme, Typography, Grid } from "@mui/material";
import { SxProps } from "@mui/system";
import Link from "next/link";
import LayoutCard from "../../../components/LayoutCard";
import { LABELS } from "../../../constants/labels";
import { ReactFCWithSkeleton } from "../../../interfaces/app";
import { getCurrentYear } from "../../../utils/generic";
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
      <Grid container mt={2} justifyContent="center" textAlign="center">
        <Grid item mr={2}>
          <Link href="/" passHref>
            <Typography sx={linkSx}>Privacy Policy</Typography>
          </Link>
        </Grid>
        <Grid item mr={2}>
          <Link href="/" passHref>
            <Typography sx={linkSx}>Data Policy</Typography>
          </Link>
        </Grid>
        <Grid item mr={2}>
          <Link href="/" passHref>
            <Typography sx={linkSx}>About Us</Typography>
          </Link>
        </Grid>
        <Grid item mr={2}>
          <Link href="/" passHref>
            <Typography sx={linkSx}>Contact Us</Typography>
          </Link>
        </Grid>
        <Grid item xs={12} ml={1} mt={1}>
          <Typography sx={copyrightSx}>
            AVKonnect. &copy; {getCurrentYear()}
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
};
SignInGrid.Skeleton = SignInGridSkeleton;

const stickyBoxSx: SxProps<Theme> = {
  position: "sticky",
  top: "140px",
};

const linkSx: SxProps<Theme> = (theme: Theme) => ({
  fontSize: "12px",
  color: theme.palette.text.primary,
  ":hover": {
    cursor: "pointer",
    textShadow: `0px 0px 1px ${theme.palette.text.primary}`,
  },
});

const copyrightSx: SxProps<Theme> = (theme: Theme) => ({
  fontSize: "13px",
  color: theme.palette.text.primary,
});

export default SignInGrid;
