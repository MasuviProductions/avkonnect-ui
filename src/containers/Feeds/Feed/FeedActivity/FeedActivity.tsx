import { useState, useCallback } from "react";
import { Box, Grid, Divider, Typography, SxProps, Theme } from "@mui/material";
import { SystemStyleObject } from "@mui/system";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import CommentIcon from "@mui/icons-material/Comment";
import ShareIcon from "@mui/icons-material/Share";
import ReactionIconClubber from "../../../../components/ReactionIconClubber";
import ReactionTooltip from "../../../../components/ReactionTooltip";
import { useResourceContext } from "../../../../contexts/ResourceContext";
import { LABELS } from "../../../../constants/labels";
import { IReactionTypes } from "../../../../interfaces/api/external";
import { REACTION_CONFIGS } from "../../../../constants/app";
import { fadedLinkSx } from "../../../../styles/sx";
import ReactionModal from "../../../../components/ReactionModal";

interface IFeedActivityProps {
  onPostOpen: () => void;
}

const FeedActivity: React.FC<IFeedActivityProps> = ({ onPostOpen }) => {
  const resourceContext = useResourceContext();

  if (!resourceContext) {
    throw Error(LABELS.RESOURCE_CONTEXT_UNINITIALIZED);
  }
  const {
    totalCommentsCount,
    reactionsCount,
    userReaction,
    totalReactionsCount,
    updateUserReaction,
  } = resourceContext;

  const [showUserReactionsModal, setShowUserReactionsModal] =
    useState<boolean>(false);
  const [showReactionTooltip, setShowReactionTooltip] =
    useState<boolean>(false);

  const ReactionIcon: React.FC<{ reaction?: IReactionTypes }> = ({
    reaction,
  }) => {
    const Icon = REACTION_CONFIGS[reaction || "like"].iconActive;
    return <Icon sx={reactionIconSx(reaction)} />;
  };

  const handleToggleReactionClick = (reaction?: IReactionTypes) => () => {
    updateUserReaction(reaction || "like");
  };

  const handleUserReactionsModalOpen = () => {
    setShowUserReactionsModal(true);
  };

  const handleUserReactionsModalClose = useCallback(() => {
    setShowUserReactionsModal(false);
  }, []);

  const handleReactionsTooltipOpen = () => {
    setShowReactionTooltip(true);
  };

  const handleReactionsTooltipClose = () => {
    setShowReactionTooltip(false);
  };

  return (
    <Box>
      <Grid container display="flex" justifyContent="space-between" p={1}>
        <Grid item>
          <Grid container columnSpacing={0.5}>
            <Grid item ml={0.5} mt={0.5}>
              <ReactionIconClubber reactionIconCount={reactionsCount} />
            </Grid>
            <Grid item>
              <Typography
                sx={fadedLinkSx(12)}
                onClick={handleUserReactionsModalOpen}
              >
                {userReaction
                  ? totalReactionsCount > 1
                    ? LABELS.YOU_AND_OTHERS(totalReactionsCount)
                    : LABELS.YOU
                  : totalReactionsCount > 0
                  ? totalReactionsCount
                  : LABELS.BE_FIRST_TO_REACT}
              </Typography>
              <ReactionModal
                showModal={showUserReactionsModal}
                onModalClose={handleUserReactionsModalClose}
              />
            </Grid>
          </Grid>
        </Grid>
        {totalCommentsCount > 0 && (
          <Grid item onClick={onPostOpen}>
            <Typography sx={fadedLinkSx(12)}>
              {LABELS.COMMENTS_COUNT(totalCommentsCount)}
            </Typography>
          </Grid>
        )}
      </Grid>
      <Divider sx={dividerSx} />
      <Grid container alignItems="center" justifyContent="center" pt={1}>
        <Grid item xs={4}>
          <ReactionTooltip
            open={showReactionTooltip}
            handleOpen={handleReactionsTooltipOpen}
            handleClose={handleReactionsTooltipClose}
          >
            {userReaction ? (
              <Box
                display="flex"
                alignItems="flex-end"
                justifyContent="center"
                onClick={handleToggleReactionClick(userReaction)}
                sx={reactionPresentSx(userReaction)}
                py={1}
              >
                <Typography fontWeight="bold" variant="body2" pr={1}>
                  {REACTION_CONFIGS[userReaction].label}
                </Typography>
                <ReactionIcon reaction={userReaction} />
              </Box>
            ) : (
              <Box
                display="flex"
                alignItems="flex-end"
                justifyContent="center"
                sx={postInteractionSx}
                onClick={handleToggleReactionClick()}
                py={1}
              >
                <Typography variant="body2" pr={1}>
                  {LABELS.LIKE}
                </Typography>
                <ThumbUpIcon fontSize="small" />
              </Box>
            )}
          </ReactionTooltip>
        </Grid>
        <Grid
          item
          xs={4}
          display="flex"
          alignItems="center"
          justifyContent="center"
          py={1}
          sx={postInteractionSx}
          onClick={onPostOpen}
        >
          <Typography pr={1} variant="body2">
            {LABELS.COMMENT}
          </Typography>
          <CommentIcon fontSize="small" />
        </Grid>
        <Grid
          item
          xs={4}
          display="flex"
          alignItems="center"
          justifyContent="center"
          py={1}
          sx={postInteractionSx}
        >
          <Typography pr={1} variant="body2">
            {LABELS.SHARE}
          </Typography>
          <ShareIcon fontSize="small" />
        </Grid>
      </Grid>
    </Box>
  );
};

const reactionPresentSx: (
  reactionType: IReactionTypes
) => (theme: Theme) => SystemStyleObject<Theme> = reactionType => {
  return (theme: Theme) => ({
    color: `${theme.palette.reactions[reactionType]}`,
    "&:hover": {
      cursor: "pointer",
      backgroundColor: theme.palette.background.default,
    },
  });
};

const reactionIconSx: (
  reactionType?: IReactionTypes
) => (theme: Theme) => SystemStyleObject<Theme> = reactionType => {
  return (theme: Theme) => ({
    fill: reactionType
      ? `${theme.palette.reactions[reactionType]}`
      : `${theme.palette.grey["A700"]}`,
    "&:hover": {
      cursor: "pointer",
    },
  });
};

const postInteractionSx: SxProps<Theme> = (theme: Theme) => ({
  "&:hover": {
    cursor: "pointer",
    backgroundColor: theme.palette.background.default,
  },
});

const dividerSx: SxProps<Theme> = (theme: Theme) => ({
  borderColor: `${theme.palette.secondary.light}`,
});

export default FeedActivity;
