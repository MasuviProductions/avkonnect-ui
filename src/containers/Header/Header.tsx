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
  ClickAwayListener,
} from "@mui/material";
import ColorLensIcon from "@mui/icons-material/ColorLens";
import React, { useCallback, useState } from "react";
import { SxProps } from "@mui/system";
import Link from "next/link";
import { THEMES_LIST } from "../../constants/theme";
import { LABELS } from "../../constants/labels";
import { useAuthContext } from "../../contexts/AuthContext";
import Head from "next/head";
import { APP_ROUTES } from "../../constants/app";
import SearchBar from "./SearchBar";
import ProfileDropdown from "./ProfileDropdown";
import UserMiniCard from "../../components/UserMiniCard";

interface IHeaderProps {
  onThemeSelect: (selectedTheme: ThemeOptions) => void;
}

const Header: React.FC<IHeaderProps> = ({ onThemeSelect }) => {
  const { authUser } = useAuthContext();
  const [themeAnchorEl, setThemeAnchorEl] = useState<null | HTMLElement>(null);
  const [showProfileDropdown, setShowProfileDropdown] =
    useState<boolean>(false);

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

  const handleProfileDropdownOpen = useCallback(() => {
    setShowProfileDropdown(true);
  }, []);

  const handleProfileDropdownClose = useCallback(() => {
    setShowProfileDropdown(false);
  }, []);

  return (
    <AppBar position="sticky" sx={{ backgroundColor: "navbar.main" }}>
      <Head>
        <title>{LABELS.TITLE}</title>
        <meta name="description" content="-by Masuvi Production" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Container maxWidth="lg" sx={{ padding: 0 }}>
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
            <ClickAwayListener onClickAway={handleProfileDropdownClose}>
              <Box sx={userDropdownContainer}>
                <UserMiniCard
                  id={authUser.id}
                  name={authUser.name}
                  headline={authUser.email}
                  displayPictureUrl={authUser.displayPictureUrl}
                  onlyThumbnail
                  onCardClick={handleProfileDropdownOpen}
                />

                {showProfileDropdown && (
                  <Box sx={userDropdown}>
                    <ProfileDropdown onClick={handleProfileDropdownClose} />
                  </Box>
                )}
              </Box>
            </ClickAwayListener>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};

const userDropdownContainer: SxProps<Theme> = (theme: Theme) => ({
  position: "relative",
});

const userDropdown: SxProps<Theme> = (theme: Theme) => ({
  position: "absolute",
  top: "48px",
  right: 0,
  width: "300px",
});

export default Header;
