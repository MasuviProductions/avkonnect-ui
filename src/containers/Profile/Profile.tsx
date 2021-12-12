import { Card, Grid } from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import React from "react";
import { ReactFCWithSkeleton } from "../../interfaces/app";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
// import UserCardSkeleton from "./Skeleton";
import { useAuthContext } from "../../contexts/AuthContext";
import ProfileSkeleton from "./ProfileSkeleton";
import UserCard from "./UserCard";

interface IProfileProps {
  displayPictureUrl: string;
  backgroundPictureUrl: string;
  email: string;
  name: string;
  currentPosition: string;
  headline: string;
  dateOfBirth: number;
  aboutUser: string;
}

const Profile: ReactFCWithSkeleton<IProfileProps> = ({
  displayPictureUrl,
  backgroundPictureUrl,
  email,
  name,
  currentPosition,
  headline,
  dateOfBirth,
  aboutUser,
}) => {
  const { user } = useAuthContext();

  return (
    <Grid container>
      <Grid item mt={2} xs={12}>
        <UserCard
          displayPictureUrl={displayPictureUrl}
          backgroundPictureUrl={backgroundPictureUrl}
          email={email}
          name={name}
          currentPosition={currentPosition}
          headline={headline}
          dateOfBirth={dateOfBirth}
          aboutUser={aboutUser}
        />
      </Grid>
    </Grid>
  );
};
Profile.Skeleton = ProfileSkeleton;

export default Profile;
