import { Box, Grid, Theme } from "@mui/material";
import { SystemStyleObject } from "@mui/system";
import { LABELS } from "../../../constants/labels";
import AddComment from "../CommentEditor/AddComment";
import PostComments from "../PostView/PostModal/PostComments";
import PostViewContent from "../PostView/PostViewContent";

const PostLayoutDesktop: React.FC = () => {
  return (
    <Grid container sx={postModalContainerSx}>
      <Grid item xs={12} sx={contentsContainerSx}>
        <PostViewContent />

        <Box sx={addCommentSx}>
          <AddComment submitButtonText={LABELS.POST_COMMENT} />
        </Box>

        <PostComments />
      </Grid>
    </Grid>
  );
};

const postModalContainerSx = (theme: Theme): SystemStyleObject<Theme> => ({
  height: "100%",
  paddingY: "4px",
});

const contentsContainerSx = (theme: Theme): SystemStyleObject<Theme> => ({
  overflowY: "auto",
  paddingX: 1.5,
  paddingBottom: 5,
});

const addCommentSx = (theme: Theme): SystemStyleObject<Theme> => ({
  paddingY: 1.5,
});

export default PostLayoutDesktop;
