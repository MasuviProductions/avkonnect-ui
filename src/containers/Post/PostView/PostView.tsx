// NOTE: Feeds view: This is what should be displayed on feeds

import { Hidden } from "@mui/material";
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
