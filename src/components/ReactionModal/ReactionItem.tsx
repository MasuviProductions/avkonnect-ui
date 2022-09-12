import { Grid, Avatar, Typography, Badge, Theme } from "@mui/material";
import {
  IReactionApiModel,
  IReactionTypes,
} from "../../interfaces/api/external";
import { useRouter } from "next/router";
import { getMUIEllipsedSx, usernameToColor } from "../../utils/generic";
import { APP_ROUTES, REACTION_CONFIGS } from "../../constants/app";
import { compile } from "path-to-regexp";
import { simpleLinkSx, userAvatarSx } from "../../styles/sx";
import { SystemStyleObject } from "@mui/system";

interface IReactionItemProps {
  reaction: IReactionApiModel;
  relatedSourceName: string;
  relatedSourceDispPic: string;
  relatedSourceHeadline: string;
}

const ReactionItem: React.FC<IReactionItemProps> = ({
  reaction,
  relatedSourceName,
  relatedSourceDispPic,
  relatedSourceHeadline,
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
            src={relatedSourceDispPic}
            alt={relatedSourceName}
            onClick={handleProfileRedirectClick}
            sx={userAvatarSx(usernameToColor(relatedSourceName as string), 50)}
          >
            {relatedSourceName[0]}
          </Avatar>
        </Badge>
      </Grid>

      <Grid item sm={10} xs={8}>
        <Grid container>
          <Grid item xs={12}>
            <Typography sx={simpleLinkSx()}>{relatedSourceName}</Typography>
          </Grid>

          <Grid item xs={12}>
            <Typography sx={getMUIEllipsedSx(2)} lineHeight={1.2} fontSize={12}>
              {relatedSourceHeadline}
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
