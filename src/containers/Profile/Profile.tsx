import { Grid } from "@mui/material";
import { ReactFCWithSkeleton } from "../../interfaces/app";
import ProfileSkeleton from "./ProfileSkeleton";
import UserCard from "./UserCard";
import AboutCard from "./AboutCard";
import SkillsCard from "./SkillsCard";
import { useAuthContext } from "../../contexts/AuthContext";
import ProjectsCard from "./ProjectsCard";
import ExperiencesCard from "./ExperiencesCard";
import CertificationsCard from "./CertificationsCard";

interface IProfileProps {}

const Profile: ReactFCWithSkeleton<IProfileProps> = () => {
  const { authUser } = useAuthContext();
  return (
    <Grid container>
      <Grid item xs={12}>
        <UserCard />
      </Grid>

      <Grid item xs={12}>
        <AboutCard />
      </Grid>

      <Grid item xs={12}>
        <SkillsCard />
      </Grid>

      <Grid item xs={12}>
        <ExperiencesCard />
      </Grid>

      <Grid item xs={12}>
        <ProjectsCard />
      </Grid>

      <Grid item xs={12}>
        <CertificationsCard />
      </Grid>
    </Grid>
  );
};
Profile.Skeleton = ProfileSkeleton;

export default Profile;
