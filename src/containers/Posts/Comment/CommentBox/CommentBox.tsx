import { Box, Link, Grid, Theme, Typography } from "@mui/material";
import { SystemStyleObject } from "@mui/system";
import { compile } from "path-to-regexp";
import { APP_ROUTES } from "../../../../constants/app";
import { LABELS } from "../../../../constants/labels";
import { useAuthContext } from "../../../../contexts/AuthContext";
import { useResourceContext } from "../../../../contexts/ResourceContext";
import { simpleLinkSx } from "../../../../styles/sx";
import { parseContentText } from "../../../../utils/component";
import { getTimeAgo } from "../../../../utils/generic";
import CommentActions from "./CommentActions";

interface ICommentBoxProps {
  commentText: string;
  commentMediaUrl?: string;
  isEdited?: boolean;
}

const CommentBox: React.FC<ICommentBoxProps> = ({
  commentText,
  commentMediaUrl,
  isEdited = false,
}) => {
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
  } = resourceContext;

  return (
    <>
      <Box sx={commentCardSx}>
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
                  {authUser?.id === userId && (
                    <Grid item>
                      <CommentActions />
                    </Grid>
                  )}
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid xs={12}>
            <Typography sx={avatarHeadlineSx}>{headline}</Typography>
          </Grid>
        </Grid>

        <Grid container>
          <Grid item sx={commentTextSx}>
            {parseContentText(commentText, relatedSourceMap)}
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

const commentCardSx = (theme: Theme): SystemStyleObject<Theme> => ({
  paddingY: 1,
  paddingX: 1.5,
  borderRadius: "0.4rem",
  backgroundColor: theme.palette.secondary.main,
});

const commentTextSx = (theme: Theme): SystemStyleObject<Theme> => ({
  fontSize: 14,
  color: theme.palette.text.primary,
});

const avatarHeadlineSx = (theme: Theme): SystemStyleObject<Theme> => ({
  cursor: "pointer",
  fontSize: 12,
  color: theme.palette.text.secondary,
});

const commentTimeSx = (theme: Theme): SystemStyleObject<Theme> => ({
  fontSize: 12,
  marginTop: 0.25,
  color: theme.palette.text.secondary,
});

export default CommentBox;
