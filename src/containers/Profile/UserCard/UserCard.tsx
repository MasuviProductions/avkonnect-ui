import {
  Avatar,
  Box,
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

interface IUserCardProps {
  displayPictureUrl: string;
  backgroundImageUrl: string;
  email: string;
  name: string;
  currentPosition: string;
  headline: string;
  dateOfBirth: number;
  aboutUser: string;
}

const UserCard: React.FC<IUserCardProps> = ({
  displayPictureUrl,
  backgroundImageUrl,
  email,
  name,
  currentPosition,
  headline,
  dateOfBirth,
}) => {
  const [dpUrl, setDpUrl] = useState<string | undefined>(displayPictureUrl);
  const [bgUrl, setBgUrl] = useState<string | undefined>(backgroundImageUrl);
  const [showBackgroundImageCropper, setShowBackgroundImageCropper] =
    useState(false);
  const [showDisplayPictureCropper, setShowDisplayPictureCropper] =
    useState(false);

  const handleBackgroundImageCropperOpen = () => {
    setShowBackgroundImageCropper(true);
  };

  const handleBackgroundImageCropperClose = () => {
    setShowBackgroundImageCropper(false);
  };

  const onSuccessfulBgUrlUpload = (uploadUrl?: string) => {
    setBgUrl(uploadUrl);
  };

  const handleDisplayPictureCropperOpen = () => {
    setShowDisplayPictureCropper(true);
  };

  const handleDisplayPictureCropperClose = () => {
    setShowDisplayPictureCropper(false);
  };

  const onSuccessfulDpUrlUpload = (uploadUrl?: string) => {
    setDpUrl(uploadUrl);
  };

  const handleUserAvatarSx = (theme: Theme): SystemStyleObject<Theme> => {
    return userAvatar(theme, usernameToColor(name));
  };

  return (
    <>
      <LayoutCard>
        <Grid container>
          <Grid item xs={12} sx={userBackgroundContainer}>
            <Image
              src={bgUrl || JPG.UserBGPlaceholder}
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
                    src={dpUrl}
                    sx={handleUserAvatarSx}
                    onClick={handleDisplayPictureCropperOpen}
                  >
                    {name[0]}
                  </Avatar>
                </Grid>
                <Grid item xs={12} sm={8} md={6}>
                  <Grid container alignContent="flex-end">
                    <Grid>
                      <Typography variant="h5">{name}</Typography>
                    </Grid>
                    <Grid px={1}>
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
          </Grid>
        </Grid>

        {showBackgroundImageCropper && (
          <UserImageSelector
            imageUrl={bgUrl}
            imageType="background_image"
            onSuccessfulUpload={onSuccessfulBgUrlUpload}
            showModal={showBackgroundImageCropper}
            onModalClose={handleBackgroundImageCropperClose}
          />
        )}

        {showDisplayPictureCropper && (
          <UserImageSelector
            imageUrl={dpUrl}
            imageType="display_picture"
            onSuccessfulUpload={onSuccessfulDpUrlUpload}
            showModal={showDisplayPictureCropper}
            onModalClose={handleDisplayPictureCropperClose}
          />
        )}
      </LayoutCard>
    </>
  );
};

const userBackgroundContainer: SxProps<Theme> = { position: "relative" };

const userBackgroundEditButton: SxProps<Theme> = (theme: Theme) => ({
  position: "absolute",
  zIndex: 1,
  top: 5,
  right: 5,
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
