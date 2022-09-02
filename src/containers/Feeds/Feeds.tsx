import { Grid, SxProps, Theme } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { useQuery } from "react-query";
import API_ENDPOINTS from "../../constants/api";
import { FEEDS_PAGINATION_LIMIT } from "../../constants/app";
import { LABELS } from "../../constants/labels";
import { useAuthContext } from "../../contexts/AuthContext";
import ResourceProvider from "../../contexts/ResourceContext";
import { useSnackbarContext } from "../../contexts/SnackbarContext";
import useInfiniteLoading from "../../hooks/useInfiniteLoading";
import {
  IRelatedSource,
  IUserFeedApiModel,
} from "../../interfaces/api/external";
import { getUserFeeds } from "../../utils/api";
import { transformUsersListToUserIdUserMap } from "../../utils/transformers";
import Feed from "./Feed/Feed";
import FeedsSkeleton from "./FeedsSkeleton";

const Feeds: React.FC = () => {
  const { accessToken, authUser } = useAuthContext();
  const { setSnackbar } = useSnackbarContext();

  const [upToDateUserFeeds, setUpToDateUserFeeds] = useState<
    IUserFeedApiModel[]
  >([]);
  const [relatedSourcesMap, setRelatedSourcesMap] = useState<
    Record<string, IRelatedSource>
  >({});
  const [nextFeedsSearchKey, setNextFeedsSearchKey] =
    useState<Record<string, unknown>>();

  const {
    data: getUserFeedsData,
    error: getUserFeedsError,
    status: getUserFeedsStatus,
    refetch: triggerGetUserFeedsApi,
    isFetching: getUserFeedsFetching,
  } = useQuery(
    `GET-${API_ENDPOINTS.GET_USER_FEEDS.key}:${authUser?.id}`,
    () =>
      getUserFeeds(
        accessToken as string,
        authUser?.id as string,
        FEEDS_PAGINATION_LIMIT,
        nextFeedsSearchKey
          ? encodeURI(JSON.stringify(nextFeedsSearchKey))
          : undefined
      ),
    { enabled: false }
  );

  const mergeFeeds = useCallback((newFeeds: IUserFeedApiModel[]) => {
    setUpToDateUserFeeds(prev => [
      ...prev,
      ...(newFeeds as IUserFeedApiModel[]),
    ]);
  }, []);

  const handleUpdateResourceMap = useCallback(
    (relatedSources: IRelatedSource[]) => {
      setRelatedSourcesMap(prev => {
        const sourcesMap = transformUsersListToUserIdUserMap(
          relatedSources
        ) as Record<string, IRelatedSource>;
        const updatedRelatedSourcesMap = {
          ...prev,
          ...sourcesMap,
        };
        return updatedRelatedSourcesMap;
      });
    },
    []
  );

  const infiniteLoadCallback = useCallback(() => {
    if (upToDateUserFeeds.length > 0 && nextFeedsSearchKey) {
      if (authUser) {
        triggerGetUserFeedsApi();
      }
    }
  }, [
    authUser,
    nextFeedsSearchKey,
    triggerGetUserFeedsApi,
    upToDateUserFeeds.length,
  ]);

  const infiniteLoadRef = useInfiniteLoading(
    getUserFeedsFetching,
    infiniteLoadCallback
  );

  useEffect(() => {
    if (authUser?.id) {
      triggerGetUserFeedsApi();
    }
  }, [authUser?.id, triggerGetUserFeedsApi]);

  useEffect(() => {
    if (getUserFeedsData?.data) {
      mergeFeeds(getUserFeedsData?.data?.feeds);
      handleUpdateResourceMap(getUserFeedsData?.data?.relatedSources || []);
      setNextFeedsSearchKey(
        getUserFeedsData?.dDBPagination?.nextSearchStartFromKey
      );
    }
  }, [
    getUserFeedsData?.dDBPagination?.nextSearchStartFromKey,
    getUserFeedsData?.data,
    handleUpdateResourceMap,
    mergeFeeds,
  ]);

  useEffect(() => {
    if (getUserFeedsError) {
      setSnackbar?.(() => ({
        message: LABELS.FEED_LOAD_FAIL,
        messageType: "error",
      }));
    }
  }, [getUserFeedsError, setSnackbar]);

  if (getUserFeedsStatus === "loading") {
    return <FeedsSkeleton />;
  }

  return (
    <Grid container sx={feedContainerSx}>
      <Grid item xs={12} display="flex" justifyContent="center">
        <Grid container mt={1} maxWidth="sm">
          {upToDateUserFeeds?.map((feed, index) => (
            <Grid
              item
              xs={12}
              key={feed.feedId}
              ref={
                index === upToDateUserFeeds.length - 1
                  ? infiniteLoadRef
                  : undefined
              }
            >
              <ResourceProvider
                id={feed.postId}
                type="post"
                sourceId={feed.sourceId}
                sourceType={feed.sourceType}
                reactionsCount={feed.activity.reactionsCount}
                loadedComments={[]}
                commentsCount={feed.activity.commentsCount}
                userReaction={feed.sourceActivity?.reaction}
                createdAt={feed.createdAt}
                updatedAt={feed.updatedAt}
                relatedSourceMap={relatedSourcesMap}
              >
                <Feed
                  feedContent={feed?.contents}
                  feedSource={feed.feedSources}
                />
              </ResourceProvider>
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Grid>
  );
};

const feedContainerSx: SxProps<Theme> = (theme: Theme) => ({
  margin: "0px 16px",
  [theme.breakpoints.down("sm")]: {
    margin: "0px",
  },
});

export default Feeds;
