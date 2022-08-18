import { IReactionTypes } from "../interfaces/api/external";

declare module "@mui/material/styles" {
  interface ThemeOptions {
    key: string;
    name: string;
  }

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
