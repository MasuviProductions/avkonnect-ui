import {
  Grid,
  Divider,
  Typography,
  Box,
  Avatar,
  SxProps,
  Theme,
} from "@mui/material";
import { useRouter } from "next/router";
import { compile } from "path-to-regexp";
import { APP_ROUTES } from "../../../../constants/app";
import { LABELS } from "../../../../constants/labels";
import { useResourceContext } from "../../../../contexts/ResourceContext";
import {
  IFeedSourceApiModel,
  IRelatedSource,
  IResourceTypes,
} from "../../../../interfaces/api/external";
import { simpleLinkSx, userAvatarSx } from "../../../../styles/sx";
import { usernameToColor } from "../../../../utils/generic";

interface IPostSourceProps {
  feedSource: IFeedSourceApiModel[];
}

const PostSource: React.FC<IPostSourceProps> = ({ feedSource }) => {
  const router = useRouter();
  const resourceContext = useResourceContext();

  if (!resourceContext) {
    throw Error(LABELS.RESOURCE_CONTEXT_UNINITIALIZED);
  }
  const { relatedSourceMap } = resourceContext;

  const getFeedSourceDetails = (
    feedSource: IFeedSourceApiModel[],
    relatedSourceMap: Record<string, IRelatedSource>
  ): [IResourceTypes, IRelatedSource] => {
    let fsResult = feedSource[0];
    feedSource.forEach((fs) => {
      if (fs.resourceType === "reaction" && fsResult.resourceType === "post") {
        fsResult = fs;
      }
      if (
        fs.resourceType === "comment" &&
        fsResult.resourceType !== "comment"
      ) {
        fsResult = fs;
      }
    });
    return [fsResult.resourceType, relatedSourceMap[fsResult.sourceId]];
  };

  const [feedResourceType, feedSourceDetails] = getFeedSourceDetails(
    feedSource,
    relatedSourceMap
  );

  const handleProfileRedirectClick = () => {
    router.push(
      compile(APP_ROUTES.PROFILE.route)({ id: feedSourceDetails?.id })
    );
  };

  if (feedResourceType !== "post") {
    return (
      <>
        <Grid
          container
          alignItems="center"
          spacing={1}
          p={1}
          onClick={handleProfileRedirectClick}
        >
          <Grid item>
            <Avatar
              alt={feedSourceDetails.name}
              src={feedSourceDetails.displayPictureUrl}
              sx={userAvatarSx(
                usernameToColor(feedSourceDetails.name as string),
                25
              )}
            />
          </Grid>
          <Grid item>
            <Typography component="span" sx={simpleLinkSx(12)}>
              {feedSourceDetails.name}
            </Typography>
            <Typography component="span" variant="caption">
              {` ${
                feedResourceType === "comment"
                  ? LABELS.COMMENTED_ON
                  : LABELS.REACTION_SOURCE(LABELS.REACTION_PRETEXT_DEFAULT)
              }`}
            </Typography>
          </Grid>
        </Grid>
        <Divider sx={dividerSx} />
      </>
    );
  }

  return <></>;
};

const dividerSx: SxProps<Theme> = (theme: Theme) => ({
  borderColor: `${theme.palette.secondary.light}`,
});

export default PostSource;
