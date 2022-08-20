import { Button, Typography, Hidden, Box } from "@mui/material";
import { useState } from "react";
import PostView from "../Post/PostView";
import ResourceProvider from "../../contexts/ResourceContext";
import API_ENDPOINTS from "../../constants/api";
import { useAuthContext } from "../../contexts/AuthContext";
import { getPost } from "../../utils/api";
import { useQuery } from "react-query";
import { transformUsersListToUserIdUserMap } from "../../utils/transformers";
import { IRelatedSource } from "../../interfaces/api/external";

const TestContainer: React.FC = () => {
  const { accessToken } = useAuthContext();
  const [showPostDetail, setShowPostDetail] = useState(false);

  const { data: postResData } = useQuery(
    API_ENDPOINTS.GET_POST.key,
    () =>
      getPost(accessToken as string, "507651e6-9037-4450-b20e-6cf67da9f412"),
    {
      enabled: !!accessToken,
      refetchInterval: false,
      refetchOnWindowFocus: false,
      cacheTime: 0,
    }
  );

  const handlePostDetailOpen = () => {
    setShowPostDetail(true);
  };

  const handlePostDetailClose = () => {
    setShowPostDetail(false);
  };

  if (!postResData?.data) {
    return <>Loading...</>;
  }

  // NOTE: Your Feed component should look something like this
  return (
    <>
      <Box
        sx={{
          border: "3px solid orange",
          minHeight: "20vh",
          maxWidth: "500px",
          backgroundColor: "background.paper",
        }}
      >
        <Box p={2}>
          <Typography variant="h5">Feed Item 1</Typography>
        </Box>

        <Box p={2}>
          <Typography variant="body1">
            Post Id: {postResData.data.id}
          </Typography>
        </Box>

        <Box p={2}>
          <Button variant="contained" onClick={handlePostDetailOpen}>
            <>
              <Hidden mdUp>Open post in Overlay</Hidden>

              <Hidden mdDown>Open post in Modal</Hidden>
            </>
          </Button>
        </Box>

        <Box p={2}>
          <Typography variant="body2">
            Resize screen to switch between Modal and Overlay. This is
            controlled in the ~PostView~ Component
          </Typography>
        </Box>

        <ResourceProvider
          id={postResData.data.id}
          type="post"
          sourceId={postResData.data.sourceId}
          sourceType={postResData.data.sourceType}
          reactionsCount={postResData.data.activity.reactionsCount}
          loadedComments={[]}
          commentsCount={postResData.data.activity.commentsCount}
          userReaction={postResData.data.sourceActivity?.reaction}
          createdAt={postResData.data.createdAt}
          relatedSourceMap={
            transformUsersListToUserIdUserMap(
              postResData.data.relatedSources
            ) as Record<string, IRelatedSource>
          }
        >
          <PostView
            showPost={showPostDetail}
            onPostClose={handlePostDetailClose}
          />
        </ResourceProvider>
      </Box>
    </>
  );
};

export default TestContainer;
