import { GetServerSideProps, GetServerSidePropsResult } from "next";
import { Session } from "next-auth";
import { useEffect } from "react";
import Error from "../../../components/Error/Error";
import API_ENDPOINTS from "../../../constants/api";
import Profile from "../../../containers/Profile";
import UserContextProvider, {
  useUserContext,
} from "../../../contexts/UserContext";
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
  displayPictureUrl: string;
  backgroundImageUrl: string;
  email: string;
  name: string;
  currentPosition: string;
  headline: string;
  dateOfBirth: number;
  aboutUser: string;
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
      displayPictureUrl={data.displayPictureUrl}
      backgroundImageUrl={data.backgroundImageUrl}
      email={data.email}
      name={data.name}
      currentPosition={data.currentPosition}
      headline={data.headline}
      dateOfBirth={data.dateOfBirth}
      aboutUser={data.aboutUser}
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
      name: response.data.name,
      email: response.data.email,
      dateOfBirth: response.data.dateOfBirth,
      displayPictureUrl: response.data.displayPictureUrl,
      backgroundImageUrl: response.data.backgroundImageUrl,
      aboutUser: response.data.aboutUser,
      currentPosition: response.data.currentPosition,
      headline: response.data.headline,
    };

    return { data: transformedData, error: null };
  }
};

export default ProfilePage;
