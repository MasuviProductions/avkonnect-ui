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
import { THEMES_LIST } from "../src/constants/theme";
import Header from "../src/components/Header";
import createEmotionCache from "../src/createEmotionCache";
import APIQueryClient from "../src/contexts/APIQueryClient";

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppProps {
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
          <Header onThemeSelect={onThemeSelect} />
          <Container maxWidth="lg">
            <Component {...pageProps} />
          </Container>
          <CssBaseline />
        </ThemeProvider>
      </APIQueryClient>
    </CacheProvider>
  );
};

export default MyApp;
