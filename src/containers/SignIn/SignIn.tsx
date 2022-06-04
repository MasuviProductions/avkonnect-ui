import { Button, Grid, Typography, Box } from "@mui/material";
import { signIn } from "next-auth/react";
import { useRouter } from "next/dist/client/router";
import { useEffect } from "react";
import { useState } from "react";
import { APP_ROUTES } from "../../constants/app";
import { LABELS } from "../../constants/labels";
import { useAuthContext } from "../../contexts/AuthContext";
import { ReactFCWithSkeleton } from "../../interfaces/app";
import SignInSkeleton from "./SignInSkeleton";

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

SignIn.Skeleton = SignInSkeleton;

export default SignIn;
