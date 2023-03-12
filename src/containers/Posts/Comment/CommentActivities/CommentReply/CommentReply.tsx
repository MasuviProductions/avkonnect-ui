import { Grid, Hidden, Theme, Typography } from "@mui/material";
import { SystemStyleObject } from "@mui/system";
import { LABELS } from "../../../../../constants/labels";
import { useResourceContext } from "../../../../../contexts/ResourceContext";
import { reactionTextSx } from "../../../../../styles/sx";

interface ICommentReplyProps {
  onReplyClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const CommentReply: React.FC<ICommentReplyProps> = ({ onReplyClick }) => {
  const resourceContext = useResourceContext();
  if (!resourceContext) {
    throw Error(LABELS.RESOURCE_CONTEXT_UNINITIALIZED);
  }

  const { commentsCount, resourceType } = resourceContext;

  const showRepliesCount = resourceType !== "comment";

  return (
    <>
      <Grid container spacing={1}>
        <Grid item>
          <Typography paragraph onClick={onReplyClick} sx={reactionTextSx()}>
            {LABELS.REPLY}
          </Typography>
        </Grid>

        {showRepliesCount && commentsCount.comment > 0 && (
          <Grid item>
            <Hidden mdUp>
              <Typography
                paragraph
                onClick={onReplyClick}
                sx={reactionTextSx()}
              >
                {LABELS.REPLY_COUNT(commentsCount.comment)}
              </Typography>
            </Hidden>

            <Hidden mdDown>
              <Typography paragraph sx={replyCountMutedSx}>
                {LABELS.REPLY_COUNT(commentsCount.comment)}
              </Typography>
            </Hidden>
          </Grid>
        )}
      </Grid>
    </>
  );
};

const replyCountMutedSx = (theme: Theme): SystemStyleObject<Theme> => ({
  ...reactionTextSx()(theme),
  cursor: "text",
  fontWeight: "normal",
  color: theme.palette.text.secondary,
});

export default CommentReply;
