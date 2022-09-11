import { Grid, Avatar, Typography, Badge, styled, Theme } from "@mui/material";
import {
  IRelatedSource,
  IReactionApiModel,
  IReactionTypes,
} from "../../interfaces/api/external";
import { useRouter } from "next/router";
import {
  getEllipsedText,
  getMUIEllipsedSx,
  getTimeAgo,
  usernameToColor,
} from "../../utils/generic";
import { APP_ROUTES, REACTION_CONFIGS } from "../../constants/app";
import { compile } from "path-to-regexp";
import { simpleLinkSx, userAvatarSx } from "../../styles/sx";
import { SystemStyleObject } from "@mui/system";

interface IReactionItemProps {
  reaction: IReactionApiModel;
  relatedSourcesMap: Record<string, IRelatedSource>;
}

const ReactionItem: React.FC<IReactionItemProps> = ({
  reaction,
  relatedSourcesMap,
}) => {
  const router = useRouter();
  const Icon = REACTION_CONFIGS[reaction.reaction].iconActive;

  const handleProfileRedirectClick = () => {
    router.push(compile(APP_ROUTES.PROFILE.route)({ id: reaction.sourceId }));
  };

  return (
    <Grid container>
      <Grid item mr={2} sm={1} xs={2}>
        <Badge
          overlap="circular"
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          badgeContent={<Icon sx={reactionIconSx(reaction.reaction)} />}
        >
          <Avatar
            src={relatedSourcesMap[reaction.sourceId].displayPictureUrl}
            alt={relatedSourcesMap[reaction.sourceId].name}
            onClick={handleProfileRedirectClick}
            sx={userAvatarSx(
              usernameToColor(
                relatedSourcesMap[reaction.sourceId].name as string
              ),
              50
            )}
          >
            {relatedSourcesMap[reaction.sourceId].name[0]}
          </Avatar>
        </Badge>
      </Grid>

      <Grid item sm={10} xs={8}>
        <Grid container>
          <Grid item xs={12}>
            <Typography sx={simpleLinkSx()}>
              {relatedSourcesMap[reaction.sourceId].name}
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <Typography sx={getMUIEllipsedSx(2)} lineHeight={1.2} fontSize={12}>
              {relatedSourcesMap[reaction.sourceId].headline || "--"}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

const reactionIconSx: (
  reactionType: IReactionTypes
) => (theme: Theme) => SystemStyleObject<Theme> = reactionType => {
  return (theme: Theme) => ({
    borderRadius: "50%",
    border: `1px solid ${theme.palette.grey["A700"]}`,
    fontSize: "18px",
    fill: theme.palette.reactions[reactionType],
    backgroundColor: theme.palette.grey["50"],
  });
};

export default ReactionItem;
