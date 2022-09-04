import { Box, SxProps, Theme, useTheme } from "@mui/material";
import { useState } from "react";
import PostView from "../../Posts/PostView";
import {
  IFeedSourceApiModel,
  IPostContentApiModel,
} from "../../../interfaces/api/external";
import FeedActivity from "./FeedActivity";
import FeedContent from "./FeedContent";
import FeedHeader from "./FeedHeader";
import FeedSource from "./FeedSource";
import LayoutCard from "../../../components/LayoutCard";

export interface IFeedProps {
  feedContent: IPostContentApiModel[];
  feedSource: IFeedSourceApiModel[];
}

const Feed: React.FC<IFeedProps> = ({ feedContent, feedSource }) => {
  const theme = useTheme();
  const [showPostDetail, setShowPostDetail] = useState(false);

  const handlePostDetailOpen = () => {
    setShowPostDetail(true);
  };

  const handlePostDetailClose = () => {
    setShowPostDetail(false);
  };

  return (
    <LayoutCard withBorder={theme.key === "light"}>
      <Box sx={feedSx}>
        <FeedSource feedSource={feedSource} />
        <FeedHeader />
        <FeedContent feedContent={feedContent} />
        <FeedActivity onPostOpen={handlePostDetailOpen} />
        <PostView
          showPost={showPostDetail}
          onPostClose={handlePostDetailClose}
        />
      </Box>
    </LayoutCard>
  );
};

const feedSx: SxProps<Theme> = (theme: Theme) => ({
  padding: 1,
  [theme.breakpoints.down("sm")]: {
    padding: 1.5,
  },
});

export default Feed;
