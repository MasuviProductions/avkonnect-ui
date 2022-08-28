import { Box, Grid, Theme } from "@mui/material";
import { SystemStyleObject } from "@mui/system";
import { useEffect } from "react";
import ViewOverlay from "../../../../components/ViewOverlay";
import { IOverlay } from "../../../../components/ViewOverlay/ViewOverlay";
import ResourceProvider, {
  useResourceContext,
} from "../../../../contexts/ResourceContext";
import { useAuthContext } from "../../../../contexts/AuthContext";
import { IUseComments } from "../../../../hooks/useComments";
import Comment from "../../Comments/Comment";
import AddComment from "../../Comments/Comment/CommentActivities/AddComment";

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
  const { commentsQuery, commentsCount, allCommentsFetched } =
    useResourceContext();

  const {
    uptoDateComments,
    relatedSourcesMap,
    resetQueryData,
    triggerGetCommentsApi,
    getCommentsStatus,
    infiniteLoadRef,
  } = commentsQuery as IUseComments;

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
        <Grid container sx={postOverlayContainerSx}>
          <Grid item xs={12} sx={contentsContainerSx}>
            {/* TODO */}
            <Box
              sx={{ width: "100%", height: "25vh", border: "3px solid red" }}
            >
              Number of comments for post:
              {commentsCount}
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
                >
                  <Comment
                    commentText={comment.contents[0].text}
                    enableCommentOverlay
                  />
                </ResourceProvider>
              </Box>
            ))}
          </Grid>

          <Grid item xs={12} sx={addCommentSx}>
            <AddComment isFocused={replyFocused} />
          </Grid>
        </Grid>
      </ViewOverlay>
    </>
  );
};

const postOverlayContainerSx = (theme: Theme): SystemStyleObject<Theme> => ({
  height: "100%",
  overflowY: "hidden",
});

const contentsContainerSx = (theme: Theme): SystemStyleObject<Theme> => ({
  overflowY: "auto",
  height: "calc(100% - 80px)",
  padding: 1.5,
  paddingBottom: 5,
});

const addCommentSx = (theme: Theme): SystemStyleObject<Theme> => ({});

export default PostOverlay;
