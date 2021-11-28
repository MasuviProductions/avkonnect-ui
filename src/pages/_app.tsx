import "../styles/globals.css";
import { useCallback, useState } from "react";
import type { AppProps } from "next/app";
import {
  createTheme,
  ThemeOptions,
  ThemeProvider,
  CssBaseline,
  Container,
} from "@mui/material";
import { CacheProvider, EmotionCache } from "@emotion/react";
import { THEMES_LIST } from "../constants/theme";
import Header from "../components/Header";
import createEmotionCache from "../createEmotionCache";
import APIQueryClient from "../contexts/APIQueryClient";
import AuthContextProvider from "../contexts/AuthContext";
import { SessionProvider } from "next-auth/react";

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppProps<{ requireAuth: boolean }> {
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
              <Container maxWidth="lg">
                <Component {...pageProps} />
              </Container>
            </AuthContextProvider>
          </SessionProvider>
          <CssBaseline />
        </ThemeProvider>
      </APIQueryClient>
    </CacheProvider>
  );
};

export default MyApp;
