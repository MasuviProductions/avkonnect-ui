import { Divider, Grid } from "@mui/material";
import CommentReactions from "./CommentReactions";
import CommentReply from "./CommentReply";

interface ICommentActivitiesProps {
  onReplyClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const CommentActivities: React.FC<ICommentActivitiesProps> = ({
  onReplyClick,
}) => {
  return (
    <>
      <Grid container>
        <Grid item>
          <CommentReactions />
        </Grid>

        <Grid item py={0.8}>
          {/* TODO: Add styling here */}
          <Divider sx={{ backgroundColor: "black" }} orientation="vertical" />
        </Grid>

        <Grid item>
          <CommentReply onReplyClick={onReplyClick} />
        </Grid>
      </Grid>
    </>
  );
};

export default CommentActivities;
