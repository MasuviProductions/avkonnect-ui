import { NextPageWithSkeleton, SessionProps } from "../../interfaces/app";
import MyNetwork from "../../containers/MyNetwork";
import { GetServerSideProps, GetServerSidePropsResult } from "next";
import { Session } from "next-auth";
import { handleServerSideAuthenticationRedirect } from "../../utils/generic";

const MyNetworkPage: NextPageWithSkeleton = () => {
  return (
    <>
      <MyNetwork />
    </>
  );
};

MyNetworkPage.Skeleton = MyNetwork.Skeleton;

interface IMyNetworkPageProps extends SessionProps {}

export const getServerSideProps: GetServerSideProps<IMyNetworkPageProps> =
  async (context: any) => {
    const handlerSSRProps = async (
      session: Session
    ): Promise<GetServerSidePropsResult<IMyNetworkPageProps>> => {
      return {
        props: { session },
      };
    };

    return await handleServerSideAuthenticationRedirect(
      context,
      handlerSSRProps
    );
  };

export default MyNetworkPage;
