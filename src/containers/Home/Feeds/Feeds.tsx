import { Box, Container, Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import SinglePost from "../../../components/SinglePost";
import API_ENDPOINTS from "../../../constants/api";
import { LABELS } from "../../../constants/labels";
import { useAuthContext } from "../../../contexts/AuthContext";
import { useSnackbarContext } from "../../../contexts/SnackbarContext";
import { IGetUserFeedsApiResponse } from "../../../interfaces/api/external";
import { ReactFCWithSkeleton } from "../../../interfaces/app";
import { getUserFeeds } from "../../../utils/api";
import FeedsSkeleton from "./FeedsSkeleton";

const Feeds: ReactFCWithSkeleton = () => {
  const [userFeeds, setUserFeeds] = useState<IGetUserFeedsApiResponse>();

  const { authUser, accessToken } = useAuthContext();
  const { setSnackbar } = useSnackbarContext();

  const {
    data: getUserFeedsData,
    error: getUserFeedsError,
    status: getUserFeedsStatus,
    refetch: triggerGetUserFeedsApi,
  } = useQuery(
    `GET-${API_ENDPOINTS.GET_USER_FEEDS.key}:${authUser?.id}`,
    () => getUserFeeds(accessToken as string, authUser?.id as string),
    { enabled: false }
  );

  useEffect(() => {
    if (authUser?.id) {
      triggerGetUserFeedsApi();
    }
  }, [authUser?.id, triggerGetUserFeedsApi]);

  useEffect(() => {
    if (getUserFeedsData) {
      setUserFeeds(getUserFeedsData.data);
    }
  }, [getUserFeedsData]);

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
    <Container maxWidth="sm">
      <Typography>
        <Grid container>
          {userFeeds?.feeds?.map(feedPost => (
            <Grid item key={feedPost.postId} xs={12}>
              <SinglePost
                postInfo={feedPost}
                relatedSourceInfo={userFeeds?.relatedSources}
              />
            </Grid>
          ))}
        </Grid>
      </Typography>
    </Container>
  );
};
Feeds.Skeleton = FeedsSkeleton;

export default Feeds;
