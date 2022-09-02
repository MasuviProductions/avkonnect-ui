import { Fragment, useState } from "react";
import {
  Box,
  Grid,
  Divider,
  Typography,
  SxProps,
  Theme,
  Tooltip,
  TooltipProps,
  tooltipClasses,
  styled,
} from "@mui/material";
import ReactionIconClubber from "../../../../components/ReactionIconClubber";
import ReactionsPopper from "../../../../components/ReactionsPopper";
import { useResourceContext } from "../../../../contexts/ResourceContext";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import CommentIcon from "@mui/icons-material/Comment";
import ShareIcon from "@mui/icons-material/Share";
import { LABELS } from "../../../../constants/labels";

interface IFeedActivityProps {
  onPostOpen: () => void;
}

const FeedActivity: React.FC<IFeedActivityProps> = ({ onPostOpen }) => {
  const { commentsCount, reactionsCount, userReaction, totalReactionsCount } =
    useResourceContext();

  const ReactionTooltip = styled(({ className, ...props }: TooltipProps) => (
    <Tooltip {...props} classes={{ popper: className }} />
  ))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: theme.palette.background.paper,
      boxShadow: `0px 0px 10px ${theme.palette.text.secondary}77`,
    },
  }));

  const handleLikeClick = () => {
    console.log("Liked");
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
        {commentsCount > 0 && (
          <Grid item onClick={onPostOpen}>
            <Typography
              variant="caption"
              component="span"
              sx={semiCommentLinkSx}
            >
              {LABELS.COMMENTS_COUNT(commentsCount)}
            </Typography>
          </Grid>
        )}
      </Grid>
      <Divider sx={dividerSx} />
      <Grid container alignItems="center" justifyContent="center" pt={1}>
        <Grid item xs={4}>
          <>
            <ReactionTooltip
              placement="top"
              title={
                <Fragment>
                  <ReactionsPopper />
                </Fragment>
              }
            >
              <Box
                display="flex"
                alignItems="center"
                justifyContent="center"
                sx={postInteractionSx}
                onClick={handleLikeClick}
                py={1}
              >
                <Typography variant="body2" pr={1}>
                  {LABELS.LIKE}
                </Typography>
                <ThumbUpIcon fontSize="small" />
              </Box>
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

const tooltipPopperSx: SxProps<Theme> = (theme: Theme) => ({
  backgroundColor: theme.palette.background.paper,
});

export default FeedActivity;
