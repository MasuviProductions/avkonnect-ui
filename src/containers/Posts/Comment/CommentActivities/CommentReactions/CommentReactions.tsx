import { Grid, Typography } from "@mui/material";
import ReactionTooltip from "../../../../../components/ReactionTooltip";
import { REACTION_CONFIGS } from "../../../../../constants/app";
import { LABELS } from "../../../../../constants/labels";
import { useResourceContext } from "../../../../../contexts/ResourceContext";
import { IReactionTypes } from "../../../../../interfaces/api/external";
import { reactionTextSx } from "../../../../../styles/sx";

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
          <ReactionTooltip>
            <Typography
              paragraph
              onClick={handleReactionClick(userReaction || "like")}
              sx={reactionTextSx(userReaction)}
            >
              {REACTION_CONFIGS[userReaction || "like"].label}
            </Typography>
          </ReactionTooltip>
        </Grid>

        <Grid item>
          <Typography paragraph sx={reactionTextSx(userReaction, 10)}>
            {totalReactionsCount}
          </Typography>
        </Grid>
      </Grid>
    </>
  );
};

export default CommentReactions;
