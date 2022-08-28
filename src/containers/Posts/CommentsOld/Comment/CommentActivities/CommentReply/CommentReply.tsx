import { Button, Grid, Hidden, Typography } from "@mui/material";
import { LABELS } from "../../../../../../constants/labels";
import { useResourceContext } from "../../../../../../contexts/ResourceContext";
import { reactionButtonSx } from "../../../../../../styles/sx";

interface ICommentReplyProps {
  onViewRepliesInOverlay: (promptReply: boolean) => void;
  onPromptReply: () => void;
}

const CommentReply: React.FC<ICommentReplyProps> = ({
  onViewRepliesInOverlay,
  onPromptReply,
}) => {
  const { commentsCount, resourceType } = useResourceContext();

  const showRepliesCount = resourceType !== "comment";

  const handleViewRepliesInOverlay = (prmptRply: boolean) => {
    return () => onViewRepliesInOverlay(prmptRply);
  };

  return (
    <>
      {/* NOTE: Handheld view */}
      <Hidden mdUp>
        <Grid container>
          <Grid item>
            <Button
              sx={reactionButtonSx()}
              onClick={handleViewRepliesInOverlay(true)}
            >
              {LABELS.REPLY}
            </Button>
          </Grid>

          {showRepliesCount && (
            <Grid item>
              <Button
                sx={reactionButtonSx()}
                onClick={handleViewRepliesInOverlay(false)}
              >
                {`${commentsCount} Replies`}
              </Button>
            </Grid>
          )}
        </Grid>
      </Hidden>

      {/* NOTE: Desktop view */}
      <Hidden mdDown>
        <Grid container>
          <Grid item>
            <Button sx={reactionButtonSx()} onClick={onPromptReply}>
              {LABELS.REPLY}
            </Button>
          </Grid>

          {showRepliesCount && (
            <Grid item>
              <Button sx={reactionButtonSx()}>
                {`${commentsCount} Replies`}
              </Button>
            </Grid>
          )}
        </Grid>
      </Hidden>
    </>
  );
};

export default CommentReply;
