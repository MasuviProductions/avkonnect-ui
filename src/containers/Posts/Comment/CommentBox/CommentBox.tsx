import { Box, Link, Grid, Hidden, Theme, Typography } from "@mui/material";
import { SystemStyleObject } from "@mui/system";
import { compile } from "path-to-regexp";
import { APP_ROUTES } from "../../../../constants/app";
import { LABELS } from "../../../../constants/labels";
import { useAuthContext } from "../../../../contexts/AuthContext";
import { useResourceContext } from "../../../../contexts/ResourceContext";
import { simpleLinkSx, userAvatarHeadlineSx } from "../../../../styles/sx";
import { parseContentText } from "../../../../utils/component";
import DRAFTJS from "../../../../utils/draftjs";
import { getTimeAgo } from "../../../../utils/generic";
import EditComment from "../../CommentEditor/EditComment";
import CommentActions from "./CommentActions";

interface ICommentBoxProps {}

const CommentBox: React.FC<ICommentBoxProps> = ({}) => {
  const { authUser } = useAuthContext();
  const resourceContext = useResourceContext();

  if (!resourceContext) {
    throw Error(LABELS.RESOURCE_CONTEXT_UNINITIALIZED);
  }

  const {
    sourceInfo: { name, headline },
    createdAt,
    sourceId: userId,
    relatedSourceMap,
    content,
    updateResource,
    isBeingEdited,
    commentsQuery,
  } = resourceContext;

  const { patchCommentFetching } = commentsQuery!;

  return (
    <>
      <Box sx={commentCardSx(isBeingEdited, patchCommentFetching)}>
        <Grid container>
          <Grid item xs={12}>
            <Grid container justifyContent="space-between">
              <Grid item>
                <Link
                  href={compile(APP_ROUTES.PROFILE.route)({ id: userId })}
                  sx={simpleLinkSx()}
                >
                  {name}
                </Link>
              </Grid>

              <Grid item>
                <Grid container alignItems="center" spacing={2}>
                  <Grid item>
                    <Typography sx={commentTimeSx}>
                      {getTimeAgo(createdAt)}
                    </Typography>
                  </Grid>
                  {authUser?.id === userId && !isBeingEdited && (
                    <Grid item>
                      <CommentActions />
                    </Grid>
                  )}
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Typography sx={userAvatarHeadlineSx}>{headline}</Typography>
          </Grid>
        </Grid>

        <Grid container>
          <Hidden mdDown>
            {!isBeingEdited ? (
              <Grid item sx={commentTextSx}>
                {parseContentText(content.text, relatedSourceMap)}
              </Grid>
            ) : (
              <>
                <EditComment
                  initialContentState={DRAFTJS.utils.getContentStateFromStringifiedRawContentState(
                    content.stringifiedRawContent
                  )}
                />
              </>
            )}
          </Hidden>

          <Hidden mdUp>
            <Grid item sx={commentTextSx}>
              {parseContentText(content.text, relatedSourceMap)}
            </Grid>
          </Hidden>
        </Grid>
      </Box>

      <Hidden mdUp>
        {isBeingEdited && (
          <Box sx={commentEditorSx}>
            <EditComment
              initialContentState={DRAFTJS.utils.getContentStateFromStringifiedRawContentState(
                content.stringifiedRawContent
              )}
            />
          </Box>
        )}
      </Hidden>
    </>
  );
};

const commentCardSx =
  (isBeingEdited: boolean, loading: boolean) =>
  (theme: Theme): SystemStyleObject<Theme> => ({
    paddingY: 1,
    paddingX: 1.5,
    borderRadius: "0.4rem",
    backgroundColor: theme.palette.secondary.main,
    opacity: loading ? "0.5" : "1",
    [theme.breakpoints.down("md")]: {
      opacity: isBeingEdited ? "0.5" : undefined,
    },
  });

const commentEditorSx = (theme: Theme): SystemStyleObject<Theme> => ({
  position: "fixed",
  width: "100%",
  bottom: 0,
  left: 0,
  padding: 1,
  zIndex: 100,
  backgroundColor: theme.palette.background.paper,
  opacity: 1,
});

const commentTextSx = (theme: Theme): SystemStyleObject<Theme> => ({
  fontSize: 14,
  color: theme.palette.text.primary,
  wordBreak: "break-word",
});

const commentTimeSx = (theme: Theme): SystemStyleObject<Theme> => ({
  fontSize: 12,
  marginTop: 0.25,
  color: theme.palette.text.secondary,
});

export default CommentBox;
