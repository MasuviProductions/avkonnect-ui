import { Grid } from "@mui/material";
import React from "react";
import AboutCardSkeleton from "./AboutCard/AboutCardSkeleton";
import UserCardSkeleton from "./UserCard/UserCardSkeleton";

const ProfileSkeleton: React.FC = () => {
  return (
    <>
      <Grid container>
        <Grid item mt={2} xs={12}>
          <UserCardSkeleton />
        </Grid>
        <Grid item mt={2} xs={12}>
          <AboutCardSkeleton />
        </Grid>
      </Grid>
    </>
  );
};

export default ProfileSkeleton;
