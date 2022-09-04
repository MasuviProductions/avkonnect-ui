import { IReactionTypes } from "../interfaces/api/external";

declare module "@mui/material/styles" {
  interface ThemeOptions {
    key: "dark" | "light";
    name: string;
  }

  interface Theme extends ThemeOptions {}

  interface TypeBackground {
    navbar: string;
  }

  interface TypeText {
    navbar: string;
    link: string;
  }

  interface Palette {
    reactions: Record<IReactionTypes, string>;
  }

  interface PaletteOptions {
    reactions: Record<IReactionTypes, string>;
  }
}

export = "@mui/material/styles";
