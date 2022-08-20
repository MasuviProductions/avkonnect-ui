import { Avatar, Box, Grid, Hidden, Theme } from "@mui/material";
import { SystemStyleObject } from "@mui/system";
import { useResourceContext } from "../../../../contexts/ResourceContext";
import { usernameToColor } from "../../../../utils/generic";
import { userAvatarSx } from "../../../../styles/sx";
import CommentActivities from "./CommentActivities";
import CommentBox from "./CommentBox";
import AddComment from "./CommentActivities/AddComment";
import { useEffect, useState } from "react";
import CommentOverlay from "../CommentOverlay/CommentOverlay";
import SubCommentsSection from "../SubCommentsSection";

// Warning: Recursive component
export interface IComment {
  commentText: string;
  // Handheld specefic prop to enable Comment overlay
  enableCommentOverlay?: boolean;
  replyFocused?: boolean;
  onReplyChainEnd?: (tagUser: string) => void;
  // Desktop specific prop
  onSubCommentFieldBlur?: () => void;
}

const Comment: React.FC<IComment> = ({
  commentText,
  enableCommentOverlay = false,
  replyFocused = false,
  onReplyChainEnd,
  onSubCommentFieldBlur,
}) => {
  const {
    sourceInfo: { name, displayPictureUrl, id: sourceId },
    resourceType,
  } = useResourceContext();

  // NOTE: Tweak this for increasing reply chain
  const isEndOfCommentReplies = resourceType === "comment";

  const [openCommentOverlay, setOpenCommentOverlay] = useState(false);

  const [promptReply, setPromptReply] = useState<boolean>(replyFocused);

  const [isCommentFieldFocused, setIsCommentFieldFocused] =
    useState<boolean>(replyFocused);

  const [inputFeed, setInputFeed] = useState<string | undefined>();

  const handleCommentFieldBlur = () => {
    setIsCommentFieldFocused(false);
  };

  const handleCommentOverlayClose = () => {
    setPromptReply(false);
    setOpenCommentOverlay(false);
  };

  const handlePromptReply = () => {
    if (isEndOfCommentReplies) {
      onReplyChainEnd?.(sourceId);
      return;
    } else {
      setInputFeed("");
      setPromptReply(true);
      setIsCommentFieldFocused(true);
    }
  };

  const handleOnReplyChainEnd = (sourceId: string) => {
    setInputFeed(sourceId);
    setPromptReply(true);
    setIsCommentFieldFocused(true);
  };

  const handleViewRepliesInOverlay = (promptReply: boolean): void => {
    if (promptReply) {
      setPromptReply(true);
      setOpenCommentOverlay(true);

      if (isEndOfCommentReplies) {
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
      <Grid container spacing={1} sx={commentContainerSx}>
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
          </Grid>
        </Grid>
      </Grid>

      <Hidden mdDown>
        <Box ml={5}>
          {!isEndOfCommentReplies && (
            <SubCommentsSection
              initialCommentsFeed={[]}
              onReplyChainEnd={handleOnReplyChainEnd}
              onSubCommentFieldBlur={handleCommentFieldBlur}
            />
          )}
          {promptReply && (
            <Grid item xs={12}>
              <AddComment
                inputFeed={inputFeed}
                isFocused={isCommentFieldFocused}
                onCommentFieldBlur={
                  onSubCommentFieldBlur || handleCommentFieldBlur
                }
              />
            </Grid>
          )}
        </Box>
      </Hidden>

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

const commentContainerSx = (theme: Theme): SystemStyleObject<Theme> => ({
  padding: 1,
});

export default Comment;
