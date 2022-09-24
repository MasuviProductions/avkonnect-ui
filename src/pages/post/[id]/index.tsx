import { GetServerSideProps, GetServerSidePropsResult } from "next";
import { Session } from "next-auth";
import Error from "../../../components/Error/Error";
import PostPageView from "../../../containers/PostPageView";
import ResourceProvider from "../../../contexts/ResourceContext";
import {
  AVKonnectApiResponse,
  IPostApiResponse,
  IRelatedSource,
} from "../../../interfaces/api/external";
import {
  IPageError,
  IProtectedPageProps,
  NextPageWithSkeleton,
} from "../../../interfaces/app";
import { getPost } from "../../../utils/api";
import { handleServerSideAuthenticationRedirect } from "../../../utils/generic";
import { transformUsersListToUserIdUserMap } from "../../../utils/transformers";

type IPostPageProps = IProtectedPageProps<IPostApiResponse>;

const PostPage: NextPageWithSkeleton<IPostPageProps> = ({ data, error }) => {
  if (!data) {
    return <Error.ContentUnavailable />;
  }

  return (
    <ResourceProvider
      id={data.id}
      type={"post"}
      content={data.contents.slice(-1)[0]}
      sourceId={data.sourceId}
      sourceType={data.sourceType}
      reactionsCount={data.activity.reactionsCount}
      loadedComments={[]}
      commentsCount={data.activity.commentsCount}
      userReaction={data.sourceActivity?.reaction}
      createdAt={data.createdAt}
      updatedAt={data.updatedAt}
      relatedSourceMap={
        transformUsersListToUserIdUserMap(data.relatedSources) as Record<
          string,
          IRelatedSource
        >
      }
    >
      <PostPageView />
    </ResourceProvider>
  );
};
PostPage.Skeleton = PostPageView.Skeleton;

export const getServerSideProps: GetServerSideProps<IPostPageProps> = async (
  context: any
) => {
  const getSSRProps = async (
    session: Session
  ): Promise<GetServerSidePropsResult<IPostPageProps>> => {
    const userPostRes = await getPost(
      session.accessToken as string,
      context.params.id as string
    );
    const transformedResponse =
      transformUserPostResponsetoIProtectedPageProps(userPostRes);

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

const transformUserPostResponsetoIProtectedPageProps = (
  response: AVKonnectApiResponse<IPostApiResponse>
): { data: IPostApiResponse | null; error: IPageError | null } => {
  if (!response.data) {
    const transformedError: IPageError = {
      errorCode: "unavailable",
    };
    return { data: null, error: transformedError };
  } else {
    const transformedData: IPostApiResponse = {
      id: response.data.id,
      contents: response.data.contents,
      sourceId: response.data.sourceId,
      sourceType: response.data.sourceType,
      activity: response.data.activity,
      sourceActivity: response.data.sourceActivity || undefined,
      createdAt: response.data.createdAt,
      updatedAt: response.data.updatedAt,
      relatedSources: response.data.relatedSources,
      hashtags: response.data.hashtags,
      visibleOnlyToConnections: response.data.visibleOnlyToConnections,
      commentsOnlyByConnections: response.data.commentsOnlyByConnections,
      isDeleted: response.data.isDeleted,
      isBanned: response.data.isBanned,
    };

    return { data: transformedData, error: null };
  }
};

export default PostPage;
