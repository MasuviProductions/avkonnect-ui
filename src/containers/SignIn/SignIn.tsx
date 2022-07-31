import { Grid, Box, Theme, Hidden } from "@mui/material";
import { SxProps } from "@mui/system";
import { signIn } from "next-auth/react";
import { useRouter } from "next/dist/client/router";
import { useEffect } from "react";
import { useState } from "react";
import { APP_ROUTES } from "../../constants/app";
import { useAuthContext } from "../../contexts/AuthContext";
import { ReactFCWithSkeleton } from "../../interfaces/app";
import SignInGrid from "./SignInGrid";
import DescriptionGrid from "./DescriptionGrid";
import SignInSkeleton from "./SignInSkeleton";
import Footer from "../Footer";

const SignIn: ReactFCWithSkeleton = () => {
  const router = useRouter();
  const { authUser, authLoading } = useAuthContext();
  const [redirectRoute, setRedirectRoute] = useState<string>();

  const handleSignIn = () => {
    signIn("cognito", {
      callbackUrl: `${window.location.origin}${redirectRoute}`,
    });
  };

  useEffect(() => {
    const encodedResolvedRedirectRoute =
      router.query.encodedResolvedRedirectRoute;
    if (encodedResolvedRedirectRoute) {
      setRedirectRoute(
        decodeURIComponent(encodedResolvedRedirectRoute as string)
      );
    } else {
      setRedirectRoute("");
    }
  }, [router.query.encodedResolvedRedirectRoute]);

  if (authLoading) return <></>;

  if (!authUser)
    return (
      <Box>
        <Box sx={landingBoxSx}>
          <Grid container spacing={4} justifyContent="center">
            <Grid item md={8} xs={12}>
              <DescriptionGrid handleSignIn={handleSignIn} />
            </Grid>
            <Hidden mdDown>
              <Grid item md={4}>
                <SignInGrid handleSignIn={handleSignIn} />
              </Grid>
            </Hidden>
          </Grid>
        </Box>
        <Hidden mdUp>
          <Footer footerType="bottom" />
        </Hidden>
      </Box>
    );
  else return <></>;
};

SignIn.Skeleton = SignInSkeleton;

const landingBoxSx: SxProps<Theme> = () => ({
  marginTop: "16px",
  paddingBottom: "16px",
});

export default SignIn;
