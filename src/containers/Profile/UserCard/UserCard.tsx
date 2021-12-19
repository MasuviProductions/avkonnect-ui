import { MouseEvent } from "react";
import {
  Avatar,
  Box,
  Button,
  Container,
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
import ModalLayout from "../../../components/ModalLayout";

interface IUserCardProps {}

const UserCard: React.FC<IUserCardProps> = () => {
  const {
    user: {
      isAuthUser,
      displayPictureUrl,
      backgroundImageUrl,
      name,
      currentPosition,
      email,
      aboutUser,
    },
  } = useUserContext();

  const [showAboutModal, setShowAboutModal] = useState<boolean>(false);
  const [showBackgroundImage, setShowBackgroundImage] = useState(false);
  const [showBackgroundImageCropper, setShowBackgroundImageCropper] =
    useState<boolean>(false);
  const [showDisplayPicture, setShowDisplayPicture] = useState<boolean>(false);
  const [showDisplayPictureCropper, setShowDisplayPictureCropper] =
    useState<boolean>(false);

  const handleBackgroundImageOpen = () => {
    setShowBackgroundImage(true);
  };

  const handleBackgroundImageClose = () => {
    setShowBackgroundImage(false);
  };

  const handleBackgroundImageCropperOpen = (
    event: MouseEvent<HTMLButtonElement>
  ) => {
    event.stopPropagation();
    setShowBackgroundImageCropper(true);
  };

  const handleBackgroundImageCropperClose = () => {
    setShowBackgroundImageCropper(false);
  };

  const handleDisplayPictureOpen = () => {
    setShowDisplayPicture(true);
  };

  const handleDisplayPictureClose = () => {
    setShowDisplayPicture(false);
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
          <Grid
            item
            xs={12}
            sx={userBackgroundContainer}
            onClick={handleBackgroundImageOpen}
          >
            <Image
              src={backgroundImageUrl || JPG.UserBGPlaceholder}
              alt="backgroundPicture"
              width={4}
              height={1}
              layout="responsive"
              priority
            />
            {isAuthUser && (
              <IconButton
                sx={userBackgroundEditButton}
                onClick={handleBackgroundImageCropperOpen}
              >
                <EditIcon fontSize="medium" />
              </IconButton>
            )}
          </Grid>

          <Grid container p={3}>
            <Grid item xs={12}>
              <Grid container>
                <Grid item xs={12} sx={userAvatarContainer}>
                  <Avatar
                    alt={name}
                    src={displayPictureUrl}
                    sx={handleUserAvatarSx}
                    onClick={
                      isAuthUser
                        ? handleDisplayPictureCropperOpen
                        : handleDisplayPictureOpen
                    }
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

            {!aboutUser && isAuthUser && (
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

        {showBackgroundImage && (
          <ModalLayout
            showModal={showBackgroundImage}
            onModalClose={handleBackgroundImageClose}
            showTitleBorder={false}
          >
            <Container sx={userBackgroundImagePreviewContainer}>
              <Image
                src={backgroundImageUrl || JPG.UserBGPlaceholder}
                alt="backgroundPicture"
                width={4}
                height={1}
                layout="responsive"
                priority
              />
            </Container>
          </ModalLayout>
        )}

        {showBackgroundImageCropper && (
          <UserImageSelector
            imageUrl={backgroundImageUrl}
            imageType="background_image"
            showModal={showBackgroundImageCropper}
            onModalClose={handleBackgroundImageCropperClose}
          />
        )}

        {showDisplayPicture && (
          <ModalLayout
            showModal={showDisplayPicture}
            onModalClose={handleDisplayPictureClose}
            showTitleBorder={false}
          >
            <Container sx={userDisplayPicturePreviewContainer}>
              <Image
                src={displayPictureUrl || JPG.UserBGPlaceholder}
                alt="displayPicture"
                width={1}
                height={1}
                layout="responsive"
                priority
              />
            </Container>
          </ModalLayout>
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

const userBackgroundImagePreviewContainer: SxProps<Theme> = (theme: Theme) => ({
  paddingBottom: 3,
});

const userBackgroundEditButton: SxProps<Theme> = (theme: Theme) => ({
  position: "absolute",
  zIndex: 2,
  top: "24px",
  right: "24px",
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

const userDisplayPicturePreviewContainer: SxProps<Theme> = (theme: Theme) => ({
  paddingBottom: 3,
});

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
