import { Box, SxProps, Theme } from "@mui/material";
import { SystemStyleObject } from "@mui/system";
import { REACTION_CONFIGS } from "../../constants/app";

interface IReactionsPopper {}

const ReactionsPopper: React.FC<IReactionsPopper> = ({}) => {
  const LikeActiveIcon = REACTION_CONFIGS.like.iconActive;
  const LoveActiveIcon = REACTION_CONFIGS.love.iconActive;
  const LaughActiveIcon = REACTION_CONFIGS.laugh.iconActive;
  const SupportActiveIcon = REACTION_CONFIGS.support.iconActive;
  const SadActiveIcon = REACTION_CONFIGS.sad.iconActive;

  return (
    <Box pt={1} sx={reactionPopperSx}>
      <LikeActiveIcon color="primary" fontSize="large" sx={likeIconSx} />
      <LoveActiveIcon color="primary" fontSize="large" sx={loveIconSx} />
      <SupportActiveIcon color="primary" fontSize="large" sx={supportIconSx} />
      <LaughActiveIcon color="primary" fontSize="large" sx={laughIconSx} />
      <SadActiveIcon color="primary" fontSize="large" sx={sadIconSx} />
    </Box>
  );
};

const reactionPopperSx: SxProps<Theme> = (theme: Theme) => ({
  position: "absolute",
  marginTop: "-50px",
  backgroundColor: theme.palette.background.paper,
  boxShadow: `0px 0px 10px ${theme.palette.text.primary}`,
  borderRadius: "6px",
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
  margin: "0px 8px",
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

export default ReactionsPopper;
