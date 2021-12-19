import { Grid } from "@mui/material";
import { ReactFCWithSkeleton } from "../../interfaces/app";
import ProfileSkeleton from "./ProfileSkeleton";
import UserCard from "./UserCard";
import AboutCard from "./AboutCard";

interface IProfileProps {}

const Profile: ReactFCWithSkeleton<IProfileProps> = () => {
  return (
    <Grid container>
      <Grid item mt={2} xs={12}>
        <UserCard />
      </Grid>
      <Grid item mt={2} xs={12}>
        <AboutCard />
      </Grid>
    </Grid>
  );
};
Profile.Skeleton = ProfileSkeleton;

export default Profile;
