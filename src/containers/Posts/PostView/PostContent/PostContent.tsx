import { Grid } from "@mui/material";
import FeedActivity from "../../../Feeds/Feed/FeedActivity";
import FeedContent from "../../../Feeds/Feed/FeedContent";
import FeedHeader from "../../../Feeds/Feed/FeedHeader";

const PostContent: React.FC = () => {
  return (
    <Grid container>
      <Grid item xs={12}>
        <FeedHeader />
        <FeedContent />
        <FeedActivity />
      </Grid>
    </Grid>
  );
};

export default PostContent;
