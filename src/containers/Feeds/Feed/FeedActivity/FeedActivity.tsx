import { Box, Grid, Divider, Typography, SxProps, Theme } from "@mui/material";
import ReactionIconClubber from "../../../../components/ReactionIconClubber";
import ReactionTooltip from "../../../../components/ReactionTooltip";
import { useResourceContext } from "../../../../contexts/ResourceContext";
import CommentIcon from "@mui/icons-material/Comment";
import ShareIcon from "@mui/icons-material/Share";
import { LABELS } from "../../../../constants/labels";
import { SystemStyleObject } from "@mui/system";
import { IReactionTypes } from "../../../../interfaces/api/external";
import { REACTION_CONFIGS } from "../../../../constants/app";

interface IFeedActivityProps {
  onPostOpen: () => void;
}

const FeedActivity: React.FC<IFeedActivityProps> = ({ onPostOpen }) => {
  const resourceContext = useResourceContext();

  if (!resourceContext) {
    throw Error(LABELS.RESOURCE_CONTEXT_UNINITIALIZED);
  }
  const {
    commentsCount,
    reactionsCount,
    userReaction,
    totalReactionsCount,
    updateUserReaction,
  } = resourceContext;

  const ReactionIcon: React.FC<{ reaction?: IReactionTypes }> = ({
    reaction,
  }) => {
    const Icon = REACTION_CONFIGS[reaction || "like"].iconActive;
    return <Icon sx={reactionIconSx(reaction)} />;
  };

  const handleToggleReactionClick = (reaction?: IReactionTypes) => () => {
    updateUserReaction(reaction || "like");
  };

  return (
    <Box>
      <Grid
        container
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <Grid item pl={1} display="flex" alignItems="center">
          <ReactionIconClubber reactionIconCount={reactionsCount} />
          <Box component="span" ml={0.5} py={1}>
            {userReaction ? (
              totalReactionsCount > 1 ? (
                <Typography variant="caption">
                  {LABELS.YOU_AND_OTHERS(totalReactionsCount)}
                </Typography>
              ) : (
                <Typography variant="caption">{LABELS.YOU}</Typography>
              )
            ) : totalReactionsCount > 0 ? (
              <Typography variant="caption">{totalReactionsCount}</Typography>
            ) : (
              <Typography variant="caption">
                {LABELS.BE_FIRST_TO_REACT}
              </Typography>
            )}
          </Box>
        </Grid>
        {commentsCount?.comment > 0 && (
          <Grid item onClick={onPostOpen}>
            <Typography
              variant="caption"
              component="span"
              sx={semiCommentLinkSx}
            >
              {LABELS.COMMENTS_COUNT(commentsCount?.comment)}
            </Typography>
          </Grid>
        )}
      </Grid>
      <Divider sx={dividerSx} />
      <Grid container alignItems="center" justifyContent="center" pt={1}>
        <Grid item xs={4}>
          <>
            <ReactionTooltip>
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
                  <ReactionIcon />
                </Box>
              )}
            </ReactionTooltip>
          </>
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

const semiCommentLinkSx: SxProps<Theme> = {
  "&:hover": {
    cursor: "pointer",
    textDecoration: "underline",
  },
};

const dividerSx: SxProps<Theme> = (theme: Theme) => ({
  borderColor: `${theme.palette.text.secondary}77`,
});

export default FeedActivity;
