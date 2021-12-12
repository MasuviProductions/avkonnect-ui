import { GetServerSideProps, GetServerSidePropsResult } from "next";
import { Session } from "next-auth";
import Error from "../../../components/Error/Error";
import API_ENDPOINTS from "../../../constants/api";
import Profile from "../../../containers/Profile";
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
  backgroundPictureUrl: string;
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
    <Profile
      displayPictureUrl={data.displayPictureUrl}
      backgroundPictureUrl={data.backgroundPictureUrl}
      email={data.email}
      name={data.name}
      currentPosition={data.currentPosition}
      headline={data.headline}
      dateOfBirth={data.dateOfBirth}
      aboutUser={data.aboutUser}
    />
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
      displayPictureUrl: response.data.displayPictureUrl
        ? API_ENDPOINTS.USER_DISPLAY_PICTURE.url(response.data.id)
        : "",
      backgroundPictureUrl: response.data.backgroundPictureUrl
        ? API_ENDPOINTS.USER_BACKGROUND_PICTURE.url(response.data.id)
        : "",
      aboutUser: response.data.aboutUser,
      currentPosition: response.data.currentPosition,
      headline: response.data.headline,
    };
    return { data: transformedData, error: null };
  }
};

export default ProfilePage;
