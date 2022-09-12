import { Grid } from "@mui/material";
import CommentReactions from "./CommentReactions";
import CommentReply from "./CommentReply";

interface ICommentActivitiesProps {
  onReplyClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const CommentActivities: React.FC<ICommentActivitiesProps> = ({
  onReplyClick,
}) => {
  return (
    <>
      <Grid container spacing={2}>
        <Grid item>
          <CommentReactions />
        </Grid>

        <Grid item>
          <CommentReply onReplyClick={onReplyClick} />
        </Grid>
      </Grid>
    </>
  );
};

export default CommentActivities;
