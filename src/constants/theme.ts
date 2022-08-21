import { ThemeOptions } from "@mui/material";

export const THEMES_LIST: ThemeOptions[] = [
  {
    name: "Light",
    key: "light",
    palette: {
      primary: {
        main: "#222",
      },
      secondary: {
        dark: "#cacaca",
        main: "#dadada",
      },
      background: {
        default: "#f2f2f2",
        paper: "#fefefe",
        navbar: "#222",
      },
      text: {
        primary: "#222",
        secondary: "#999999",
        navbar: "#b2b2b2",
        link: "#0a66c2",
      },
      reactions: {
        sad: "#5d6163",
        laugh: "#ed771c",
        love: "#c21557",
        like: "#207ed6",
        support: "#a38864",
      },
    },
  },
  {
    name: "Dark",
    key: "dark",
    palette: {
      primary: {
        main: "#ffcc22",
      },
      secondary: {
        dark: "#383838",
        main: "#444",
      },
      background: {
        default: "#000",
        paper: "#1d2222",
        navbar: "#282828",
      },
      text: {
        primary: "#cacaca",
        secondary: "#888888",
        navbar: "#b2b2b2",
        link: "#70b5f9",
      },
      reactions: {
        sad: "#5d6163",
        laugh: "#ed771c",
        love: "#c21557",
        like: "#207ed6",
        support: "#a38864",
      },
    },
  },
];
