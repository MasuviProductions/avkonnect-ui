import "../styles/globals.css";
import { useCallback, useState } from "react";
import type { AppProps } from "next/app";
import {
  createTheme,
  ThemeOptions,
  ThemeProvider,
  CssBaseline,
  Container,
  Theme,
} from "@mui/material";
import { SxProps } from "@mui/system";
import { CacheProvider, EmotionCache } from "@emotion/react";
import { THEMES_LIST } from "../constants/theme";
import Header from "../containers/Header";
import createEmotionCache from "../createEmotionCache";
import APIQueryClient from "../contexts/APIQueryClient";
import AuthContextProvider from "../contexts/AuthContext";
import UserProfileModalContextProvider from "../contexts/UserProfileModalContext";
import { SessionProvider } from "next-auth/react";
import WithPageSkeleton from "../components/WithPageSkeleton/WithPageSkeleton";
import SnackbarProvider from "../contexts/SnackbarContext";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import AdapterDayjs from "@mui/lab/AdapterDayjs";
import { SESSION_REFETCH_INTERVAL } from "../constants/app";
import UserNotificationsContextProvider from "../contexts/UserNotificationsContext";
import UserSettingsContextProvider from "../contexts/UserSettingsContext";

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppProps<{ Skeleton: React.FC }> {
  emotionCache: EmotionCache;
}

const MyApp = ({
  Component,
  pageProps,
  emotionCache = clientSideEmotionCache,
}: MyAppProps) => {
  const [theme, setTheme] = useState<ThemeOptions>(THEMES_LIST[0]);

  const onThemeSelect = useCallback(
    (selectedTheme: ThemeOptions) => setTheme(selectedTheme),
    []
  );

  return (
    <CacheProvider value={emotionCache}>
      <ThemeProvider theme={createTheme(theme)}>
        <APIQueryClient>
          <SessionProvider
            session={pageProps.session}
            refetchInterval={SESSION_REFETCH_INTERVAL}
          >
            <AuthContextProvider>
              <SnackbarProvider>
                <UserNotificationsContextProvider>
                  <UserProfileModalContextProvider>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <UserSettingsContextProvider
                        onThemeSelect={onThemeSelect}
                      >
                        <Header theme={theme} />
                        <Container maxWidth="lg" sx={containerSx}>
                          <WithPageSkeleton>
                            <Component {...pageProps} />
                          </WithPageSkeleton>
                        </Container>
                      </UserSettingsContextProvider>
                    </LocalizationProvider>
                  </UserProfileModalContextProvider>
                </UserNotificationsContextProvider>
              </SnackbarProvider>
            </AuthContextProvider>
          </SessionProvider>
          <CssBaseline />
        </APIQueryClient>
      </ThemeProvider>
    </CacheProvider>
  );
};

const containerSx: SxProps<Theme> = (theme: Theme) => ({
  [theme.breakpoints.down("sm")]: {
    padding: 0,
  },
});

export default MyApp;
