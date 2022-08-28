import { Grid, Divider, Typography, Box, Avatar } from "@mui/material";
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
import { userAvatarSx } from "../../../../styles/sx";
import { usernameToColor } from "../../../../utils/generic";

interface IFeedSourceProps {
  feedSource: IFeedSourceApiModel[];
}

const FeedSource: React.FC<IFeedSourceProps> = ({ feedSource }) => {
  const router = useRouter();
  const { relatedSourceMap } = useResourceContext();

  const getFeedSourceDetails = (
    feedSource: IFeedSourceApiModel[],
    relatedSourceMap: Record<string, IRelatedSource>
  ): [IResourceTypes, IRelatedSource] => {
    let fsResult = feedSource[0];
    feedSource.forEach(fs => {
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
      <Box>
        <Grid
          container
          alignItems="center"
          spacing={1}
          mb={0.6}
          onClick={handleProfileRedirectClick}
        >
          <Grid item>
            <Avatar
              alt={feedSourceDetails.name}
              src={feedSourceDetails.displayPictureUrl}
              sx={userAvatarSx(
                usernameToColor(feedSourceDetails.name as string),
                35
              )}
            />
          </Grid>
          <Grid item>
            <Typography variant="caption">
              {feedResourceType === "comment"
                ? LABELS.COMMENT_SOURCE(feedSourceDetails.name)
                : LABELS.REACTION_SOURCE(
                    feedSourceDetails.name,
                    LABELS.REACTION_PRETEXT_DEFAULT
                  )}
            </Typography>
          </Grid>
        </Grid>
        <Divider />
      </Box>
    );
  } else {
    return <></>;
  }
};

export default FeedSource;
