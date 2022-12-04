import { Box, Button, Grid, Theme } from "@mui/material";
import { SxProps } from "@mui/system";
import LogoutIcon from "@mui/icons-material/Logout";
import FeedbackIcon from "@mui/icons-material/Feedback";
import { signOut } from "next-auth/react";
import LayoutCard from "../../../components/LayoutCard";
import UserMiniCard from "../../../components/UserMiniCard";
import { APP_ROUTES } from "../../../constants/app";
import { LABELS } from "../../../constants/labels";
import { useAuthContext } from "../../../contexts/AuthContext";
import ProfileDropdownItem from "./ProfileDropdownItem";
import Link from "next/link";
import { compile } from "path-to-regexp";
import { grey } from "@mui/material/colors";
import {Settings} from "@mui/icons-material";

interface IProfileDropdownProps {
  onClick?: () => void;
  onFeedbackClick?: () => void;
  onSettingsClick?: () => void;
}

const ProfileDropdown: React.FC<IProfileDropdownProps> = ({
  onClick,
  onFeedbackClick,
  onSettingsClick,
}) => {
  const { authUser } = useAuthContext();

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
                  title={LABELS.SETTINGS_AND_PRIVACY}
                  onClick={onSettingsClick}
                  showArrow={false}
                >
                  <Settings />
                </ProfileDropdownItem>
              </Box>
            </Grid>

            <Grid item xs={12} pb={2}>
              <Box sx={profileDropdown} py={1}>
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
              <ProfileDropdownItem
                title={LABELS.LOGOUT}
                onClick={handleSignOut}
              >
                <LogoutIcon />
              </ProfileDropdownItem>
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
  borderBottom: `2px solid ${theme.palette.secondary.dark}`,
});

export default ProfileDropdown;
