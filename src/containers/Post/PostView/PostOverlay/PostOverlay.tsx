import { Box, Theme } from "@mui/material";
import { SystemStyleObject } from "@mui/system";
import { useEffect } from "react";
import ViewOverlay from "../../../../components/ViewOverlay";
import { IOverlay } from "../../../../components/ViewOverlay/ViewOverlay";
import API_ENDPOINTS from "../../../../constants/api";
import AboutResourceProvider, {
  useAboutResourceContext,
} from "../../../../contexts/AboutResourceContext";
import { useAuthContext } from "../../../../contexts/AuthContext";
import { useComments } from "../../../../hooks/useComments";
import { getPostComments } from "../../../../utils/api";
import Comment from "../../../Comment";
import AddComment from "../../../Comment/CommentActivities/AddComment";

interface IPostOverlayProps extends IOverlay {
  replyFocused?: boolean;
}

// Warning: Handheld specific component
const PostOverlay: React.FC<IPostOverlayProps> = ({
  replyFocused = false,
  showOverlay,
  onOverlayClose,
}) => {
  const { accessToken } = useAuthContext();
  const { id } = useAboutResourceContext();

  const {
    uptoDateComments,
    relatedSourcesMap,
    resetQueryData,
    infiniteLoadRef,
    triggerGetCommentsApi,
    getCommentsStatus,
  } = useComments(
    `GET:${API_ENDPOINTS.GET_POST_COMMENTS.key}-${id}`,
    (nextSearchKey) => () =>
      getPostComments(accessToken as string, id, 5, nextSearchKey),
    { cacheTime: 0, refetchInterval: false, enabled: false },
    true
  );

  useEffect(() => {
    if (showOverlay) {
      triggerGetCommentsApi();
    }
  }, [triggerGetCommentsApi, showOverlay]);

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
      <ViewOverlay showOverlay={showOverlay} onOverlayClose={onOverlayClose}>
        <Box sx={postOverlayContainerSx}>
          <Box sx={contentsContainerSx}>
            {/* TODO */}
            <Box
              sx={{ width: "100%", height: "25vh", border: "3px solid red" }}
            >
              Post to be inserted here
            </Box>

            {uptoDateComments.map((comment, index) => (
              <Box
                key={comment.id}
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
                >
                  <Comment
                    commentText={comment.contents[0].text}
                    enableCommentOverlay
                  />
                </AboutResourceProvider>
              </Box>
            ))}
          </Box>

          <Box sx={addCommentSx}>
            <AddComment isFocused={replyFocused} />
          </Box>
        </Box>
      </ViewOverlay>
    </>
  );
};

const postOverlayContainerSx = (theme: Theme): SystemStyleObject<Theme> => ({
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

export default PostOverlay;
