import { MouseEvent } from "react";
import {
  Avatar,
  Box,
  Button,
  Container,
  Grid,
  IconButton,
  Theme,
  Typography,
  Tooltip,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import SubtitlesIcon from "@mui/icons-material/Subtitles";
import GenderIcon from "../../../components/GenderIcon";
import BadgeIcon from "@mui/icons-material/Badge";
import CakeIcon from "@mui/icons-material/Cake";
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
import { useUserProfileModalContext } from "../../../contexts/UserProfileModalContext";
import ModalLayout from "../../../components/ModalLayout";
import ShareButton from "../../../components/ShareButton";
import EditUser from "./EditUser";
import dayjs from "dayjs";
import { IGender } from "../../../constants/forms/user-info/user-info";
import useProfileProgressSteps from "../../../hooks/useProfileProgressSteps";

interface IUserCardProps {}

const UserCard: React.FC<IUserCardProps> = () => {
  const {
    user: {
      isAuthUser,
      displayPictureUrl,
      backgroundImageUrl,
      name,
      headline,
      dateOfBirth,
      gender,
      email,
      location,
      aboutUser,
    },
  } = useUserContext();
  const { profileModals, showModal } = useUserProfileModalContext();

  const { profileProgressCompleted } = useProfileProgressSteps();

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
    if (displayPictureUrl) {
      setShowDisplayPicture(true);
    }
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
    showModal("aboutCardModal", true);
  };

  const handleAboutModalClose = () => {
    showModal("aboutCardModal", false);
  };

  const handleUserAvatarSx = (theme: Theme): SystemStyleObject<Theme> => {
    return userAvatar(
      theme,
      displayPictureUrl
        ? theme.palette.background.default
        : usernameToColor(name)
    );
  };

  const handleAddSummaryClick = () => {
    handleAboutModalOpen();
  };

  const handleEditUserModalOpen = () => {
    showModal("userProfileInfoCardModal", true);
  };

  const handleEditUserModalClose = () => {
    showModal("userProfileInfoCardModal", false);
  };

  return (
    <Box my={1}>
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
              alt={LABELS.BACKGROUND_PICTURE}
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
                <PhotoCameraIcon fontSize="medium" />
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

                <Grid item xs={12}>
                  <Grid container alignItems="center">
                    <Grid item xs={12}>
                      <Grid container justifyContent="space-between">
                        <Grid item>
                          <Grid container alignItems="center" spacing={1}>
                            <Grid item>
                              <Typography variant="h5">{name}</Typography>
                            </Grid>

                            {gender && (
                              <Grid item>
                                <GenderIcon gender={gender as IGender} />
                              </Grid>
                            )}

                            {profileProgressCompleted && isAuthUser && (
                              <Tooltip
                                title={
                                  LABELS.USER_PROFILE_PROGRESS_COMPLETED_BADGE
                                }
                              >
                                <BadgeIcon
                                  sx={profileCompletedBadgeSx}
                                  fontSize={"medium"}
                                />
                              </Tooltip>
                            )}

                            <Grid item>
                              <ShareButton title={name} />
                            </Grid>
                          </Grid>
                        </Grid>

                        <Grid item>
                          {isAuthUser && (
                            <IconButton
                              sx={userCardEditBtn}
                              onClick={handleEditUserModalOpen}
                            >
                              <EditIcon fontSize="medium" />
                            </IconButton>
                          )}
                        </Grid>
                      </Grid>
                    </Grid>

                    {headline && (
                      <Grid item xs={12}>
                        <Grid container alignItems="flex-start" spacing={1}>
                          <Grid item>
                            <SubtitlesIcon fontSize="small" />
                          </Grid>
                          <Grid item>
                            <Typography variant="subtitle2">
                              {headline}
                            </Typography>
                          </Grid>
                        </Grid>
                      </Grid>
                    )}

                    {typeof dateOfBirth != "undefined" && (
                      <Grid item xs={12}>
                        <Grid container alignItems="center" spacing={1}>
                          <Grid item>
                            <CakeIcon fontSize="small" />
                          </Grid>

                          <Grid item>
                            <Typography variant="subtitle2">
                              {dayjs(dateOfBirth).format("D MMM YYYY")}
                            </Typography>
                          </Grid>
                        </Grid>
                      </Grid>
                    )}

                    {location && (
                      <Grid item xs={12}>
                        <Grid container alignItems="flex-start" spacing={1}>
                          <Grid item>
                            <LocationOnIcon fontSize="small" />
                          </Grid>
                          <Grid item>{location}</Grid>
                        </Grid>
                      </Grid>
                    )}
                  </Grid>
                </Grid>
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
                alt={LABELS.BACKGROUND_PICTURE}
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

        {profileModals.userProfileInfoCardModal && (
          <ModalLayout
            showModal={profileModals.userProfileInfoCardModal}
            onModalClose={handleEditUserModalClose}
            title={LABELS.USER_INFO_TITLE}
          >
            <EditUser onModalClose={handleEditUserModalClose} />
          </ModalLayout>
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
                alt={LABELS.DISPLAY_PICTURE}
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

        {profileModals.aboutCardModal && (
          <EditAboutUser
            showModal={profileModals.aboutCardModal}
            onModalClose={handleAboutModalClose}
          />
        )}
      </LayoutCard>
    </Box>
  );
};

const userBackgroundContainer: SxProps<Theme> = (theme: Theme) => ({
  position: "relative",
  [theme.breakpoints.up("sm")]: {
    borderRight: `1px solid ${theme.palette.background.paper}`,
    borderLeft: `1px solid ${theme.palette.background.paper}`,
    borderTop: `1px solid ${theme.palette.background.paper}`,
    borderRadius: "0.4rem 0.4rem 0 0",
    img: {
      borderRadius: "0.4rem 0.4rem 0 0",
    },
  },

  [theme.breakpoints.down("sm")]: {
    marginTop: -2,
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
  height: "30px",
};

const userDisplayPicturePreviewContainer: SxProps<Theme> = (theme: Theme) => ({
  paddingBottom: 3,
});

const userAvatar = (theme: Theme, color: string): SystemStyleObject<Theme> => {
  return {
    zIndex: 1,
    transform: "translateY(-85%)",
    width: 140,
    height: 140,
    fontSize: "4rem",
    border: `3px solid ${theme.palette.background.default}`,
    backgroundColor: color,
    color: theme.palette.getContrastText(color),
    cursor: "pointer",

    [theme.breakpoints.down("sm")]: {
      transform: "translateY(-85%)",
      width: 100,
      height: 100,
    },
  };
};

const userCardEditBtn: SxProps<Theme> = (theme: Theme) => ({
  color: theme.palette.text.primary,
  marginLeft: 2,
});

const profileCompletedBadgeSx: SxProps<Theme> = (theme: Theme) => ({
  color: theme.palette.primary.light,
  marginLeft: "8px",
});

export default UserCard;
