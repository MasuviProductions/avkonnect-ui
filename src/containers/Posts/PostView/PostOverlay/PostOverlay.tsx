import { Box, Grid, Theme } from "@mui/material";
import { SystemStyleObject } from "@mui/system";
import { useEffect } from "react";
import ViewOverlay from "../../../../components/ViewOverlay";
import { IOverlay } from "../../../../components/ViewOverlay/ViewOverlay";
import { LABELS } from "../../../../constants/labels";
import { useResourceContext } from "../../../../contexts/ResourceContext";
import { IUseComments } from "../../../../hooks/useComments";
import CommentEditor from "../../CommentEditor";
import PostComments from "./PostComments";

interface IPostOverlayProps extends IOverlay {}

// Warning: Handheld specific component
const PostOverlay: React.FC<IPostOverlayProps> = ({
  showOverlay,
  onOverlayClose,
}) => {
  const resourceContext = useResourceContext();
  if (!resourceContext) {
    throw Error(LABELS.RESOURCE_CONTEXT_UNINITIALIZED);
  }

  const { commentsQuery, totalCommentsCount, allCommentsFetched } =
    resourceContext;

  const { resetQueryData, triggerGetCommentsApi, getCommentsStatus } =
    commentsQuery as IUseComments;

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
              {totalCommentsCount}
            </Box>

            <PostComments />
          </Grid>

          <Grid item xs={12} sx={addCommentSx}>
            <CommentEditor submitButtonText={LABELS.POST_COMMENT} />
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
