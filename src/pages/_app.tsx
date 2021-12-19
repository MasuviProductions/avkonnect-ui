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
import { SessionProvider } from "next-auth/react";
import WithPageSkeleton from "../components/WithPageSkeleton/WithPageSkeleton";

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
  const [theme, setTheme] = useState<ThemeOptions>(THEMES_LIST[0].themeOption);

  const onThemeSelect = useCallback(
    (selectedTheme: ThemeOptions) => setTheme(selectedTheme),
    []
  );

  return (
    <CacheProvider value={emotionCache}>
      <APIQueryClient>
        <ThemeProvider theme={createTheme(theme)}>
          <SessionProvider session={pageProps.session}>
            <AuthContextProvider>
              <Header onThemeSelect={onThemeSelect} />
              <Container maxWidth="lg" sx={containerSx}>
                <WithPageSkeleton>
                  <Component {...pageProps} />
                </WithPageSkeleton>
              </Container>
            </AuthContextProvider>
          </SessionProvider>
          <CssBaseline />
        </ThemeProvider>
      </APIQueryClient>
    </CacheProvider>
  );
};

const containerSx: SxProps<Theme> = (theme: Theme) => ({
  [theme.breakpoints.down("sm")]: {
    padding: 0,
  },
});

export default MyApp;
