import { Avatar, Grid, Hidden } from "@mui/material";
import { useAboutResourceContext } from "../../contexts/AboutResourceContext";
import { usernameToColor } from "../../utils/generic";
import { userAvatarSx } from "../../styles/sx";
import CommentActivities from "./CommentActivities";
import CommentBox from "./CommentBox";
import AddComment from "./CommentActivities/AddComment";
import { useEffect, useState } from "react";
import CommentOverlay from "./CommentOverlay/CommentOverlay";

export interface IComment {
  commentText: string;
  preventSubsequentOverlay?: boolean;
  replyFocused?: boolean;
  onReplyChainEnd?: (tagUser: string) => void;
}

const Comment: React.FC<IComment> = ({
  commentText,
  preventSubsequentOverlay = false,
  replyFocused = false,
  onReplyChainEnd,
}) => {
  const {
    id,
    sourceInfo: { name, displayPictureUrl, id: sourceId },
    resourceType,
  } = useAboutResourceContext();

  // NOTE: Tweak this for increasing reply chain
  const isEndOfReplyChain = resourceType === "comment";

  const [openCommentOverlay, setOpenCommentOverlay] = useState(false);

  const [promptReply, setPromptReply] = useState<boolean>(replyFocused);

  const handleCommentOverlayClose = () => {
    setPromptReply(false);
    setOpenCommentOverlay(false);
  };

  const handleReplyClick = () => {
    setPromptReply(true);
    setOpenCommentOverlay(true);

    if (isEndOfReplyChain) {
      onReplyChainEnd?.(sourceId);
      return;
    }

    if (preventSubsequentOverlay) {
      onReplyChainEnd?.("");
    }
  };

  const handleViewReplies = () => {
    setOpenCommentOverlay(true);
  };

  return (
    <>
      <Grid container spacing={1}>
        <Grid item my={1}>
          <Avatar
            alt={name}
            src={displayPictureUrl}
            sx={userAvatarSx(usernameToColor(name))}
          >
            {name[0]}
          </Avatar>
        </Grid>

        <Grid item xs>
          <Grid container>
            <Grid item xs={12}>
              <CommentBox commentText={commentText} />
            </Grid>

            <Grid item xs={12}>
              <CommentActivities
                onReplyClick={handleReplyClick}
                onViewReplies={handleViewReplies}
              />
            </Grid>

            <Hidden mdDown>
              <Grid item xs={12}>
                <AddComment isFocused={promptReply} />
              </Grid>
            </Hidden>
          </Grid>
        </Grid>
      </Grid>

      {!preventSubsequentOverlay && (
        <CommentOverlay
          commentText={commentText}
          showOverlay={openCommentOverlay}
          onOverlayClose={handleCommentOverlayClose}
          replyFocused={promptReply}
        />
      )}
    </>
  );
};

export default Comment;
