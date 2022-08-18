import {
  Box,
  Divider,
  Grid,
  SxProps,
  Theme,
  Typography,
  Avatar,
  Popover,
  Grow,
} from "@mui/material";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import CommentIcon from "@mui/icons-material/Comment";
import ShareIcon from "@mui/icons-material/Share";
import LikeIcon from "@mui/icons-material/ThumbUpOffAlt";
import LoveIcon from "@mui/icons-material/FavoriteBorder";
import LaughIcon from "@mui/icons-material/InsertEmoticon";
import SadIcon from "@mui/icons-material/SentimentVeryDissatisfied";
import SupportIcon from "@mui/icons-material/Handshake";
import { useRouter } from "next/router";
import { compile } from "path-to-regexp";
import { APP_ROUTES } from "../../constants/app";
import {
  IRelatedUserInfoResponseModel,
  IUserFeedApiModel,
} from "../../interfaces/api/external";
import { getTimeAgo } from "../../utils/generic";
import {
  getSourceNameFromSourceId,
  getSourceImageFromSourceId,
  getSourceHeadlineFromSourceId,
  getLinkedUserTextIfUserIdIsPresent,
} from "../../utils/posts";
import { useState } from "react";

interface ISinglePostProps {
  postInfo: IUserFeedApiModel;
  relatedSourceInfo: IRelatedUserInfoResponseModel[];
}

const SinglePost: React.FC<ISinglePostProps> = ({
  postInfo,
  relatedSourceInfo,
}) => {
  const router = useRouter();
  const [popoverAnchor, setPopoverAnchor] = useState<HTMLElement | null>(null);

  const handleProfileRedirectClick = () => {
    router.push(compile(APP_ROUTES.PROFILE.route)({ id: postInfo.sourceId }));
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
      <Grid container py={0.5} spacing={2} alignItems="center">
        <Grid
          item
          onClick={handleProfileRedirectClick}
          display="flex"
          alignItems="center"
        >
          <Avatar
            alt={getSourceNameFromSourceId(
              postInfo.sourceId,
              relatedSourceInfo
            )}
            src={getSourceImageFromSourceId(
              postInfo.sourceId,
              relatedSourceInfo
            )}
          />
          <Box ml={1} mt={0.5}>
            <Typography onClick={handleProfileRedirectClick} lineHeight={0.5}>
              {getSourceNameFromSourceId(postInfo.sourceId, relatedSourceInfo)}
            </Typography>
            <Typography onClick={handleProfileRedirectClick} variant="caption">
              {getSourceHeadlineFromSourceId(
                postInfo.sourceId,
                relatedSourceInfo
              )}
            </Typography>
          </Box>
        </Grid>
      </Grid>
      <Divider />
      <Grid container p={2}>
        <Grid item>
          <Typography
            variant="body2"
            dangerouslySetInnerHTML={{
              __html: getLinkedUserTextIfUserIdIsPresent(
                postInfo.contents[postInfo.contents.length - 1].text,
                relatedSourceInfo
              ),
            }}
          />
        </Grid>
      </Grid>
      <Grid container alignItems="center" justifyContent="center">
        <Grid
          item
          xs={4}
          aria-describedby={open ? "reaction-popover" : undefined}
          onClick={handleLikePopoverOpen}
        >
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            sx={postInteractionSx}
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
            <Box p={1}>
              <LikeIcon color="primary" fontSize="large" sx={reactionIconSx} />
              <LoveIcon color="primary" fontSize="large" sx={reactionIconSx} />
              <SupportIcon
                color="primary"
                fontSize="large"
                sx={reactionIconSx}
              />
              <LaughIcon color="primary" fontSize="large" sx={reactionIconSx} />
              <SadIcon color="primary" fontSize="large" sx={reactionIconSx} />
            </Box>
          </Popover>
        </Grid>
        <Grid
          item
          xs={4}
          display="flex"
          alignItems="center"
          justifyContent="center"
          sx={postInteractionSx}
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
          sx={postInteractionSx}
        >
          <Typography pr={1} variant="body2">
            Share
          </Typography>
          <ShareIcon color="primary" fontSize="small" />
        </Grid>
      </Grid>
    </Box>
  );
};

const postBoxSx: SxProps<Theme> = (theme: Theme) => ({
  margin: "8px",
  padding: "8px",
  backgroundColor: theme.palette.background.paper,
  borderRadius: "6px",
});

const reactionIconSx: SxProps<Theme> = () => ({
  margin: "0px 8px",
  "&:hover": {
    cursor: "pointer",
    animation: "mover 0.2s 4 alternate",
    "@keyframes mover": {
      "0%": { transform: "translateY(0px)" },
      "100%": { transform: "translateY(-5px)" },
    },
  },
});

const postInteractionSx: SxProps<Theme> = () => ({
  "&:hover": {
    cursor: "pointer",
  },
});

export default SinglePost;
