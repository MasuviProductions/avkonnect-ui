import { GetServerSideProps, GetServerSidePropsResult } from "next";
import { Session } from "next-auth";
import SignInV2 from "../../containers/SignInV2";
import { NextPageWithSkeleton, SessionProps } from "../../interfaces/app";
import { handleServerSideAuthenticationRedirect } from "../../utils/generic";

const SignInV2Page: NextPageWithSkeleton = () => {
  return (
    <>
      <SignInV2 />
    </>
  );
};

SignInV2Page.Skeleton = SignInV2.Skeleton;

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

export default SignInV2Page;
