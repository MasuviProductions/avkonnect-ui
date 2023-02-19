import { Grid, Avatar, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { useResourceContext } from "../../../../contexts/ResourceContext";
import {
  getEllipsedText,
  getTimeAgo,
  usernameToColor,
} from "../../../../utils/generic";
import { compile } from "path-to-regexp";
import { APP_ROUTES } from "../../../../constants/app";
import {
  simpleLinkSx,
  userAvatarHeadlineSx,
  userAvatarSx,
} from "../../../../styles/sx";
import { LABELS } from "../../../../constants/labels";
import PostActions from "./PostActions";

const PostHeader: React.FC = () => {
  const router = useRouter();
  const resourceContext = useResourceContext();

  if (!resourceContext) {
    throw Error(LABELS.RESOURCE_CONTEXT_UNINITIALIZED);
  }
  const { relatedSourceMap, sourceId, createdAt, sourceInfo } = resourceContext;

  const handleProfileRedirectClick = () => {
    router.push(compile(APP_ROUTES.PROFILE.route)({ id: sourceId }));
  };

  return (
    <Grid container px={1} pb={1} spacing={2}>
      <Grid item xs mt={0.5}>
        <Grid container spacing={1}>
          <Grid item>
            <Avatar
              alt={relatedSourceMap[sourceId].name}
              src={relatedSourceMap[sourceId].displayPictureUrl}
              onClick={handleProfileRedirectClick}
              sx={userAvatarSx(usernameToColor(sourceInfo.name as string), 50)}
            >
              {relatedSourceMap[sourceId].name[0]}
            </Avatar>
          </Grid>

          <Grid item xs>
            <Grid container>
              <Grid item xs={12}>
                <Typography
                  sx={simpleLinkSx()}
                  onClick={handleProfileRedirectClick}
                >
                  {relatedSourceMap[sourceId].name}
                </Typography>
              </Grid>

              <Grid item xs={12}>
                <Typography sx={userAvatarHeadlineSx} lineHeight={1.2}>
                  {getEllipsedText(
                    relatedSourceMap[sourceId].headline || "--",
                    35
                  )}
                </Typography>
              </Grid>

              <Grid item xs={12}>
                <Typography sx={userAvatarHeadlineSx} lineHeight={1.2}>
                  {getTimeAgo(createdAt)}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid item>
        <PostActions />
      </Grid>
    </Grid>
  );
};

export default PostHeader;
