import { GetServerSideProps, GetServerSidePropsResult } from "next";
import { Session } from "next-auth";
import Error from "../../../components/Error/Error";
import Profile from "../../../containers/Profile";
import UserContextProvider from "../../../contexts/UserContext";
import {
  AVConnectApiResponse,
  IUserProfileApiResponse,
} from "../../../interfaces/api/external";
import {
  IPageError,
  IProtectedPageProps,
  NextPageWithSkeleton,
} from "../../../interfaces/app";
import { fetchUserProfile } from "../../../utils/api";
import { handleServerSideAuthenticationRedirect } from "../../../utils/generic";

interface IProfilePageData {
  id: string;
  displayPictureUrl: string;
  backgroundImageUrl: string;
  email: string;
  name: string;
  connectionCount: number;
  currentPosition: string;
  headline: string;
  dateOfBirth: number | null;
  aboutUser: string;
  location: string;
  gender: string;
}

type IProfilePageProps = IProtectedPageProps<IProfilePageData>;

const ProfilePage: NextPageWithSkeleton<IProfilePageProps> = ({
  data,
  error,
}) => {
  if (!data) {
    return <Error.ContentUnavailable />;
  }

  return (
    <UserContextProvider
      id={data.id}
      displayPictureUrl={data.displayPictureUrl}
      backgroundImageUrl={data.backgroundImageUrl}
      email={data.email}
      name={data.name}
      connectionCount={data.connectionCount}
      currentPosition={data.currentPosition}
      headline={data.headline}
      dateOfBirth={data.dateOfBirth ?? undefined}
      aboutUser={data.aboutUser}
      isAuthUser={false}
      location={data.location}
      gender={data.gender}
    >
      <Profile />
    </UserContextProvider>
  );
};
ProfilePage.Skeleton = Profile.Skeleton;

export const getServerSideProps: GetServerSideProps<IProfilePageProps> = async (
  context: any
) => {
  const getSSRProps = async (
    session: Session
  ): Promise<GetServerSidePropsResult<IProfilePageProps>> => {
    const userProfileRes = await fetchUserProfile(
      session.accessToken as string,
      context.params.id as string
    );
    const transformedResponse =
      transformUserProfileResponsetoIProtectedPageProps(userProfileRes);

    return {
      props: {
        session,
        data: transformedResponse.data,
        error: transformedResponse.error,
      },
    };
  };
  return await handleServerSideAuthenticationRedirect(context, getSSRProps);
};

const transformUserProfileResponsetoIProtectedPageProps = (
  response: AVConnectApiResponse<IUserProfileApiResponse>
): { data: IProfilePageData | null; error: IPageError | null } => {
  if (!response.data) {
    const transformedError: IPageError = {
      errorCode: "unavailable",
    };
    return { data: null, error: transformedError };
  } else {
    const transformedData: IProfilePageData = {
      id: response.data.id,
      name: response.data.name,
      email: response.data.email,
      dateOfBirth: response.data.dateOfBirth || null,
      displayPictureUrl: response.data.displayPictureUrl,
      connectionCount: response.data.connectionCount,
      backgroundImageUrl: response.data.backgroundImageUrl,
      aboutUser: response.data.aboutUser,
      currentPosition: response.data.currentPosition,
      headline: response.data.headline,
      location: response.data.location || "",
      gender: response.data.gender || "",
    };

    return { data: transformedData, error: null };
  }
};

export default ProfilePage;
