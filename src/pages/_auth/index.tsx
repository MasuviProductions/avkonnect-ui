import { GetServerSideProps, GetServerSidePropsResult } from "next";
import { Session } from "next-auth";
import Auth from "../../containers/Auth";
import { NextPageWithSkeleton, SessionProps } from "../../interfaces/app";
import { handleServerSideAuthenticationRedirect } from "../../utils/generic";

const AuthPage: NextPageWithSkeleton = () => {
  return (
    <>
      <Auth />
    </>
  );
};

AuthPage.Skeleton = Auth.Skeleton;

interface IAuthPageProps extends SessionProps {}

export const getServerSideProps: GetServerSideProps<IAuthPageProps> = async (
  context: any
) => {
  const handleSSRProps = async (
    session: Session
  ): Promise<GetServerSidePropsResult<IAuthPageProps>> => {
    return { props: { session } };
  };

  return await handleServerSideAuthenticationRedirect(context, handleSSRProps);
};

export default AuthPage;
