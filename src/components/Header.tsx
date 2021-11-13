import {
  AppBar,
  Button,
  Container,
  IconButton,
  Menu,
  MenuItem,
  ThemeOptions,
  Toolbar,
  Typography,
} from "@mui/material";
import ColorLensIcon from "@mui/icons-material/ColorLens";
import React, { useState } from "react";
import Link from "next/link";
import { THEMES_LIST } from "../constants/theme";
import { LABELS } from "../constants/labels";

interface IHeaderProps {
  onThemeSelect: (selectedTheme: ThemeOptions) => void;
}

const Header: React.FC<IHeaderProps> = ({ onThemeSelect }) => {
  const [themeAnchorEl, setThemeAnchorEl] = useState<null | HTMLElement>(null);

  const handleThemeSelect = (themeOption: ThemeOptions) => {
    handleThemeClose();
    onThemeSelect(themeOption);
  };

  const handleThemeClose = () => setThemeAnchorEl(null);

  const handleThemeOpen = (event: React.MouseEvent<HTMLButtonElement>) =>
    setThemeAnchorEl(event.currentTarget);

  return (
    <AppBar position="sticky" sx={{ backgroundColor: "navbar.main" }}>
      <Container maxWidth="xl">
        <Toolbar>
          <Link href="/" passHref>
            <Typography
              variant="h5"
              sx={{ flexGrow: 1, color: "navbar.contrastText" }}
            >
              {LABELS.TITLE}
            </Typography>
          </Link>

          <Link href="/profile" passHref>
            <Button sx={{ color: "navbar.contrastText" }}>Profile</Button>
          </Link>

          <IconButton
            onClick={handleThemeOpen}
            aria-label="open drawer"
            aria-haspopup="true"
          >
            <ColorLensIcon sx={{ color: "navbar.contrastText" }} />
          </IconButton>

          <Menu
            id="theme-selector"
            anchorEl={themeAnchorEl}
            keepMounted
            open={Boolean(themeAnchorEl)}
            onClose={handleThemeClose}
          >
            {THEMES_LIST.map((theme) => (
              <MenuItem
                key={theme.key}
                onClick={() => handleThemeSelect(theme.themeOption)}
              >
                {theme.name}
              </MenuItem>
            ))}
          </Menu>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
