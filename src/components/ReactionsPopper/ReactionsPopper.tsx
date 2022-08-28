import { Box, SxProps, Theme, Tooltip } from "@mui/material";
import { SystemStyleObject } from "@mui/system";
import { REACTION_CONFIGS } from "../../constants/app";
import { IReactionTypes, REACTIONS } from "../../interfaces/api/external";

interface IReactionsPopper {}

const ReactionIcon: React.FC<{
  reaction: IReactionTypes;
}> = ({ reaction }) => {
  const Icon = REACTION_CONFIGS[reaction].iconActive;
  return <Icon sx={reactionIconSx(reaction as IReactionTypes)} />;
};

const ReactionsPopper: React.FC<IReactionsPopper> = () => {
  return (
    <Box pt={1} sx={reactionPopperSx}>
      {REACTIONS.map((reaction, index) => (
        <Tooltip key={index} title={REACTION_CONFIGS[reaction].label as string}>
          <Box component="span">
            <ReactionIcon reaction={reaction} />
          </Box>
        </Tooltip>
      ))}
    </Box>
  );
};

const reactionPopperSx: SxProps<Theme> = (theme: Theme) => ({
  position: "absolute",
  transform: "translate(0, -100%)",
  opacity: "0",
  backgroundColor: theme.palette.background.paper,
  boxShadow: `0px 0px 10px ${theme.palette.text.primary}`,
  borderRadius: "6px",
  animation: "appear 0.2s forwards 0.3s 1 normal",
  "@keyframes appear": {
    "0%": {
      opacity: "0",
    },
    "100%": {
      opacity: "1",
    },
  },
});

const reactionIconSx: (
  reactionType: IReactionTypes
) => (theme: Theme) => SystemStyleObject<Theme> = reactionType => {
  return (theme: Theme) => ({
    borderRadius: "50%",
    padding: "6px",
    fontSize: "40px",
    margin: "0px 8px",
    fill: "#fff",
    backgroundColor: theme.palette.reactions[reactionType],
    "&:hover": {
      cursor: "pointer",
      animation: "zoomer 0.2s forwards 1 normal",
      "@keyframes zoomer": {
        "100%": { transform: "scale(1.2)" },
      },
    },
  });
};

export default ReactionsPopper;
