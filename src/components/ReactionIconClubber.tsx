import {
  IReactionCountApiModel,
  IReactionTypes,
  REACTIONS,
} from "../interfaces/api/external";
import { Box, Theme } from "@mui/material";
import { SystemStyleObject } from "@mui/system";
import { REACTION_CONFIGS } from "../constants/app";

interface IReactionIconClubber {
  reactionIconCount: IReactionCountApiModel;
}

const ReactionIcon: React.FC<{
  reaction: IReactionTypes;
  reactionCount: number;
  zIndex: number;
}> = ({ reaction, reactionCount, zIndex }) => {
  const Icon = REACTION_CONFIGS[reaction].icon;
  if (reactionCount <= 0) {
    return <></>;
  }
  return <Icon sx={reactionIconSx(reaction as IReactionTypes, zIndex)} />;
};

const ReactionIconClubber: React.FC<IReactionIconClubber> = ({
  reactionIconCount,
}) => {
  return (
    <Box component="span" mt={1}>
      {REACTIONS.map((reaction, index) => (
        <ReactionIcon
          key={index}
          reaction={reaction}
          reactionCount={reactionIconCount[reaction]}
          zIndex={index}
        />
      ))}
    </Box>
  );
};

const reactionIconSx: (
  reactionType: IReactionTypes,
  zInd: number
) => (theme: Theme) => SystemStyleObject<Theme> = (reactionType, zInd) => {
  return (theme: Theme) => ({
    marginLeft: "-5px",
    padding: "2px",
    fontSize: "17px",
    fill: "#fff",
    zIndex: zInd ? zInd : 0,
    backgroundColor: theme.palette.reactions[reactionType],
    borderRadius: "50%",
  });
};

export default ReactionIconClubber;
