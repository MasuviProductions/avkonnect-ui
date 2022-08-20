import { Button, Grid, Typography } from "@mui/material";
import { useState } from "react";
import { useQuery } from "react-query";
import API_ENDPOINTS from "../../../../../../constants/api";
import { REACTION_CONFIGS } from "../../../../../../constants/app";
import { useResourceContext } from "../../../../../../contexts/ResourceContext";
import { useAuthContext } from "../../../../../../contexts/AuthContext";
import {
  ICreateReactionApiRequest,
  IReactionTypes,
  IResourceTypes,
} from "../../../../../../interfaces/api/external";
import { reactionButtonSx } from "../../../../../../styles/sx";
import { createReaction, deleteReaction } from "../../../../../../utils/api";

interface ICommentReactionsProps {}

const CommentReactions: React.FC<ICommentReactionsProps> = () => {
  const { accessToken } = useAuthContext();
  const {
    userReaction,
    updateUserReaction,
    reactionsCount,
    id,
    type,
    incrementReactionCount,
    decrementReactionCount,
  } = useResourceContext();

  const [reactionUpdateReqBody, setReactionUpdateReqBody] =
    useState<ICreateReactionApiRequest>();

  const {} = useQuery(
    `CREATE:${API_ENDPOINTS.CREATE_REACTION.key}-${id}-${type}`,
    () =>
      createReaction(
        accessToken as string,
        reactionUpdateReqBody as ICreateReactionApiRequest
      ),
    { cacheTime: 0, refetchInterval: false, enabled: !!reactionUpdateReqBody }
  );

  const { refetch: deleteReactionTrigger } = useQuery(
    `DELETE${API_ENDPOINTS.DELETE_REACTION.key}-${id}-${type}`,
    () => deleteReaction(accessToken as string, type, id),
    { cacheTime: 0, refetchInterval: false, enabled: false }
  );

  const handleReactionClick = (reaction?: IReactionTypes) => {
    if (reaction && userReaction) {
      setReactionUpdateReqBody({
        resourceId: id as string,
        resourceType: type as IResourceTypes,
        reaction,
      });
      updateUserReaction(reaction);
      decrementReactionCount(userReaction);
      incrementReactionCount(reaction);
      return;
    }

    if (reaction) {
      setReactionUpdateReqBody({
        resourceId: id as string,
        resourceType: type as IResourceTypes,
        reaction,
      });
      updateUserReaction(reaction);
      incrementReactionCount(reaction);

      return;
    }

    if (userReaction) {
      deleteReactionTrigger();
      updateUserReaction(reaction);
      decrementReactionCount(userReaction);
      return;
    }
  };

  const reactionsTotalCount = Object.values(reactionsCount).reduce(
    (reactionCount, totalCount) => reactionCount + totalCount,
    0
  );

  return (
    <>
      <Grid container>
        <Grid item>
          <Button
            size="small"
            sx={reactionButtonSx(userReaction)}
            onClick={() =>
              handleReactionClick(userReaction ? undefined : "like")
            }
          >
            {REACTION_CONFIGS[userReaction || "like"].label}
          </Button>
        </Grid>

        <Grid>
          <Button size="small" sx={reactionButtonSx(userReaction)}>
            {reactionsTotalCount}
          </Button>
        </Grid>
      </Grid>
    </>
  );
};

export default CommentReactions;
