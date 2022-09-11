import { useState, useCallback } from "react";
import { Grid, Typography } from "@mui/material";
import ReactionTooltip from "../../../../../components/ReactionTooltip";
import { REACTION_CONFIGS } from "../../../../../constants/app";
import { LABELS } from "../../../../../constants/labels";
import { useResourceContext } from "../../../../../contexts/ResourceContext";
import { IReactionTypes } from "../../../../../interfaces/api/external";
import { reactionTextSx } from "../../../../../styles/sx";
import ReactionModal from "../../../../../components/ReactionModal";

interface ICommentReactionsProps {}

const CommentReactions: React.FC<ICommentReactionsProps> = () => {
  const resourceContext = useResourceContext();
  if (!resourceContext) {
    throw Error(LABELS.RESOURCE_CONTEXT_UNINITIALIZED);
  }

  const { userReaction, updateUserReaction, totalReactionsCount } =
    resourceContext;

  const [showReactionTooltip, setShowReactionTooltip] =
    useState<boolean>(false);

  const [showUserReactionsModal, setShowUserReactionsModal] =
    useState<boolean>(false);

  const handleReactionClick = (reaction: IReactionTypes) => () => {
    updateUserReaction(reaction);
  };

  const handleReactionsTooltipOpen = () => {
    setShowReactionTooltip(true);
  };

  const handleReactionsTooltipClose = () => {
    setShowReactionTooltip(false);
  };

  const handleUserReactionsModalOpen = () => {
    setShowUserReactionsModal(true);
  };

  const handleUserReactionsModalClose = useCallback(() => {
    setShowUserReactionsModal(false);
  }, []);

  return (
    <>
      <Grid container>
        <Grid item px={1}>
          <ReactionTooltip
            open={showReactionTooltip}
            handleOpen={handleReactionsTooltipOpen}
            handleClose={handleReactionsTooltipClose}
          >
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
          <Typography
            paragraph
            sx={reactionTextSx(userReaction, 10)}
            onClick={handleUserReactionsModalOpen}
          >
            {totalReactionsCount}
          </Typography>
          <ReactionModal
            showModal={showUserReactionsModal}
            onModalClose={handleUserReactionsModalClose}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default CommentReactions;
