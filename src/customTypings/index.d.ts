declare module "@mui/material/styles" {
  interface Palette {
    navbar: Palette["navbar"];
  }
  interface PaletteOptions {
    navbar: PaletteOptions["navbar"];
  }
}

export = "@mui/material/styles";
