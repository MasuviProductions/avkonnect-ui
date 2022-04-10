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
  Hidden,
  ClickAwayListener,
} from "@mui/material";
import ColorLensIcon from "@mui/icons-material/ColorLens";
import React, { useCallback, useState } from "react";
import { SxProps } from "@mui/system";
import Link from "next/link";
import Image from "next/image";
import { THEMES_LIST } from "../../constants/theme";
import { LABELS } from "../../constants/labels";
import { useAuthContext } from "../../contexts/AuthContext";
import Head from "next/head";
import { APP_ROUTES } from "../../constants/app";
import SearchBar from "./SearchBar";
import ProfileDropdown from "./ProfileDropdown";
import UserMiniCard from "../../components/UserMiniCard";
import FeedbackForm from "./FeedbackForm";
import { PNG } from "../../assets/PNG";

interface IHeaderProps {
  onThemeSelect: (selectedTheme: ThemeOptions) => void;
}

const Header: React.FC<IHeaderProps> = ({ onThemeSelect }) => {
  const { authUser } = useAuthContext();
  const [themeAnchorEl, setThemeAnchorEl] = useState<null | HTMLElement>(null);
  const [showProfileDropdown, setShowProfileDropdown] =
    useState<boolean>(false);
  const [showFeedbackModal, setShowFeedbackModal] = useState<boolean>(false);

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

  const handleFeedbackModalOpen = () => {
    handleProfileDropdownClose();
    setShowFeedbackModal(true);
  };

  const handleFeedbackModalClose = useCallback(
    () => setShowFeedbackModal(false),
    []
  );

  return (
    <>
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
              <Box>
                <Hidden mdUp>
                  <Link href={APP_ROUTES.ROOT.route} passHref>
                    <Box sx={hoverPointer}>
                      <Image
                        src={PNG.AvkMobLogo}
                        alt=""
                        width={80}
                        height={80}
                      />
                    </Box>
                  </Link>
                </Hidden>
                <Hidden mdDown>
                  <Link href={APP_ROUTES.ROOT.route} passHref>
                    <Box sx={hoverPointer}>
                      <Image
                        src={PNG.AvkDeskLogo}
                        alt=""
                        width={130}
                        height={50}
                      />
                    </Box>
                  </Link>
                </Hidden>
              </Box>
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
              {THEMES_LIST.map(theme => (
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
                      <ProfileDropdown
                        onClick={handleProfileDropdownClose}
                        onFeedbackClick={handleFeedbackModalOpen}
                      />
                    </Box>
                  )}
                </Box>
              </ClickAwayListener>
            )}
          </Toolbar>
        </Container>
      </AppBar>

      {showFeedbackModal && (
        <>
          <FeedbackForm
            showModal={showFeedbackModal}
            onModalClose={handleFeedbackModalClose}
          />
        </>
      )}
    </>
  );
};

const userDropdownContainer: SxProps<Theme> = (theme: Theme) => ({
  position: "relative",
});

const userDropdown: SxProps<Theme> = (theme: Theme) => ({
  position: "absolute",
  top: "48px",
  right: 0,
});

// const LogoStyle: SxProps<Theme> = {
//   width: "auto",
//   height: "80px",
// };

const hoverPointer: SxProps<Theme> = {
  width: "fit-content",
  ":hover": {
    cursor: "pointer",
    transform: "scale(1.05)",
    transitionDuration: "0.2s",
  },
};

export default Header;
