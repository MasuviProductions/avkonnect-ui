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
  }
  // interface Palette {
  //   navbar: Palette["navbar"];
  // }
  // interface PaletteOptions {
  //   navbar: PaletteOptions["navbar"];
  // }
}

export = "@mui/material/styles";
