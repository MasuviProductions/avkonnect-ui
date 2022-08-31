import { useQuery } from "react-query";
import API_ENDPOINTS from "../../constants/api";
import { useAuthContext } from "../../contexts/AuthContext";
import ResourceProvider from "../../contexts/ResourceContext";
import {
  IRelatedSource,
  IUserProfileApiModel,
} from "../../interfaces/api/external";
import { getUserFeeds } from "../../utils/api";
import { transformUsersListToUserIdUserMap } from "../../utils/transformers";
import Feed from "./Feed/Feed";

const Feeds: React.FC = () => {
  const { accessToken, authUser } = useAuthContext();
  const { data: getFeedsRes } = useQuery(
    API_ENDPOINTS.GET_USER_FEEDS.key,
    () => getUserFeeds(accessToken as string, authUser?.id as string),
    { refetchInterval: false, refetchOnWindowFocus: false }
  );

  if (!getFeedsRes?.data) {
    return <>Loading Feeds..</>;
  }

  return (
    <>
      {getFeedsRes.data.feeds.map((feed) => (
        <ResourceProvider
          key={feed.feedId}
          id={feed.postId}
          type="post"
          sourceId={feed.sourceId}
          sourceType={feed.sourceType}
          reactionsCount={feed.activity.reactionsCount}
          loadedComments={[]}
          commentsCount={feed.activity.commentsCount}
          userReaction={feed.sourceActivity?.reaction}
          createdAt={feed.createdAt}
          relatedSourceMap={
            transformUsersListToUserIdUserMap(
              getFeedsRes.data?.relatedSources as Array<
                Partial<IUserProfileApiModel>
              >
            ) as Record<string, IRelatedSource>
          }
        >
          <Feed />
        </ResourceProvider>
      ))}
    </>
  );
};

export default Feeds;
