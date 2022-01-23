import { Box, Skeleton, Typography } from "@mui/material";
import Head from "next/head";
import { GetServerSideProps, GetServerSidePropsResult } from "next";
import { Session } from "next-auth";
import { handleServerSideAuthenticationRedirect } from "../utils/generic";
import { NextPageWithSkeleton, SessionProps } from "../interfaces/app";

const Home: NextPageWithSkeleton = () => {
  return (
    <Box p={4} sx={{ minHeight: "100vh" }}>
      <Box sx={{ marginTop: "10%" }}>
        <Typography color="text.secondary" textAlign="center" variant="h3">
          Home feeds
        </Typography>
        <Typography color="text.secondary" textAlign="center">
          Under development
        </Typography>
        <Box
          sx={{
            marginTop: "40%",
          }}
        >
          <Typography color="text.secondary" textAlign="center">
            by
          </Typography>
          <Typography color="primary" textAlign="center" variant="h5">
            Masuvi Productions
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

const HomeSkeleton: React.FC = () => {
  return <Skeleton variant="rectangular" width="100%" height={500} />;
};

Home.Skeleton = HomeSkeleton;

interface IHomePageProps extends SessionProps {}

export const getServerSideProps: GetServerSideProps<IHomePageProps> = async (
  context: any
) => {
  const handlerSSRProps = async (
    session: Session
  ): Promise<GetServerSidePropsResult<IHomePageProps>> => {
    return {
      props: { session },
    };
  };

  return await handleServerSideAuthenticationRedirect(context, handlerSSRProps);
};

export default Home;
