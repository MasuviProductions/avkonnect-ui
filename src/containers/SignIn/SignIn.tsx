import {
  Button,
  Grid,
  Typography,
  Box,
  Container,
  Theme,
  Hidden,
} from "@mui/material";
import { SxProps } from "@mui/system";
import { signIn } from "next-auth/react";
import { useRouter } from "next/dist/client/router";
import Image from "next/image";
import { useEffect } from "react";
import { useState } from "react";
import { APP_ROUTES } from "../../constants/app";
import { LABELS } from "../../constants/labels";
import { useAuthContext } from "../../contexts/AuthContext";
import { ReactFCWithSkeleton } from "../../interfaces/app";
import AuthGrid from "./AuthGrid";
import DescriptionGrid from "./DescriptionGrid";
import { PNG } from "../../assets/PNG";
import SignInSkeleton from "./SignInSkeleton";

const SignIn: ReactFCWithSkeleton = () => {
  const router = useRouter();
  const { authUser, authError, authLoading } = useAuthContext();
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

  if (!authError && authUser) router.push(APP_ROUTES.ROOT.route);

  if (!authUser)
    return (
      <Box sx={landingBoxSx}>
        <Grid container spacing={4} justifyContent="center">
          <Grid item md={8} xs={12}>
            <DescriptionGrid handleSignIn={handleSignIn} />
          </Grid>
          <Hidden mdDown>
            <Grid item md={4}>
              <AuthGrid handleSignIn={handleSignIn} />
            </Grid>
          </Hidden>
        </Grid>
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
