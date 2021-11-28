import { Button, Grid, Typography, Box } from "@mui/material";
import { NextPage } from "next";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/dist/client/router";

const SignIn: NextPage = () => {
  const router = useRouter();
  const { data: authData, status: authStatus } = useSession();

  if (authStatus === "loading") return <></>;

  if (authData) router.push("/");

  if (!authData)
    return (
      <>
        <Grid container justifyContent="center">
          <Grid item>
            <Box sx={{ paddingY: 20 }}>
              <Button
                onClick={() => signIn("cognito")}
                variant="contained"
                sx={{ textTransform: "none" }}
              >
                <Typography align="center" variant="h4">
                  Sign-in
                </Typography>{" "}
              </Button>
            </Box>
          </Grid>
        </Grid>
      </>
    );
  else return <></>;
};

export default SignIn;
