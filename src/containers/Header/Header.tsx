import {
  AppBar,
  Container,
  IconButton,
  Menu,
  MenuItem,
  ThemeOptions,
  Toolbar,
  Typography,
  Theme,
  Box,
} from "@mui/material";
import ColorLensIcon from "@mui/icons-material/ColorLens";
import LogoutIcon from "@mui/icons-material/Logout";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import React, { useState } from "react";
import { SxProps } from "@mui/system";
import Link from "next/link";
import { THEMES_LIST } from "../../constants/theme";
import { LABELS } from "../../constants/labels";
import { signOut } from "next-auth/react";
import { useAuthContext } from "../../contexts/AuthContext";
import Head from "next/head";
import { compile } from "path-to-regexp";
import { APP_ROUTES } from "../../constants/app";
import SearchBar from "./SearchBar";

interface IHeaderProps {
  onThemeSelect: (selectedTheme: ThemeOptions) => void;
}

const Header: React.FC<IHeaderProps> = ({ onThemeSelect }) => {
  const { authUser } = useAuthContext();
  const [themeAnchorEl, setThemeAnchorEl] = useState<null | HTMLElement>(null);

  const handleThemeSelect = (themeOption: ThemeOptions) => {
    handleThemeClose();
    onThemeSelect(themeOption);
  };

  const handleThemeClose = () => {
    setThemeAnchorEl(null);
  };

  const handleThemeOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setThemeAnchorEl(event.currentTarget);
  };

  const handleSignOut = () => {
    signOut({
      callbackUrl: `${window.location.origin}${APP_ROUTES.SIGN_IN.route}`,
    });
  };

  return (
    <AppBar position="sticky" sx={{ backgroundColor: "navbar.main" }}>
      <Head>
        <title>AVConnect</title>
        <meta name="description" content="-by Masuvi Production" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Container maxWidth="xl" sx={{ padding: 0 }}>
        <Toolbar>
          <Typography
            variant="h5"
            sx={{
              flexGrow: 1,
              color: "navbar.contrastText",
              textTransform: "none",
            }}
          >
            <Link href={APP_ROUTES.ROOT.route} passHref>
              {LABELS.TITLE}
            </Link>
          </Typography>

          {/** TODO: Remove authUser check  */}
          {authUser && (
            <Box px={1}>
              <SearchBar />
            </Box>
          )}

          {authUser && (
            <Link
              href={compile(APP_ROUTES.PROFILE.route)({
                id: authUser.id as string,
              })}
              passHref
            >
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

          {authUser && (
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
