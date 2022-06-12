declare module "@mui/material/styles" {
  interface Palette {
    navbar: Palette["navbar"];
    background: Palette["background"];
  }
  interface PaletteOptions {
    navbar: PaletteOptions["navbar"];
  }

  interface TypeBackground {
    highlighted: string;
  }
}

export = "@mui/material/styles";
