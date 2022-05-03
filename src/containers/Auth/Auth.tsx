import {
  Avatar,
  Box,
  Chip,
  Container,
  Divider,
  Grid,
  Tab,
  Tabs,
  Theme,
  Typography,
} from "@mui/material";
import { SxProps } from "@mui/system";
import { useRouter } from "next/dist/client/router";
import { useAuthContext } from "../../contexts/AuthContext";
import { ReactFCWithSkeleton } from "../../interfaces/app";
import SignInForm from "./SignIn/SignInForm";
import SignUpForm from "./SignUp/SignUpForm";
import { Lock } from "@mui/icons-material";
import { LABELS } from "../../constants/labels";
import OAuthSignForm from "../../components/OAuthSignForm";
import AuthSkeleton from "./AuthSkeleton";
import TabPanel from "../../components/TabPanel";
import { SyntheticEvent, useState } from "react";
import Image from "next/image";
import { PNG } from "../../assets/PNG";

interface IAuthProps {}

const Auth: ReactFCWithSkeleton<IAuthProps> = () => {
  const router = useRouter();

  const { authUser, authError, authLoading } = useAuthContext();

  const [activeTabValue, setActiveTabValue] = useState<number>(0);

  const handleChangeTabClick = (event: SyntheticEvent, newValue: number) => {
    setActiveTabValue(newValue);
  };

  if (authLoading) return <></>;

  // if (!authError && authUser) router.push(APP_ROUTES.ROOT.route);

  return (
    <Box mt={5}>
      <Container maxWidth="xs">
        <Box pt={2} sx={signInBoxSx} textAlign="center">
          <Box
            mt={2}
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Avatar
              sx={(theme: Theme) => ({
                backgroundColor: theme.palette.navbar.main,
                margin: "4px",
              })}
            >
              <Image src={PNG.AvkMobLogo} alt={LABELS.TITLE_LOGO} />
            </Avatar>
          </Box>
          <Grid container>
            <Grid item xs={12}>
              <Box p={2}>
                <Tabs value={activeTabValue} onChange={handleChangeTabClick}>
                  <Tab label={LABELS.SIGN_IN} sx={tabsSx} />
                  <Tab label={LABELS.SIGN_UP} sx={tabsSx} />
                </Tabs>
                <TabPanel value={activeTabValue} index={0}>
                  <Box mt={2}>
                    <SignInForm setActiveTabValue={setActiveTabValue} />
                  </Box>
                </TabPanel>
                <TabPanel value={activeTabValue} index={1}>
                  <Box mt={2}>
                    <SignUpForm setActiveTabValue={setActiveTabValue} />
                  </Box>
                </TabPanel>
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Divider sx={dividerSx}>
                <Typography variant="body2" color="primary">
                  OR
                </Typography>
              </Divider>
            </Grid>
            <Grid item xs={12}>
              <Box>
                <OAuthSignForm />
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Box>
  );
};
Auth.Skeleton = AuthSkeleton;

const signInBoxSx: SxProps<Theme> = (theme: Theme) => ({
  margin: "20px 10px",
  backgroundColor: theme.palette.background.paper,
  borderRadius: "12px",
});

const dividerSx: SxProps<Theme> = (theme: Theme) => ({
  "::before, ::after": {
    borderColor: theme.palette.primary.main,
  },
});

const tabsSx: SxProps<Theme> = (theme: Theme) => ({
  width: "50%",
});

export default Auth;
