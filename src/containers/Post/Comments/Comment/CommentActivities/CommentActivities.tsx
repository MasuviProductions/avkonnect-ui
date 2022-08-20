import { Divider, Grid } from "@mui/material";
import CommentReactions from "./CommentReactions";
import CommentReply from "./CommentReply";

interface ICommentActivitiesProps {
  onViewRepliesInOverlay: (promptReply: boolean) => void;
  onPromptReply: () => void;
}

const CommentActivities: React.FC<ICommentActivitiesProps> = ({
  onViewRepliesInOverlay,
  onPromptReply,
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
          <CommentReply
            onViewRepliesInOverlay={onViewRepliesInOverlay}
            onPromptReply={onPromptReply}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default CommentActivities;
