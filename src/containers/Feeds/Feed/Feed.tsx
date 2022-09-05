import { Box, SxProps, Theme, useTheme } from "@mui/material";
import PostView from "../../Posts/PostView";
import { IFeedSourceApiModel } from "../../../interfaces/api/external";
import FeedActivity from "./FeedActivity";
import FeedContent from "./FeedContent";
import FeedHeader from "./FeedHeader";
import FeedSource from "./FeedSource";
import LayoutCard from "../../../components/LayoutCard";
import { useResourceContext } from "../../../contexts/ResourceContext";
import { LABELS } from "../../../constants/labels";
import EditPostEditor from "../../Posts/PostEditor/EditPostEditor";
import { useState } from "react";

export interface IFeedProps {
  feedSource: IFeedSourceApiModel[];
}

const Feed: React.FC<IFeedProps> = ({ feedSource }) => {
  const theme = useTheme();

  const resourceContext = useResourceContext();
  if (!resourceContext) {
    throw Error(LABELS.RESOURCE_CONTEXT_UNINITIALIZED);
  }

  const { isBeingEdited, updateIsBeingEdited, content } = resourceContext;

  const [showPostDetail, setShowPostDetail] = useState(false);

  const handlePostDetailOpen = () => {
    setShowPostDetail(true);
  };

  const handlePostDetailClose = () => {
    setShowPostDetail(false);
  };

  const handlePostEditClose = () => {
    if (isBeingEdited) {
      updateIsBeingEdited(false);
    }
  };

  return (
    <>
      <LayoutCard withBorder={theme.key === "light"}>
        <Box sx={feedSx}>
          <FeedSource feedSource={feedSource} />
          <FeedHeader />
          <FeedContent />
          <FeedActivity onPostOpen={handlePostDetailOpen} />
          <PostView
            showPost={showPostDetail}
            onPostClose={handlePostDetailClose}
          />
        </Box>
      </LayoutCard>

      <EditPostEditor
        showPostEditor={isBeingEdited}
        onPostEditorClose={handlePostEditClose}
      />
    </>
  );
};

const feedSx: SxProps<Theme> = (theme: Theme) => ({
  padding: 1,
  [theme.breakpoints.down("sm")]: {
    padding: 1.5,
  },
});

export default Feed;
