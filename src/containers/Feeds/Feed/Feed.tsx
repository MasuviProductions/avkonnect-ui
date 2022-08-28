import { Box, SxProps, Theme } from "@mui/material";
import { useState } from "react";
import PostView from "../../Post/PostView";
import {
  IFeedSourceApiModel,
  IPostResponseContentModel,
} from "../../../interfaces/api/external";
import FeedActivity from "./FeedActivity";
import FeedContent from "./FeedContent";
import FeedHeader from "./FeedHeader";
import FeedSource from "./FeedSource";

export interface IFeedProps {
  feedContent: IPostResponseContentModel[];
  feedSource: IFeedSourceApiModel[];
}

const Feed: React.FC<IFeedProps> = ({ feedContent, feedSource }) => {
  const [showPostDetail, setShowPostDetail] = useState(false);

  const handlePostDetailOpen = () => {
    setShowPostDetail(true);
  };

  const handlePostDetailClose = () => {
    setShowPostDetail(false);
  };

  return (
    <Box sx={postBoxSx}>
      <FeedSource feedSource={feedSource} />
      <FeedHeader />
      <FeedContent feedContent={feedContent} />
      <FeedActivity onPostOpen={handlePostDetailOpen} />
      <PostView showPost={showPostDetail} onPostClose={handlePostDetailClose} />
    </Box>
  );
};

const postBoxSx: SxProps<Theme> = (theme: Theme) => ({
  margin: "8px",
  padding: "8px",
  backgroundColor: theme.palette.background.paper,
  borderRadius: "6px",
});

export default Feed;
