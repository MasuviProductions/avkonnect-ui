import { Box, Theme } from "@mui/material";
import { SystemStyleObject } from "@mui/system";
import { useState, useEffect, useMemo } from "react";
import ViewOverlay, {
  IOverlay,
} from "../../../../components/ViewOverlay/ViewOverlay";
import ResourceProvider, {
  useResourceContext,
} from "../../../../contexts/ResourceContext";
import Comment, { IComment } from "../Comment/Comment";
import { IUseComments } from "../../../../hooks/useComments";
import AddComment from "../Comment/CommentActivities/AddComment";

interface CommentOverlay extends IOverlay, IComment {}

// Warning: Handheld specific component
const CommentOverlay: React.FC<CommentOverlay> = ({
  commentText,
  showOverlay,
  onOverlayClose,
  replyFocused = false,
}) => {
  const { commentsQuery, allCommentsFetched } = useResourceContext();

  const [promptReply, setPromptReply] = useState<boolean>(replyFocused);

  const [commentInputFeed, setCommentInputfeed] = useState<string>("");

  const {
    uptoDateComments,
    relatedSourcesMap,
    resetQueryData,
    triggerGetCommentsApi,
    getCommentsStatus,
    infiniteLoadRef,
  } = commentsQuery as IUseComments;

  const handleOnReplyChainEnd = (tagUser: string) => {
    setPromptReply(true);
    setCommentInputfeed(tagUser);
  };

  const handleCommentFieldBlur = () => {
    setPromptReply(false);
  };

  const handleCloseOverlay = () => {
    setCommentInputfeed("");
    setPromptReply(false);
    onOverlayClose?.();
  };

  useEffect(() => {
    setPromptReply(replyFocused);
  }, [replyFocused]);

  useEffect(() => {
    setCommentInputfeed("");
  }, [replyFocused]);

  useEffect(() => {
    if (showOverlay) {
      triggerGetCommentsApi();
    }
  }, [showOverlay, triggerGetCommentsApi]);

  useEffect(() => {
    if (!showOverlay) {
      resetQueryData();
    }
  }, [resetQueryData, showOverlay]);

  if (getCommentsStatus === "loading") {
    return <></>;
  }

  return (
    <>
      <ViewOverlay
        showOverlay={showOverlay}
        onOverlayClose={handleCloseOverlay}
      >
        <Box sx={commentOverlayContainerSx}>
          <Box sx={contentsContainerSx}>
            <Comment
              commentText={commentText}
              replyFocused={promptReply}
              onReplyChainEnd={handleOnReplyChainEnd}
            />
            {uptoDateComments.map((comment, index) => (
              <Box
                key={comment.id}
                ml={5}
                ref={
                  index === uptoDateComments.length - 1
                    ? infiniteLoadRef
                    : undefined
                }
              >
                <ResourceProvider
                  id={comment.id}
                  type="comment"
                  sourceId={comment.sourceId}
                  sourceType={comment.sourceType}
                  resourceId={comment.resourceId}
                  resourceType={comment.resourceType}
                  reactionsCount={comment.activity.reactionsCount}
                  commentsCount={comment.activity.commentsCount}
                  loadedComments={[]}
                  relatedSourceMap={relatedSourcesMap}
                  createdAt={comment.createdAt}
                  userReaction={comment.sourceActivity?.reaction}
                  key={`comment-${comment.id}`}
                >
                  <Comment
                    commentText={comment.contents[0].text}
                    onReplyChainEnd={handleOnReplyChainEnd}
                  />
                </ResourceProvider>
              </Box>
            ))}
          </Box>
          <Box sx={addCommentSx}>
            <AddComment
              isFocused={promptReply}
              inputFeed={commentInputFeed}
              onCommentFieldBlur={handleCommentFieldBlur}
            />
          </Box>
        </Box>
      </ViewOverlay>
    </>
  );
};

const commentOverlayContainerSx = (theme: Theme): SystemStyleObject<Theme> => ({
  height: "100%",
  overflowY: "hidden",
});

const contentsContainerSx = (theme: Theme): SystemStyleObject<Theme> => ({
  height: "calc(100% - 100px - 16px)",
  overflowY: "auto",
  padding: 1.5,
  paddingBottom: 5,
});

const addCommentSx = (theme: Theme): SystemStyleObject<Theme> => ({
  paddingY: 1.5,
});

export default CommentOverlay;
