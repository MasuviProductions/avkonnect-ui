import { Box, SxProps, Theme, useTheme } from "@mui/material";
import PostView from "../PostView";
import { IFeedSourceApiModel } from "../../../interfaces/api/external";
import PostActivity from "./PostActivity";
import PostContent from "./PostContent";
import PostHeader from "./PostHeader";
import PostSource from "./PostSource";
import LayoutCard from "../../../components/LayoutCard";
import { useResourceContext } from "../../../contexts/ResourceContext";
import { LABELS } from "../../../constants/labels";
import EditPostEditor from "../PostEditor/EditPostEditor";
import { useState } from "react";

export interface IPostCardProps {
  feedSource?: IFeedSourceApiModel[];
}

const PostCard: React.FC<IPostCardProps> = ({ feedSource }) => {
  const theme = useTheme();

  const resourceContext = useResourceContext();
  if (!resourceContext) {
    throw Error(LABELS.RESOURCE_CONTEXT_UNINITIALIZED);
  }

  const { isBeingEdited, updateIsBeingEdited } = resourceContext;

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
          {feedSource && <PostSource feedSource={feedSource} />}
          <PostHeader />
          <PostContent />
          <PostActivity onPostOpen={handlePostDetailOpen} />
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

export default PostCard;
