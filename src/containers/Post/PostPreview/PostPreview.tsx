// NOTE: Feeds view: This is what should be displayed on feeds

import { Button, Hidden, Typography } from "@mui/material";
import { useState } from "react";
import { useAboutResourceContext } from "../../../contexts/AboutResourceContext";
import PostModal from "./PostModal";
import PostOverlay from "./PostOverlay";

interface IPostPreviewProps {}

const PostPreview: React.FC<IPostPreviewProps> = ({}) => {
  const { id } = useAboutResourceContext();

  const [showPostDetail, setShowPostDetail] = useState(false);

  const handlePostDetailOpen = () => {
    setShowPostDetail(true);
  };

  const handlePostDetailClose = () => {
    setShowPostDetail(false);
  };

  return (
    <>
      <Typography>postId: {id}</Typography>
      <Button variant="contained" onClick={handlePostDetailOpen}>
        <>
          <Hidden mdUp>Open post in Overlay</Hidden>

          <Hidden mdDown>Open post in modal</Hidden>
        </>
      </Button>

      <Hidden mdUp>
        <PostOverlay
          replyFocused
          showOverlay={showPostDetail}
          onOverlayClose={handlePostDetailClose}
        />
      </Hidden>

      <Hidden mdDown>
        <PostModal
          showModal={showPostDetail}
          onModalClose={handlePostDetailClose}
        />
      </Hidden>
    </>
  );
};

export default PostPreview;
