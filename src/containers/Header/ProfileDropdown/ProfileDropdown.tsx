import { Box, Button, Grid, Theme, ThemeOptions } from "@mui/material";
import { SxProps } from "@mui/system";
import FeedbackIcon from "@mui/icons-material/Feedback";
import Switch from "@mui/material/Switch";
import { DarkMode, Logout, Settings } from "@mui/icons-material";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { compile } from "path-to-regexp";
import LayoutCard from "../../../components/LayoutCard";
import UserMiniCard from "../../../components/UserMiniCard";
import { APP_ROUTES } from "../../../constants/app";
import { LABELS } from "../../../constants/labels";
import { useAuthContext } from "../../../contexts/AuthContext";
import ProfileDropdownItem from "./ProfileDropdownItem";
import { THEMES_LIST } from "../../../constants/theme";

interface IProfileDropdownProps {
  onClick?: () => void;
  onFeedbackClick?: () => void;
  onSettingsClick?: () => void;
  onThemeSelect: (selectedTheme: ThemeOptions) => void;
  theme: ThemeOptions;
}

const ProfileDropdown: React.FC<IProfileDropdownProps> = ({
  theme,
  onClick,
  onFeedbackClick,
  onThemeSelect,
  onSettingsClick,
}) => {
  const { authUser } = useAuthContext();
  const handleThemeSwitch = () => {
    onThemeSelect(theme === THEMES_LIST[0] ? THEMES_LIST[1] : THEMES_LIST[0]);
  };

  const handleSignOut = () => {
    signOut({
      callbackUrl: `${window.location.origin}${APP_ROUTES.SIGN_IN.route}`,
    });
  };

  if (!authUser) return <></>;

  return (
    <>
      <Box sx={profileDropdownContainer}>
        <LayoutCard withBorder>
          <Grid container p={2}>
            <Grid item xs={12}>
              <UserMiniCard
                id={authUser?.id as string}
                name={authUser?.name as string}
                headline={authUser?.headline as string}
                displayPictureUrl={authUser?.displayPictureUrl as string}
              />
            </Grid>
            <Grid item xs={12} py={2}>
              <Link
                href={compile(APP_ROUTES.PROFILE.route)({
                  id: authUser.id as string,
                })}
                passHref
              >
                <Button
                  variant="outlined"
                  sx={viewProfileButton}
                  onClick={onClick}
                >
                  {LABELS.VIEW_PROFILE}
                </Button>
              </Link>
            </Grid>

            <Grid item xs={12}>
              <Box sx={profileDropdown}>
                <ProfileDropdownItem
                  title={LABELS.DARK_MODE}
                  onClick={handleThemeSwitch}
                  showArrow={false}
                  extraElement={
                    <Switch
                      checked={theme !== THEMES_LIST[0]}
                      onChange={handleThemeSwitch}
                      inputProps={{ "aria-label": "controlled" }}
                    />
                  }
                  description={LABELS.CHANGE_THEME}
                >
                  <DarkMode />
                </ProfileDropdownItem>
              </Box>
            </Grid>

            <Grid item xs={12}>
              <Box sx={profileDropdown}>
                <ProfileDropdownItem
                  title={LABELS.FEEDBACK}
                  description={LABELS.FEEDBACK_HELPER}
                  onClick={onFeedbackClick}
                  showArrow={false}
                >
                  <FeedbackIcon />
                </ProfileDropdownItem>
              </Box>
            </Grid>

            <Grid item xs={12}>
              <Box sx={profileDropdown}>
                <ProfileDropdownItem
                  title={LABELS.SETTINGS_AND_PRIVACY}
                  onClick={onSettingsClick}
                  showArrow={false}
                  // description={LABELS.CHANGE_THEME}
                >
                  <Settings />
                </ProfileDropdownItem>
              </Box>
            </Grid>

            <Grid item xs={12}>
              <Box sx={{pt:'1px'}}>
                <ProfileDropdownItem
                  title={LABELS.LOGOUT}
                  onClick={handleSignOut}
                >
                  <Logout />
                </ProfileDropdownItem>
              </Box>
            </Grid>
          </Grid>
        </LayoutCard>
      </Box>
    </>
  );
};

const viewProfileButton: SxProps<Theme> = {
  width: "100%",
};

const profileDropdownContainer: SxProps<Theme> = {
  width: "280px",
};

const profileDropdown: SxProps<Theme> = (theme: Theme) => ({
  // borderTop: `2px solid ${theme.palette.secondary.dark}`,
  borderBottom: `1px solid ${theme.palette.secondary.dark}`,
  padding:'1px 0 1px'
});

export default ProfileDropdown;
