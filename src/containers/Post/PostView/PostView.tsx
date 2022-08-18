// NOTE: Feeds view: This is what should be displayed on feeds

import { Button, Hidden, Typography } from "@mui/material";
import { useState } from "react";
import { useAboutResourceContext } from "../../../contexts/AboutResourceContext";
import PostModal from "./PostModal";
import PostOverlay from "./PostOverlay";

interface IPostViewProps {
  showPost: boolean;
  onPostClose: () => void;
}

const PostView: React.FC<IPostViewProps> = ({ showPost, onPostClose }) => {
  return (
    <>
      <Hidden mdUp>
        <PostOverlay
          replyFocused
          showOverlay={showPost}
          onOverlayClose={onPostClose}
        />
      </Hidden>

      <Hidden mdDown>
        <PostModal showModal={showPost} onModalClose={onPostClose} />
      </Hidden>
    </>
  );
};

export default PostView;
