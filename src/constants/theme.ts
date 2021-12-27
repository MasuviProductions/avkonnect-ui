import { ThemeOptions } from "@mui/material";

interface ITheme {
  name: string;
  key: string;
  themeOption: ThemeOptions;
}

export const THEMES_LIST: ITheme[] = [
  {
    name: "Dark",
    key: "dark",
    themeOption: {
      palette: {
        primary: {
          main: "#ffcc22",
        },
        secondary: {
          main: "#ff1",
        },
        background: {
          default: "#000",
          paper: "#1d2222",
        },
        text: {
          primary: "#cacaca",
          secondary: "#888888",
        },
        navbar: {
          main: "#282828",
          contrastText: "#b2b2b2",
        },
      },
    },
  },
  {
    name: "Light",
    key: "light",
    themeOption: {
      palette: {
        primary: {
          main: "#222",
        },
        secondary: {
          main: "#0f2e42",
        },
        background: {
          default: "#d2d2d2",
          paper: "#fcfcfc",
        },
        text: {
          primary: "#0f2e42",
          secondary: "#999999",
        },
        navbar: {
          main: "#222",
          contrastText: "#b2b2b2",
        },
      },
    },
  },
];
