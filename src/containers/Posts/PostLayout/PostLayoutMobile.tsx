import { Grid, Theme } from "@mui/material";
import { SystemStyleObject } from "@mui/system";
import { LABELS } from "../../../constants/labels";
import AddComment from "../CommentEditor/AddComment";
import PostComments from "../PostView/PostOverlay/PostComments";
import PostViewContent from "../PostView/PostViewContent";

const PostLayoutMobile: React.FC = () => {
  return (
    <Grid container sx={postOverlayContainerSx}>
      <Grid item xs={12} sx={contentsContainerSx}>
        <PostViewContent />
        <PostComments />
      </Grid>

      <Grid item xs={12} sx={commentEditorSx}>
        <AddComment submitButtonText={LABELS.POST_COMMENT} />
      </Grid>
    </Grid>
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

export default PostLayoutMobile;
