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
          default: "#1a1a1a",
          paper: "#222",
        },
        text: {
          primary: "#b2b2b2",
          secondary: "",
          disabled: "",
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
          main: "#063f57",
        },
        secondary: {
          main: "#0f2e42",
        },
        background: {
          default: "#d2d2d2",
          paper: "#eee",
        },
        text: {
          primary: "#0f2e42",
        },
        navbar: {
          main: "#063f57",
          contrastText: "#b2b2b2",
        },
      },
    },
  },
];
