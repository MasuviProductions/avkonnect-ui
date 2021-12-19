import {
  Avatar,
  Box,
  Button,
  Grid,
  IconButton,
  Link,
  Theme,
  Typography,
} from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import EditIcon from "@mui/icons-material/Edit";
import { SxProps, SystemStyleObject } from "@mui/system";
import Image from "next/image";
import LayoutCard from "../../../components/LayoutCard";
import { JPG } from "../../../assets/JPG";
import UserImageSelector from "./UserImageSelector/UserImageSelector";
import { useState } from "react";
import { usernameToColor } from "../../../utils/generic";
import EditAboutUser from "../EditAboutUser";
import { LABELS } from "../../../constants/labels";
import { useUserContext } from "../../../contexts/UserContext";

interface IUserCardProps {}

const UserCard: React.FC<IUserCardProps> = () => {
  const {
    user: {
      displayPictureUrl,
      backgroundImageUrl,
      name,
      currentPosition,
      email,
      aboutUser,
    },
  } = useUserContext();

  const [showAboutModal, setShowAboutModal] = useState<boolean>(false);
  const [showBackgroundImageCropper, setShowBackgroundImageCropper] =
    useState<boolean>(false);
  const [showDisplayPictureCropper, setShowDisplayPictureCropper] =
    useState<boolean>(false);

  const handleBackgroundImageCropperOpen = () => {
    setShowBackgroundImageCropper(true);
  };

  const handleBackgroundImageCropperClose = () => {
    setShowBackgroundImageCropper(false);
  };

  const handleDisplayPictureCropperOpen = () => {
    setShowDisplayPictureCropper(true);
  };

  const handleDisplayPictureCropperClose = () => {
    setShowDisplayPictureCropper(false);
  };

  const handleAboutModalOpen = () => {
    setShowAboutModal(true);
  };

  const handleAboutModalClose = () => {
    setShowAboutModal(false);
  };

  const handleUserAvatarSx = (theme: Theme): SystemStyleObject<Theme> => {
    return userAvatar(theme, usernameToColor(name));
  };

  const handleAddSummaryClick = () => {
    handleAboutModalOpen();
  };

  return (
    <>
      <LayoutCard>
        <Grid container>
          <Grid item xs={12} sx={userBackgroundContainer}>
            <Image
              src={backgroundImageUrl || JPG.UserBGPlaceholder}
              alt="backgroundPicture"
              width={4}
              height={1}
              layout="responsive"
              priority
            />
            <IconButton
              sx={userBackgroundEditButton}
              onClick={handleBackgroundImageCropperOpen}
            >
              <EditIcon fontSize="medium" />
            </IconButton>
          </Grid>

          <Grid container p={3}>
            <Grid item xs={12}>
              <Grid container>
                <Grid item xs={12} sx={userAvatarContainer}>
                  <Avatar
                    alt={name}
                    src={displayPictureUrl}
                    sx={handleUserAvatarSx}
                    onClick={handleDisplayPictureCropperOpen}
                  >
                    {name[0]}
                  </Avatar>
                </Grid>

                <Grid item xs={12} sm={8} md={6}>
                  <Grid container alignContent="flex-end">
                    <Grid item>
                      <Typography variant="h5">{name}</Typography>
                    </Grid>

                    <Grid item px={1}>
                      <Link href={`mailto:${email}`}>
                        <EmailIcon fontSize="large" />
                      </Link>
                    </Grid>
                  </Grid>
                  <Typography variant="body1">{currentPosition}</Typography>
                </Grid>

                <Grid item xs={12} sm={4} md={6}></Grid>
              </Grid>
            </Grid>

            {!aboutUser && (
              <Grid item mt={3}>
                <Button
                  color="primary"
                  variant="outlined"
                  onClick={handleAddSummaryClick}
                >
                  {LABELS.ADD_SUMMARY}
                </Button>
              </Grid>
            )}
          </Grid>
        </Grid>

        {showBackgroundImageCropper && (
          <UserImageSelector
            imageUrl={backgroundImageUrl}
            imageType="background_image"
            showModal={showBackgroundImageCropper}
            onModalClose={handleBackgroundImageCropperClose}
          />
        )}

        {showDisplayPictureCropper && (
          <UserImageSelector
            imageUrl={displayPictureUrl}
            imageType="display_picture"
            showModal={showDisplayPictureCropper}
            onModalClose={handleDisplayPictureCropperClose}
          />
        )}

        {showAboutModal && (
          <EditAboutUser
            showModal={showAboutModal}
            onModalClose={handleAboutModalClose}
          />
        )}
      </LayoutCard>
    </>
  );
};

const userBackgroundContainer: SxProps<Theme> = (theme: Theme) => ({
  position: "relative",
  borderRight: `1px solid ${theme.palette.background.paper}`,
  borderLeft: `1px solid ${theme.palette.background.paper}`,
  borderTop: `1px solid ${theme.palette.background.paper}`,
  borderRadius: "0.8rem 0.8rem 0 0",
  img: {
    borderRadius: "0.8rem 0.8rem 0 0",
  },
});

const userBackgroundEditButton: SxProps<Theme> = (theme: Theme) => ({
  position: "absolute",
  zIndex: 1,
  top: 24,
  right: 24,
  color: theme.palette.text.primary,
  bgcolor: theme.palette.background.default,
  ":hover": {
    bgcolor: theme.palette.background.default,
  },
});

const userAvatarContainer: SxProps<Theme> = {
  zIndex: 1,
  transform: "translateY(-280%)",
  height: "40px",
};

const userAvatar = (theme: Theme, color: string): SystemStyleObject<Theme> => {
  return {
    width: 140,
    height: 140,
    fontSize: "4rem",
    border: `3px solid ${theme.palette.background.default}`,
    backgroundColor: color,
    color: theme.palette.getContrastText(color),
    cursor: "pointer",
  };
};

export default UserCard;
