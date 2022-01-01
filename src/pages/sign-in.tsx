import { Button, Grid, Typography, Box, Skeleton } from "@mui/material";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/dist/client/router";
import { useEffect } from "react";
import { useState } from "react";
import { APP_ROUTES } from "../constants/app";
import { LABELS } from "../constants/labels";
import { NextPageWithSkeleton } from "../interfaces/app";

const SignIn: NextPageWithSkeleton = () => {
  const router = useRouter();
  const { data: authData, status: authStatus } = useSession();
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

  if (authStatus === "loading") return <></>;

  if (authData) router.push(APP_ROUTES.ROOT.route);

  if (!authData)
    return (
      <>
        <Grid container justifyContent="center">
          <Grid item>
            <Box py={20}>
              <Button
                onClick={handleSignIn}
                variant="contained"
                sx={{ textTransform: "none" }}
              >
                <Typography align="center" variant="h4">
                  {LABELS.LOGIN_OR_REGISTER}
                </Typography>
              </Button>
            </Box>
          </Grid>
        </Grid>
      </>
    );
  else return <></>;
};

const SignInSkeleton: React.FC = () => {
  return <Skeleton variant="circular" width={500} height={500} />;
};

SignIn.Skeleton = SignInSkeleton;

export default SignIn;
