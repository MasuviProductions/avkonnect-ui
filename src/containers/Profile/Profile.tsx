import { Grid } from "@mui/material";
import { ReactFCWithSkeleton } from "../../interfaces/app";
import ProfileSkeleton from "./ProfileSkeleton";
import UserCard from "./UserCard";
import AboutCard from "./AboutCard";
import SkillsCard from "./SkillsCard";
import { useAuthContext } from "../../contexts/AuthContext";

interface IProfileProps {}

const Profile: ReactFCWithSkeleton<IProfileProps> = () => {
  const { authUser } = useAuthContext();
  return (
    <Grid container>
      <Grid item mt={2} xs={12}>
        <UserCard />
      </Grid>
      <Grid item mt={2} xs={12}>
        <AboutCard />
      </Grid>

      {authUser && (
        <Grid item my={2} xs={12}>
          <SkillsCard />
        </Grid>
      )}
    </Grid>
  );
};
Profile.Skeleton = ProfileSkeleton;

export default Profile;
