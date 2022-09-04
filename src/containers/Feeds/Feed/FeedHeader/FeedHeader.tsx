import { Box, Grid, Avatar, Typography, SxProps, Theme } from "@mui/material";
import { useRouter } from "next/router";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
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
import { useAuthContext } from "../../../../contexts/AuthContext";
import { LABELS } from "../../../../constants/labels";

const FeedHeader: React.FC = () => {
  const router = useRouter();
  const resourceContext = useResourceContext();

  if (!resourceContext) {
    throw Error(LABELS.RESOURCE_CONTEXT_UNINITIALIZED);
  }
  const { relatedSourceMap, sourceId, createdAt } = resourceContext;
  const { authUser } = useAuthContext();

  const handleProfileRedirectClick = () => {
    router.push(compile(APP_ROUTES.PROFILE.route)({ id: sourceId }));
  };
  return (
    <Grid container p={1} spacing={2}>
      <Grid item xs mt={0.5}>
        <Grid container spacing={1}>
          <Grid item onClick={handleProfileRedirectClick}>
            <Avatar
              alt={relatedSourceMap[sourceId].name}
              src={relatedSourceMap[sourceId].displayPictureUrl}
              onClick={handleProfileRedirectClick}
              sx={userAvatarSx(usernameToColor(authUser?.name as string), 50)}
            />
          </Grid>

          <Grid item xs>
            <Grid container>
              <Grid item xs={12}>
                <Typography sx={simpleLinkSx()}>
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
        <MoreHorizIcon fontSize="large" sx={morePostOptionsSx} />
      </Grid>
    </Grid>
  );
};

const profileRedirectSx: SxProps<Theme> = {
  "&:hover": {
    cursor: "pointer",
  },
};

const morePostOptionsSx: SxProps<Theme> = (theme: Theme) => ({
  padding: "8px",
  fontSize: "42px",
  "&:hover": {
    cursor: "pointer",
    backgroundColor: theme.palette.background.default,
    borderRadius: "50%",
  },
});

export default FeedHeader;
