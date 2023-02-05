import { GetServerSideProps, GetServerSidePropsResult } from "next";
import { Session } from "next-auth";
import Settings from "../../containers/Settings";
import { NextPageWithSkeleton, SessionProps } from "../../interfaces/app";
import { handleServerSideAuthenticationRedirect } from "../../utils/generic";

const SettingsPage: NextPageWithSkeleton = () => {
  return (
      <Settings />
  );
};

SettingsPage.Skeleton = Settings.Skeleton;

interface ISettingsPageProps extends SessionProps {}

export const getServerSideProps: GetServerSideProps<ISettingsPageProps> =
  async (context: any) => {
    const handlerSSRProps = async (
      session: Session
    ): Promise<GetServerSidePropsResult<ISettingsPageProps>> => {
      return {
        props: { session },
      };
    };

    return await handleServerSideAuthenticationRedirect(
      context,
      handlerSSRProps
    );
  };

export default SettingsPage