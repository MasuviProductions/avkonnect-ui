import { GetServerSideProps, GetServerSidePropsResult } from "next";
import { Session } from "next-auth";
import Notifications from "../../containers/Notifications";
import { NextPageWithSkeleton, SessionProps } from "../../interfaces/app";
import { handleServerSideAuthenticationRedirect } from "../../utils/generic";

const NotificationsPage: NextPageWithSkeleton = () => {
  return (
    <>
      <Notifications />
    </>
  );
};

NotificationsPage.Skeleton = Notifications.Skeleton;

interface INotificationsPageProps extends SessionProps {}

export const getServerSideProps: GetServerSideProps<INotificationsPageProps> =
  async (context: any) => {
    const handlerSSRProps = async (
      session: Session
    ): Promise<GetServerSidePropsResult<INotificationsPageProps>> => {
      return {
        props: { session },
      };
    };

    return await handleServerSideAuthenticationRedirect(
      context,
      handlerSSRProps
    );
  };

export default NotificationsPage;
