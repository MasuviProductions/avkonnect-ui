import { Grid } from "@mui/material";
import React from "react";
import UserCardSkeleton from "./UserCard/UserCardSkeleton";

const ProfileSkeleton: React.FC = () => {
  return (
    <>
      <Grid container>
        <Grid item mt={2} xs={12}>
          <UserCardSkeleton />
        </Grid>
      </Grid>
    </>
  );
};

export default ProfileSkeleton;
