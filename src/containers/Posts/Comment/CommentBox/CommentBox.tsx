import { Box, Link, Grid, Hidden, Theme, Typography } from "@mui/material";
import { SystemStyleObject } from "@mui/system";
import { ContentState } from "draft-js";
import { compile } from "path-to-regexp";
import { useState, useEffect } from "react";
import { APP_ROUTES } from "../../../../constants/app";
import { LABELS } from "../../../../constants/labels";
import { useAuthContext } from "../../../../contexts/AuthContext";
import { useResourceContext } from "../../../../contexts/ResourceContext";
import { simpleLinkSx, userAvatarHeadlineSx } from "../../../../styles/sx";
import { parseContentText } from "../../../../utils/component";
import DRAFTJS from "../../../../utils/draftjs";
import { getTimeAgo } from "../../../../utils/generic";
import CommentEditor from "../../CommentEditor";
import CommentActions from "./CommentActions";

interface ICommentBoxProps {
  commentMediaUrl?: string;
  isEdited?: boolean;
}

const CommentBox: React.FC<ICommentBoxProps> = ({
  commentMediaUrl,
  isEdited = false,
}) => {
  const { authUser } = useAuthContext();
  const resourceContext = useResourceContext();
  const [isEditMode, setIsEditMode] = useState<boolean>(false);

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
  } = resourceContext;

  const handleEditModeOpen = () => {
    setIsEditMode(true);
  };

  const handleEditModeClose = () => {
    setIsEditMode(false);
  };

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
                  {authUser?.id === userId && !isEditMode && (
                    <Grid item>
                      <CommentActions onEditClick={handleEditModeOpen} />
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
            {!isEditMode ? (
              <Grid item sx={commentTextSx}>
                {parseContentText(content.text, relatedSourceMap)}
              </Grid>
            ) : (
              <>
                <CommentEditor
                  type="edit"
                  initialContentState={DRAFTJS.utils.getContentStateFromStringifiedRawContentState(
                    content.stringifiedRawContent
                  )}
                  onClickCancel={handleEditModeClose}
                  onClickSave={handleEditModeClose}
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
  wordBreak: "break-word",
});

const commentTimeSx = (theme: Theme): SystemStyleObject<Theme> => ({
  fontSize: 12,
  marginTop: 0.25,
  color: theme.palette.text.secondary,
});

export default CommentBox;
