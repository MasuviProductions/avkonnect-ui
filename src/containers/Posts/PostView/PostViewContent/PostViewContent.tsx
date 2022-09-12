import { Grid } from "@mui/material";
import PostActivity from "../../PostCard/PostActivity";
import PostContent from "../../PostCard/PostContent";
import PostHeader from "../../PostCard/PostHeader";

const PostViewContent: React.FC = () => {
  return (
    <Grid container>
      <Grid item xs={12}>
        <PostHeader />
        <PostContent />
        <PostActivity />
      </Grid>
    </Grid>
  );
};

export default PostViewContent;
