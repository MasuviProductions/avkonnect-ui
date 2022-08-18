import { Button, Grid, Hidden, Typography } from "@mui/material";
import { LABELS } from "../../../../constants/labels";
import { useAboutResourceContext } from "../../../../contexts/AboutResourceContext";
import { reactionButtonSx } from "../../../../styles/sx";

interface ICommentReplyProps {
  onReplyClick: () => void;
  onViewReplies: () => void;
}

const CommentReply: React.FC<ICommentReplyProps> = ({
  onReplyClick,
  onViewReplies,
}) => {
  const { commentsCount } = useAboutResourceContext();

  return (
    <>
      <Grid container>
        <Grid item>
          <Button sx={reactionButtonSx()} onClick={onReplyClick}>
            {LABELS.REPLY}
          </Button>
        </Grid>

        <Grid>
          <Button sx={reactionButtonSx()} onClick={onViewReplies}>
            {`${commentsCount} Replies`}
          </Button>
        </Grid>
      </Grid>
    </>
  );
};

export default CommentReply;
