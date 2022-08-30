import { Button, Grid, Typography } from "@mui/material";
import { REACTION_CONFIGS } from "../../../../../constants/app";
import { LABELS } from "../../../../../constants/labels";
import { useResourceContext } from "../../../../../contexts/ResourceContext";
import { IReactionTypes } from "../../../../../interfaces/api/external";
import { reactionTextSx, simpleLinkSx } from "../../../../../styles/sx";

interface ICommentReactionsProps {}

const CommentReactions: React.FC<ICommentReactionsProps> = () => {
  const resourceContext = useResourceContext();
  if (!resourceContext) {
    throw Error(LABELS.RESOURCE_CONTEXT_UNINITIALIZED);
  }

  const { userReaction, updateUserReaction, totalReactionsCount } =
    resourceContext;

  const handleReactionClick = (reaction: IReactionTypes) => () => {
    updateUserReaction(reaction);
  };

  return (
    <>
      <Grid container>
        <Grid item px={1}>
          <Typography
            paragraph
            onClick={handleReactionClick("like")}
            sx={reactionTextSx(userReaction)}
          >
            {REACTION_CONFIGS[userReaction || "like"].label}
          </Typography>
        </Grid>

        <Grid item>
          <Typography
            paragraph
            onClick={handleReactionClick("like")}
            sx={simpleLinkSx(10)}
          >
            {totalReactionsCount}
          </Typography>
        </Grid>
      </Grid>
    </>
  );
};

export default CommentReactions;
