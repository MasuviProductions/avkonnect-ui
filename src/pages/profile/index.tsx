import { Grid, Box } from "@mui/material";
import type { NextPage } from "next";
import { Session } from "next-auth";
import UserCard from "../../containers/UserCard";
import { handleServerSideAuthenticationRedirect } from "../../utils/generic";

const Profile: NextPage = () => {
  return (
    <Grid container justifyContent="center">
      <Grid item>
        <Box sx={{ paddingY: 10 }}>
          <UserCard />
        </Box>{" "}
      </Grid>
    </Grid>
  );
};

export const getServerSideProps = async (context: any) => {
  const handlerSSRProps = (session: Session) => {
    return {
      props: { session },
    };
  };

  return handleServerSideAuthenticationRedirect(context, handlerSSRProps);
};

export default Profile;
