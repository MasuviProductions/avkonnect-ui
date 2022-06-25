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
  Badge,
} from "@mui/material";
import ColorLensIcon from "@mui/icons-material/ColorLens";
import PeopleIcon from "@mui/icons-material/People";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import React, { useCallback, useState } from "react";
import { SxProps } from "@mui/system";
import Link from "next/link";
import Image from "next/image";
import { THEMES_LIST } from "../../constants/theme";
import { LABELS } from "../../constants/labels";
import { useAuthContext } from "../../contexts/AuthContext";
import Head from "next/head";
import { APP_ROUTES, MAX_NOTIFICATION_BADGE_LIMIT } from "../../constants/app";
import SearchBar from "./SearchBar";
import ProfileDropdown from "./ProfileDropdown";
import UserMiniCard from "../../components/UserMiniCard";
import FeedbackForm from "./FeedbackForm";
import { PNG } from "../../assets/PNG";
import { compile } from "path-to-regexp";
import { useUserNotificationsContext } from "../../contexts/UserNotificationsContext";

interface IHeaderProps {
  onThemeSelect: (selectedTheme: ThemeOptions) => void;
}

const Header: React.FC<IHeaderProps> = ({ onThemeSelect }) => {
  const { userNotificationsCount } = useUserNotificationsContext();
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
          <>
            <Toolbar>
              <Typography
                variant="h5"
                sx={{
                  flexGrow: 1,
                  color: "navbar.contrastText",
                  textTransform: "none",
                }}
              >
                <>
                  <Hidden mdUp>
                    <Link href={APP_ROUTES.ROOT.route} passHref>
                      <Box sx={logoContainerSx}>
                        <Image
                          src={PNG.AvkMobLogo}
                          alt={LABELS.TITLE_LOGO}
                          width={50}
                          height={35}
                        />
                      </Box>
                    </Link>
                  </Hidden>
                  <Hidden mdDown>
                    <Link href={APP_ROUTES.ROOT.route} passHref>
                      <Box sx={logoContainerSx}>
                        <Typography sx={deskLogoTextSx}>avkonnect.</Typography>
                        {/* <Image
                          src={PNG.AvkDeskLogo}
                          alt={LABELS.TITLE_LOGO}
                          width={130}
                          height={50}
                        /> */}
                      </Box>
                    </Link>
                  </Hidden>
                </>
              </Typography>

              {/** TODO: Remove authUser check  */}
              {authUser && (
                <Box px={1}>
                  <SearchBar />
                </Box>
              )}

              {authUser && (
                <Link href={compile(APP_ROUTES.MY_NETWORK.route)()} passHref>
                  <IconButton sx={{ paddingX: 2 }}>
                    <PeopleIcon
                      fontSize="large"
                      sx={{ color: "navbar.contrastText" }}
                    />
                  </IconButton>
                </Link>
              )}

              {authUser && (
                <Link href={APP_ROUTES.NOTIFICATIONS.route} passHref>
                  <IconButton sx={iconBtnSx}>
                    <Badge
                      color="error"
                      badgeContent={userNotificationsCount}
                      max={MAX_NOTIFICATION_BADGE_LIMIT}
                      sx={notificationBadgeSx}
                    >
                      <NotificationsNoneIcon
                        fontSize="large"
                        sx={contrastIconSx}
                      />
                    </Badge>
                  </IconButton>
                </Link>
              )}

              <IconButton
                onClick={handleThemeOpen}
                aria-label="change theme"
                aria-haspopup="true"
                sx={{ paddingX: 2 }}
              >
                <ColorLensIcon fontSize="large" sx={contrastIconSx} />
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
          </>
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

const userDropdownContainer: SxProps<Theme> = {
  position: "relative",
};

const userDropdown: SxProps<Theme> = {
  position: "absolute",
  top: "48px",
  right: 0,
};

const logoContainerSx: SxProps<Theme> = {
  width: "fit-content",
  marginTop: "4px",
  ":hover": {
    cursor: "pointer",
    transform: "scale(1.05)",
    transitionDuration: "0.2s",
  },
};

const notificationBadgeSx: SxProps<Theme> = {
  "& .MuiBadge-badge": {
    right: -5,
    top: 10,
    padding: "0 4px",
  },
};

const iconBtnSx: SxProps<Theme> = { paddingX: 1 };

const contrastIconSx: SxProps<Theme> = { color: "navbar.contrastText" };

const deskLogoTextSx: SxProps<Theme> = {
  fontFamily: "'Quicksand' !important",
  fontSize: "34px",
  fontWeight: "600",
};

export default Header;
