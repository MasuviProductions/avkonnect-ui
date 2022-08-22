import {
  Button,
  Typography,
  Hidden,
  Box,
  Grid,
  Avatar,
  Divider,
  Popover,
  SxProps,
  Theme,
} from "@mui/material";
import { useState } from "react";
import PostView from "../../Post/PostView";
import { useResourceContext } from "../../../contexts/ResourceContext";
import { useRouter } from "next/router";
import { SystemStyleObject } from "@mui/system";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import CommentIcon from "@mui/icons-material/Comment";
import ShareIcon from "@mui/icons-material/Share";
import { getEllipsedText, getTimeAgo } from "../../../utils/generic";
import ReactionIconClubber from "../../../components/ReactionIconClubber";
import { compile } from "path-to-regexp";
import { APP_ROUTES, REACTION_CONFIGS } from "../../../constants/app";
import { parseContentText } from "../../../utils/component";
import { IPostResponseContentModel } from "../../../interfaces/api/external";

interface IFeedProps {
  feedContent: IPostResponseContentModel[];
}

const Feed: React.FC<IFeedProps> = ({ feedContent }) => {
  const router = useRouter();
  const {
    id,
    relatedSourceMap,
    sourceId,
    createdAt,
    commentsCount,
    reactionsCount,
    userReaction,
    totalReactionsCount,
  } = useResourceContext();

  const [showPostDetail, setShowPostDetail] = useState(false);
  const [popoverAnchor, setPopoverAnchor] = useState<HTMLElement | null>(null);

  const LikeActiveIcon = REACTION_CONFIGS.like.iconActive;
  const LoveActiveIcon = REACTION_CONFIGS.love.iconActive;
  const LaughActiveIcon = REACTION_CONFIGS.laugh.iconActive;
  const SupportActiveIcon = REACTION_CONFIGS.support.iconActive;
  const SadActiveIcon = REACTION_CONFIGS.sad.iconActive;

  const handlePostDetailOpen = () => {
    setShowPostDetail(true);
  };

  const handlePostDetailClose = () => {
    setShowPostDetail(false);
  };

  const handleProfileRedirectClick = () => {
    router.push(compile(APP_ROUTES.PROFILE.route)({ id: sourceId }));
  };

  const handleLikePopoverOpen = (event: React.MouseEvent<HTMLElement>) => {
    setPopoverAnchor(popoverAnchor === null ? event.currentTarget : null);
  };

  const handleLikePopoverClose = () => {
    setPopoverAnchor(null);
  };

  const open = Boolean(popoverAnchor);

  return (
    <Box sx={postBoxSx}>
      <Grid
        container
        py={1}
        spacing={2}
        alignItems="center"
        justifyContent="space-between"
      >
        <Grid item display="flex" alignItems="center">
          <Avatar
            alt={relatedSourceMap[sourceId].name}
            src={relatedSourceMap[sourceId].displayPictureUrl}
            onClick={handleProfileRedirectClick}
            sx={displayPicSx}
          />
          <Box ml={1} mt={0.5}>
            <Typography lineHeight={0.5}>
              {relatedSourceMap[sourceId].name}
            </Typography>
            <Typography variant="caption" lineHeight={0.5}>
              {getEllipsedText(relatedSourceMap[sourceId].headline, 35)}
            </Typography>
            <Typography
              variant="caption"
              lineHeight={0.8}
              sx={{ fontSize: "10px" }}
              component="div"
            >
              {getTimeAgo(createdAt)}
            </Typography>
          </Box>
        </Grid>
        <Grid item display="flex" justifyContent="flex-end" alignItems="center">
          <MoreHorizIcon fontSize="large" sx={morePostOptionsSx} />
        </Grid>
      </Grid>
      <Grid container p={2}>
        <Grid item>
          {parseContentText(
            feedContent[feedContent.length - 1].text,
            relatedSourceMap
          )}
        </Grid>
      </Grid>
      <Grid
        container
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <Grid item pl={1} display="flex" alignItems="center">
          <ReactionIconClubber reactionIconCount={reactionsCount} />
          <Box component="span" ml={0.5}>
            {userReaction ? (
              totalReactionsCount > 1 ? (
                <Typography variant="caption">
                  You and {totalReactionsCount - 1} Others
                </Typography>
              ) : (
                <Typography variant="caption">You</Typography>
              )
            ) : totalReactionsCount > 0 ? (
              <Typography variant="caption">{totalReactionsCount}</Typography>
            ) : (
              <Typography variant="caption">Be the first to react!</Typography>
            )}
          </Box>
        </Grid>
        {commentsCount > 0 && (
          <Grid item p={1} onClick={handlePostDetailOpen}>
            <Typography
              variant="caption"
              component="span"
              sx={semiCommentLinkSx}
            >
              {`${commentsCount} comments`}
            </Typography>
          </Grid>
        )}
      </Grid>
      <Divider />
      <Grid container alignItems="center" justifyContent="center" mt={1}>
        <Grid
          item
          xs={4}
          aria-describedby={open ? "reaction-popover" : undefined}
          onMouseDown={handleLikePopoverOpen}
        >
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            sx={postInteractionSx}
            py={1}
          >
            <Typography variant="body2" pr={1}>
              Like
            </Typography>
            <ThumbUpIcon color="primary" fontSize="small" />
          </Box>
          <Popover
            id="reaction-popover"
            anchorEl={popoverAnchor}
            anchorOrigin={{
              vertical: "top",
              horizontal: "center",
            }}
            transformOrigin={{
              vertical: "bottom",
              horizontal: "center",
            }}
            open={open}
            onClose={handleLikePopoverClose}
          >
            <Box pt={1}>
              <LikeActiveIcon
                color="primary"
                fontSize="large"
                sx={likeIconSx}
              />
              <LoveActiveIcon
                color="primary"
                fontSize="large"
                sx={loveIconSx}
              />
              <SupportActiveIcon
                color="primary"
                fontSize="large"
                sx={supportIconSx}
              />
              <LaughActiveIcon
                color="primary"
                fontSize="large"
                sx={laughIconSx}
              />
              <SadActiveIcon color="primary" fontSize="large" sx={sadIconSx} />
            </Box>
          </Popover>
        </Grid>
        <Grid
          item
          xs={4}
          display="flex"
          alignItems="center"
          justifyContent="center"
          py={1}
          sx={postInteractionSx}
          onClick={handlePostDetailOpen}
        >
          <Typography pr={1} variant="body2">
            Comment
          </Typography>
          <CommentIcon color="primary" fontSize="small" />
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
            Share
          </Typography>
          <ShareIcon color="primary" fontSize="small" />
        </Grid>
      </Grid>
      <PostView showPost={showPostDetail} onPostClose={handlePostDetailClose} />
    </Box>
  );
};

const postBoxSx: SxProps<Theme> = (theme: Theme) => ({
  margin: "8px",
  padding: "8px",
  backgroundColor: theme.palette.background.paper,
  borderRadius: "6px",
});

const displayPicSx: SxProps<Theme> = {
  width: "45px",
  height: "auto",
  "&:hover": {
    cursor: "pointer",
  },
};

const morePostOptionsSx: SxProps<Theme> = (theme: Theme) => ({
  padding: "8px",
  fontSize: "42px",
  "&:hover": {
    cursor: "pointer",
    backgroundColor: theme.palette.background.default,
    borderRadius: "50%",
  },
});

const reactionIconSx = (
  theme: Theme,
  color: string
): SystemStyleObject<Theme> => ({
  fill: color,
  backgroundColor: theme.palette.background.paper,
  borderRadius: "50%",
  padding: "6px",
  fontSize: "44px",
  margin: "0px 3px",
  "&:hover": {
    fill: theme.palette.background.paper,
    backgroundColor: color,
    cursor: "pointer",
    animation: "mover 0.2s 4 alternate",
    "@keyframes mover": {
      "0%": { transform: "translateY(0px)" },
      "100%": { transform: "translateY(-5px)" },
    },
  },
});

const likeIconSx = (theme: Theme): SystemStyleObject<Theme> => {
  return reactionIconSx(theme, theme.palette.reactions.like);
};

const loveIconSx = (theme: Theme): SystemStyleObject<Theme> => {
  return reactionIconSx(theme, theme.palette.reactions.love);
};

const supportIconSx = (theme: Theme): SystemStyleObject<Theme> => {
  return reactionIconSx(theme, theme.palette.reactions.support);
};

const laughIconSx = (theme: Theme): SystemStyleObject<Theme> => {
  return reactionIconSx(theme, theme.palette.reactions.laugh);
};

const sadIconSx = (theme: Theme): SystemStyleObject<Theme> => {
  return reactionIconSx(theme, theme.palette.reactions.sad);
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

export default Feed;
