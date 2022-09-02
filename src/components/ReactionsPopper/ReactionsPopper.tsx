import { Box, SxProps, Theme, Tooltip } from "@mui/material";
import { SystemStyleObject } from "@mui/system";
import { REACTION_CONFIGS } from "../../constants/app";
import { IReactionTypes, REACTIONS } from "../../interfaces/api/external";

interface IReactionsPopperProps {}

const ReactionIcon: React.FC<{
  reaction: IReactionTypes;
}> = ({ reaction }) => {
  const Icon = REACTION_CONFIGS[reaction].iconActive;
  return <Icon sx={reactionIconSx(reaction as IReactionTypes)} />;
};

const ReactionsPopper: React.FC<IReactionsPopperProps> = () => {
  return (
    <Box pt={1}>
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

const reactionIconSx: (
  reactionType: IReactionTypes
) => (theme: Theme) => SystemStyleObject<Theme> = reactionType => {
  return (theme: Theme) => ({
    borderRadius: "50%",
    padding: "6px",
    fontSize: "40px",
    margin: "0px 8px",
    fill: theme.palette.grey["50"],
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
