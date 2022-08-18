import { Button, Divider, Grid } from "@mui/material";
import { LABELS } from "../../../constants/labels";
import { useAboutResourceContext } from "../../../contexts/AboutResourceContext";
import { reactionButtonSx } from "../../../styles/sx";
import CommentReactions from "./CommentReactions";
import CommentReply from "./CommentReply";

interface ICommentActivitiesProps {
  onReplyClick: () => void;
  onViewReplies: () => void;
}

const CommentActivities: React.FC<ICommentActivitiesProps> = ({
  onReplyClick,
  onViewReplies,
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
            onReplyClick={onReplyClick}
            onViewReplies={onViewReplies}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default CommentActivities;
