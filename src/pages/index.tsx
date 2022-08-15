import { GetServerSideProps, GetServerSidePropsResult } from "next";
import { Session } from "next-auth";
import { handleServerSideAuthenticationRedirect } from "../utils/generic";
import { NextPageWithSkeleton, SessionProps } from "../interfaces/app";
import Home from "../containers/Home";
// import LayoutCard from "../components/LayoutCard";

const HomePage: NextPageWithSkeleton = () => {
  return (
    <>
      {/* <LayoutCard withLighterBg>asd</LayoutCard> */}
      <Home />
    </>
  );
};

HomePage.Skeleton = Home.Skeleton;

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

export default HomePage;
