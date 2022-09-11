import { Box, Grid, Theme } from "@mui/material";
import { SystemStyleObject } from "@mui/system";
import { useEffect } from "react";
import ViewOverlay from "../../../../components/ViewOverlay";
import { IOverlay } from "../../../../components/ViewOverlay/ViewOverlay";
import { LABELS } from "../../../../constants/labels";
import { useResourceContext } from "../../../../contexts/ResourceContext";
import { IUseCommentsForResourceReturn } from "../../../../hooks/useCommentsForResource";
import AddComment from "../../CommentEditor/AddComment";
import PostContent from "../PostContent";
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
    commentsQuery as IUseCommentsForResourceReturn;

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
            <PostContent />
            <PostComments />
          </Grid>

          <Grid item xs={12} sx={commentEditorSx}>
            <AddComment submitButtonText={LABELS.POST_COMMENT} />
          </Grid>
        </Grid>
      </ViewOverlay>
    </>
  );
};

const postOverlayContainerSx = (theme: Theme): SystemStyleObject<Theme> => ({});

const contentsContainerSx = (theme: Theme): SystemStyleObject<Theme> => ({
  overflowY: "auto",
  paddingX: 1.5,
  paddingBottom: 30,
});

const commentEditorSx = (theme: Theme): SystemStyleObject<Theme> => ({
  position: "fixed",
  width: "100%",
  bottom: 0,
  padding: 1,
  backgroundColor: theme.palette.background.paper,
});

export default PostOverlay;
