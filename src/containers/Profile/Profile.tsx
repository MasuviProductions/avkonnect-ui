import { Grid, SxProps, Theme } from "@mui/material";
import { ReactFCWithSkeleton } from "../../interfaces/app";
import ProfileSkeleton from "./ProfileSkeleton";
import UserCard from "./UserCard";
import AboutCard from "./AboutCard";
import SkillsCard from "./SkillsCard";
import ProfileProgressCard from "./ProfileProgressCard";
import { useAuthContext } from "../../contexts/AuthContext";
import ProjectsCard from "./ProjectsCard";
import ExperiencesCard from "./ExperiencesCard";
import CertificationsCard from "./CertificationsCard";
import ProfilePosts from "./ProfilePosts/ProfilePosts";

interface IProfileProps {}

const Profile: ReactFCWithSkeleton<IProfileProps> = () => {
  const { authUser } = useAuthContext();
  return (
    <Grid container columnSpacing={1.5}>
      <Grid item xs={12}>
        <UserCard />
      </Grid>

      <Grid item xs={12}>
        {authUser && (
          <Grid item xs={12}>
            <ProfileProgressCard />
          </Grid>
        )}
      </Grid>

      <Grid item xs={12} md={6}>
        <Grid container sx={userProfileContentsSx}>
          <Grid item xs={12}>
            <AboutCard />
          </Grid>

          {authUser && (
            <Grid item xs={12}>
              <SkillsCard />
            </Grid>
          )}

          {authUser && (
            <Grid item xs={12}>
              <ExperiencesCard />
            </Grid>
          )}

          {authUser && (
            <Grid item xs={12}>
              <ProjectsCard />
            </Grid>
          )}

          {authUser && (
            <Grid item xs={12}>
              <CertificationsCard />
            </Grid>
          )}
        </Grid>
      </Grid>

      {authUser && (
        <Grid item xs={12} md={6}>
          <ProfilePosts />
        </Grid>
      )}
    </Grid>
  );
};
Profile.Skeleton = ProfileSkeleton;

const userProfileContentsSx: SxProps<Theme> = (theme: Theme) => ({
  [theme.breakpoints.up("md")]: {
    top: "65px",
    position: "sticky",
    marginBottom: 5,
  },
});

export default Profile;
