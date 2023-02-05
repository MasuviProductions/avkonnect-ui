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
import { SxProps, SystemStyleObject } from "@mui/system";
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
import {useRouter} from "next/router";

interface IHeaderProps {
  onThemeSelect: (selectedTheme: ThemeOptions) => void;
  theme: ThemeOptions;
}

const Header: React.FC<IHeaderProps> = ({ theme, onThemeSelect }) => {
  const { userNotificationsCount } = useUserNotificationsContext();
  const { authUser } = useAuthContext();

  const [showProfileDropdown, setShowProfileDropdown] =
    useState<boolean>(false);
  const [showFeedbackModal, setShowFeedbackModal] = useState<boolean>(false);
  const router = useRouter();

  const handleProfileDropdownOpen = useCallback(() => {
    setShowProfileDropdown(true);
  }, []);

  const handleProfileDropdownClose = useCallback(() => {
    setShowProfileDropdown(false);
  }, []);

           
  const handleSettingsClick = () => {
    handleProfileDropdownClose();
    router.push(APP_ROUTES.SETTINGS.route);
  }

  const handleFeedbackModalOpen = () => {
    handleProfileDropdownClose();
    setShowFeedbackModal(true);
  };

  const handleFeedbackModalClose = useCallback(
    () => setShowFeedbackModal(false),
    []
  );

  const getTitle = () => {
    if (userNotificationsCount) {
      return `(${userNotificationsCount}) | ${LABELS.TITLE}`;
    }
    return LABELS.TITLE;
  };

  return (
    <>
      <AppBar position="sticky" sx={appBarSx}>
        <Head>
          <title>{getTitle()}</title>
          <meta name="description" content="-by Masuvi Production" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <Container maxWidth="lg" sx={{ padding: 0 }}>
          <>
            <Toolbar>
              <Box
                sx={{
                  flexGrow: 1,
                }}
              >
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
                      <Image
                        src={PNG.AvkDeskLogo}
                        alt={LABELS.TITLE_LOGO}
                        width={130}
                        height={50}
                      />
                    </Box>
                  </Link>
                </Hidden>
              </Box>

              {/** TODO: Remove authUser check  */}
              {authUser && (
                <Box px={1}>
                  <SearchBar />
                </Box>
              )}

              {authUser && (
                <Link href={compile(APP_ROUTES.MY_NETWORK.route)()} passHref>
                  <IconButton sx={iconBtnSx}>
                    <PeopleIcon fontSize="large" sx={contrastTextSx} />
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
                        sx={contrastTextSx}
                      />
                    </Badge>
                  </IconButton>
                </Link>
              )}

              {authUser && (
                <ClickAwayListener onClickAway={handleProfileDropdownClose}>
                  <Box sx={userDropdownContainer} ml={1}>
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
                          theme={theme}
                          onThemeSelect={onThemeSelect}
                          onClick={handleProfileDropdownClose}
                          onFeedbackClick={handleFeedbackModalOpen}
                          onSettingsClick={handleSettingsClick}
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

const appBarSx = (theme: Theme): SystemStyleObject<Theme> => ({
  backgroundColor: theme.palette.background.navbar,
});

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

const iconBtnSx: SxProps<Theme> = { paddingX: 2 };

const contrastTextSx = (theme: Theme): SystemStyleObject<Theme> => ({
  color: theme.palette.text.navbar,
});

export default Header;
