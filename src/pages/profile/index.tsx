import { Grid } from "@mui/material";
import type { GetServerSideProps, InferGetServerSidePropsType } from "next";
import UserCard from "../../containers/UserCard";

const Profile = ({}: InferGetServerSidePropsType<
  typeof getServerSideProps
>) => {
  return (
    <Grid container>
      <Grid item>
        <UserCard />
      </Grid>
    </Grid>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  await new Promise<string>((resolve) => {
    setTimeout(resolve, 2000);
  });

  return {
    props: {},
  };
};

export default Profile;
