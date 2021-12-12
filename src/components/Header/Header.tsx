import {
  AppBar,
  Container,
  IconButton,
  Menu,
  MenuItem,
  ThemeOptions,
  Toolbar,
  Typography,
} from "@mui/material";
import ColorLensIcon from "@mui/icons-material/ColorLens";
import LogoutIcon from "@mui/icons-material/Logout";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import React, { useState } from "react";
import Link from "next/link";
import { THEMES_LIST } from "../../constants/theme";
import { LABELS } from "../../constants/labels";
import { signOut, useSession } from "next-auth/react";
import { useAuthContext } from "../../contexts/AuthContext";

interface IHeaderProps {
  onThemeSelect: (selectedTheme: ThemeOptions) => void;
}

const Header: React.FC<IHeaderProps> = ({ onThemeSelect }) => {
  const { data: authData } = useSession();
  const { user } = useAuthContext();
  const [themeAnchorEl, setThemeAnchorEl] = useState<null | HTMLElement>(null);

  const handleThemeSelect = (themeOption: ThemeOptions) => {
    handleThemeClose();
    onThemeSelect(themeOption);
  };

  const handleThemeClose = () => setThemeAnchorEl(null);

  const handleThemeOpen = (event: React.MouseEvent<HTMLButtonElement>) =>
    setThemeAnchorEl(event.currentTarget);

  const handleSignOut = () => signOut();

  return (
    <AppBar position="sticky" sx={{ backgroundColor: "navbar.main" }}>
      <Container maxWidth="xl" sx={{ padding: 0 }}>
        <Toolbar>
          <Link href="/" passHref>
            <Typography
              variant="h5"
              sx={{
                flexGrow: 1,
                color: "navbar.contrastText",
                textTransform: "none",
              }}
            >
              {LABELS.TITLE}
            </Typography>
          </Link>

          {authData && (
            <Link href={`/profile/${user?.id}`} passHref>
              <IconButton aria-label="open profile">
                <AccountCircleIcon
                  fontSize="large"
                  sx={{ color: "navbar.contrastText" }}
                />
              </IconButton>
            </Link>
          )}

          <IconButton
            onClick={handleThemeOpen}
            aria-label="open drawer"
            aria-haspopup="true"
            sx={{ paddingX: 2 }}
          >
            <ColorLensIcon
              fontSize="large"
              sx={{ color: "navbar.contrastText" }}
            />
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

          {authData && (
            <>
              <IconButton onClick={handleSignOut} aria-label="logout">
                <LogoutIcon
                  fontSize="large"
                  sx={{ color: "navbar.contrastText" }}
                />
              </IconButton>
            </>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
