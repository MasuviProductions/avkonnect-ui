import { Button, Grid } from "@mui/material";
import { LABELS } from "../../../../../constants/labels";
import { useResourceContext } from "../../../../../contexts/ResourceContext";
import { reactionButtonSx } from "../../../../../styles/sx";

interface ICommentReplyProps {
  onReplyClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const CommentReply: React.FC<ICommentReplyProps> = ({ onReplyClick }) => {
  const { commentsCount, resourceType } = useResourceContext();

  const showRepliesCount = resourceType !== "comment";

  return (
    <>
      <Grid container>
        <Grid item>
          <Button sx={reactionButtonSx()} onClick={onReplyClick}>
            {LABELS.REPLY}
          </Button>
        </Grid>

        {showRepliesCount && (
          <Grid item>
            <Button sx={reactionButtonSx()} onClick={onReplyClick}>
              {`${commentsCount} Replies`}
            </Button>
          </Grid>
        )}
      </Grid>
    </>
  );
};

export default CommentReply;
