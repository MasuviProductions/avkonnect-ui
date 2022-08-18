import { Avatar, Grid, Hidden } from "@mui/material";
import { useAboutResourceContext } from "../../contexts/AboutResourceContext";
import { usernameToColor } from "../../utils/generic";
import { userAvatarSx } from "../../styles/sx";
import CommentActivities from "./CommentActivities";
import CommentBox from "./CommentBox";
import AddComment from "./CommentActivities/AddComment";
import { useState } from "react";
import CommentOverlay from "./CommentOverlay/CommentOverlay";

// Warning: Recursive component
export interface IComment {
  commentText: string;
  // Handheld specefic prop to enable Comment overlay
  enableCommentOverlay?: boolean;
  replyFocused?: boolean;
  onReplyChainEnd?: (tagUser: string) => void;
}

const Comment: React.FC<IComment> = ({
  commentText,
  enableCommentOverlay = false,
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

  const [inputFeed, setInputFeed] = useState<string | undefined>();

  const handleCommentOverlayClose = () => {
    setPromptReply(false);
    setOpenCommentOverlay(false);
  };

  const handlePromptReply = () => {
    setPromptReply(true);

    if (isEndOfReplyChain) {
      setInputFeed(sourceId);
      return;
    }
  };

  const handleViewRepliesInOverlay = (promptReply: boolean): void => {
    if (promptReply) {
      setPromptReply(true);
      setOpenCommentOverlay(true);

      if (isEndOfReplyChain) {
        onReplyChainEnd?.(sourceId);
        return;
      }

      if (!enableCommentOverlay) {
        onReplyChainEnd?.("");
      }
    } else {
      setOpenCommentOverlay(true);
    }
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
                onViewRepliesInOverlay={handleViewRepliesInOverlay}
                onPromptReply={handlePromptReply}
              />
            </Grid>

            <Hidden mdDown> </Hidden>

            <Hidden mdDown>
              {promptReply && (
                <Grid item xs={12}>
                  <AddComment inputFeed={inputFeed} />
                </Grid>
              )}
            </Hidden>
          </Grid>
        </Grid>
      </Grid>

      <Hidden mdUp>
        {enableCommentOverlay && (
          <CommentOverlay
            commentText={commentText}
            showOverlay={openCommentOverlay}
            onOverlayClose={handleCommentOverlayClose}
            replyFocused={promptReply}
          />
        )}
      </Hidden>
    </>
  );
};

export default Comment;
