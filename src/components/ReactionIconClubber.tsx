import LikeIcon from "@mui/icons-material/ThumbUp";
import LoveIcon from "@mui/icons-material/Favorite";
import LaughIcon from "@mui/icons-material/EmojiEmotions";
import SadIcon from "@mui/icons-material/SentimentVeryDissatisfied";
import SupportIcon from "@mui/icons-material/Handshake";
import { IReactionCountApiModel } from "../interfaces/api/external";
import { Box, Theme } from "@mui/material";
import { SystemStyleObject } from "@mui/system";

interface IReactionIconClubber {
  reactionIconCount: IReactionCountApiModel;
}

const ReactionIconClubber: React.FC<IReactionIconClubber> = ({
  reactionIconCount,
}) => {
  return (
    <Box component="span" mt={1}>
      {reactionIconCount.like > 0 && <LikeIcon sx={likeIconSx} />}
      {reactionIconCount.love > 0 && <LoveIcon sx={loveIconSx} />}
      {reactionIconCount.laugh > 0 && <LaughIcon sx={laughIconSx} />}
      {reactionIconCount.support > 0 && <SupportIcon sx={supportIconSx} />}
      {reactionIconCount.sad > 0 && <SadIcon sx={sadIconSx} />}
    </Box>
  );
};

const reactionIconSx = (
  theme: Theme,
  color: string,
  zInd?: number,
  ml?: string
): SystemStyleObject<Theme> => ({
  marginLeft: ml ? ml : "-5px",
  fontSize: "16px",
  fill: color,
  zIndex: zInd ? zInd : 0,
});

const likeIconSx = (theme: Theme): SystemStyleObject<Theme> => {
  return reactionIconSx(theme, "#207ed6", 0, "0px");
};

const loveIconSx = (theme: Theme): SystemStyleObject<Theme> => {
  return reactionIconSx(theme, "#c21557", 1);
};

const supportIconSx = (theme: Theme): SystemStyleObject<Theme> => {
  return reactionIconSx(theme, "#a38864", 2);
};

const laughIconSx = (theme: Theme): SystemStyleObject<Theme> => {
  return reactionIconSx(theme, "#ed771c", 3);
};

const sadIconSx = (theme: Theme): SystemStyleObject<Theme> => {
  return reactionIconSx(theme, "#5d6163", 4);
};

export default ReactionIconClubber;
