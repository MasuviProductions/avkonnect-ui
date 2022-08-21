import { IReactionCountApiModel } from "../interfaces/api/external";
import { Box, Theme } from "@mui/material";
import { SystemStyleObject } from "@mui/system";
import { REACTION_CONFIGS } from "../constants/app";

interface IReactionIconClubber {
  reactionIconCount: IReactionCountApiModel;
}

const ReactionIconClubber: React.FC<IReactionIconClubber> = ({
  reactionIconCount,
}) => {
  const LikeIcon = REACTION_CONFIGS.like.icon;
  const LoveIcon = REACTION_CONFIGS.love.icon;
  const LaughIcon = REACTION_CONFIGS.laugh.icon;
  const SupportIcon = REACTION_CONFIGS.support.icon;
  const SadIcon = REACTION_CONFIGS.sad.icon;

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
  marginLeft: ml ? ml : "-3px",
  padding: "2px",
  fontSize: "17px",
  fill: "#fff",
  zIndex: zInd ? zInd : 0,
  backgroundColor: color,
  borderRadius: "50%",
});

const likeIconSx = (theme: Theme): SystemStyleObject<Theme> => {
  return reactionIconSx(theme, theme.palette.reactions.like, 0, "0px");
};

const loveIconSx = (theme: Theme): SystemStyleObject<Theme> => {
  return reactionIconSx(theme, theme.palette.reactions.love, 1);
};

const supportIconSx = (theme: Theme): SystemStyleObject<Theme> => {
  return reactionIconSx(theme, theme.palette.reactions.support, 2);
};

const laughIconSx = (theme: Theme): SystemStyleObject<Theme> => {
  return reactionIconSx(theme, theme.palette.reactions.laugh, 3);
};

const sadIconSx = (theme: Theme): SystemStyleObject<Theme> => {
  return reactionIconSx(theme, theme.palette.reactions.sad, 4);
};

export default ReactionIconClubber;
