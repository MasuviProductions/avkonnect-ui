import { Box, Theme } from "@mui/material";
import { SystemStyleObject } from "@mui/system";
import { useState, useEffect } from "react";
import ViewOverlay, {
  IOverlay,
} from "../../../components/ViewOverlay/ViewOverlay";
import API_ENDPOINTS from "../../../constants/api";
import AboutResourceProvider, {
  useAboutResourceContext,
} from "../../../contexts/AboutResourceContext";
import { useAuthContext } from "../../../contexts/AuthContext";
import { getCommentsComments } from "../../../utils/api";
import Comment, { IComment } from "../Comment";
import { useComments } from "../../../hooks/useComments";
import AddComment from "../CommentActivities/AddComment";

interface CommentOverlay extends IOverlay, IComment {}

// Warning: Handheld specific component
const CommentOverlay: React.FC<CommentOverlay> = ({
  commentText,
  showOverlay,
  onOverlayClose,
  replyFocused = false,
}) => {
  const { accessToken } = useAuthContext();
  const { id } = useAboutResourceContext();

  const [promptReply, setPromptReply] = useState<boolean>(replyFocused);

  const [commentInputFeed, setCommentInputfeed] = useState<string>("");

  const {
    uptoDateComments,
    relatedSourcesMap,
    resetQueryData,
    infiniteLoadRef,
    triggerGetCommentsApi,
    getCommentsStatus,
  } = useComments(
    `GET:${API_ENDPOINTS.GET_COMMENTS_COMMENTS.key}-${id}`,
    (nextSearchKey) => () =>
      getCommentsComments(accessToken as string, id, 5, nextSearchKey),
    { cacheTime: 0, enabled: false },
    true
  );

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
                <AboutResourceProvider
                  id={comment.id}
                  type="comment"
                  sourceId={comment.sourceId}
                  sourceType={comment.sourceType}
                  resourceId={comment.resourceId}
                  resourceType={comment.resourceType}
                  reactionsCount={comment.activity.reactionsCount}
                  commentsCount={comment.activity.commentsCount}
                  relatedSourceMap={relatedSourcesMap}
                  createdAt={comment.createdAt}
                  userReaction={comment.sourceActivity?.reaction}
                  key={`comment-${comment.id}`}
                >
                  <Comment
                    commentText={comment.contents[0].text}
                    onReplyChainEnd={handleOnReplyChainEnd}
                  />
                </AboutResourceProvider>
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
