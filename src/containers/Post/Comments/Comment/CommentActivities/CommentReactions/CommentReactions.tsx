import { Button, Grid } from "@mui/material";
import { REACTION_CONFIGS } from "../../../../../../constants/app";
import { useResourceContext } from "../../../../../../contexts/ResourceContext";
import { IReactionTypes } from "../../../../../../interfaces/api/external";
import { reactionButtonSx } from "../../../../../../styles/sx";

interface ICommentReactionsProps {}

const CommentReactions: React.FC<ICommentReactionsProps> = () => {
  const {
    userReaction,
    updateUserReaction,
    reactionsCount,
    totalReactionsCount,
  } = useResourceContext();

  const handleReactionClick = (reaction: IReactionTypes) => {
    updateUserReaction(reaction);
  };

  return (
    <>
      <Grid container>
        <Grid item>
          <Button
            size="small"
            sx={reactionButtonSx(userReaction)}
            onClick={() => handleReactionClick("like")}
          >
            {REACTION_CONFIGS[userReaction || "like"].label}
          </Button>
        </Grid>

        <Grid>
          <Button size="small" sx={reactionButtonSx(userReaction)}>
            {totalReactionsCount}
          </Button>
        </Grid>
      </Grid>
    </>
  );
};

export default CommentReactions;
