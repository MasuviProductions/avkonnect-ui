import { Button, Grid, Switch, Theme } from "@mui/material";
import { SxProps } from "@mui/system";
import LogoutIcon from "@mui/icons-material/Logout";
import { signOut } from "next-auth/react";
import LayoutCard from "../../../components/LayoutCard";
import UserMiniCard from "../../../components/UserMiniCard";
import { APP_ROUTES } from "../../../constants/app";
import { LABELS } from "../../../constants/labels";
import { useAuthContext } from "../../../contexts/AuthContext";
import ProfileDropdownItem from "./ProfileDropdownItem";
import Link from "next/link";
import { compile } from "path-to-regexp";

interface IProfileDropdownProps {
  onClick?: () => void;
}
const ProfileDropdown: React.FC<IProfileDropdownProps> = ({ onClick }) => {
  const { authUser } = useAuthContext();

  const handleSignOut = () => {
    signOut({
      callbackUrl: `${window.location.origin}${APP_ROUTES.SIGN_IN.route}`,
    });
  };

  if (!authUser) return <></>;

  return (
    <>
      <LayoutCard withBorder>
        <Grid container p={2} spacing={2}>
          <Grid item xs={12}>
            <UserMiniCard
              id={authUser?.id as string}
              name={authUser?.name as string}
              headline={authUser?.headline as string}
              displayPictureUrl={authUser?.displayPictureUrl as string}
            />
          </Grid>
          <Grid item xs={12}>
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
            <ProfileDropdownItem
              Icon={LogoutIcon}
              title={LABELS.LOGOUT}
              onClick={handleSignOut}
            />
          </Grid>
        </Grid>
      </LayoutCard>
    </>
  );
};

const viewProfileButton: SxProps<Theme> = (theme: Theme) => ({
  width: "100%",
});

export default ProfileDropdown;
