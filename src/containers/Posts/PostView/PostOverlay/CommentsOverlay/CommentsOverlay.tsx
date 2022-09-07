import { Box, Grid, Theme } from "@mui/material";
import { SystemStyleObject } from "@mui/system";
import { useState, useEffect } from "react";
import ViewOverlay, {
  IOverlay,
} from "../../../../../components/ViewOverlay/ViewOverlay";
import { useResourceContext } from "../../../../../contexts/ResourceContext";
import Comment, { ICommentProps } from "../../../Comment";
import { IUseCommentsForResourceReturn } from "../../../../../hooks/useCommentsForResource";
import SubComments from "./SubComments";
import { IRelatedSource } from "../../../../../interfaces/api/external";
import { LABELS } from "../../../../../constants/labels";
import DRAFTJS from "../../../../../utils/draftjs";
import { ContentState } from "draft-js";
import AddComment from "../../../CommentEditor/AddComment";

interface ICommentsOverlayProps extends IOverlay, ICommentProps {
  initialContentState: ContentState;
}

// Warning: Handheld specific component
const CommentsOverlay: React.FC<ICommentsOverlayProps> = ({
  initialContentState,
  showOverlay,
  onOverlayClose,
}) => {
  const resourceContext = useResourceContext();
  if (!resourceContext) {
    throw Error(LABELS.RESOURCE_CONTEXT_UNINITIALIZED);
  }

  const { commentsQuery } = resourceContext;

  const [contentState, setContentState] = useState<ContentState>(
    DRAFTJS.utils.getNewContentState()
  );

  const { resetQueryData, triggerGetCommentsApi, getCommentsStatus } =
    commentsQuery as IUseCommentsForResourceReturn;

  const handleCloseOverlay = () => {
    onOverlayClose?.();
  };

  const handleReplyClickWithUserTag = (
    event: React.MouseEvent<HTMLButtonElement>,
    withTaggedSource?: IRelatedSource
  ) => {
    const newContentState = DRAFTJS.utils.getNewContentState(withTaggedSource);
    setContentState(newContentState);
  };

  useEffect(() => {
    if (showOverlay) {
      triggerGetCommentsApi();
    }
  }, [showOverlay, triggerGetCommentsApi]);

  useEffect(() => {
    if (!showOverlay) {
      resetQueryData();
    }
  }, [resetQueryData, showOverlay]);

  useEffect(() => {
    if (initialContentState) {
      setContentState(initialContentState);
    }
  }, [initialContentState]);

  if (getCommentsStatus === "loading") {
    return <></>;
  }

  return (
    <>
      <ViewOverlay
        showOverlay={showOverlay}
        onOverlayClose={handleCloseOverlay}
      >
        <Grid container sx={commentOverlayContainerSx}>
          <Grid item xs={12} sx={contentsContainerSx}>
            <Comment onReplyClick={handleReplyClickWithUserTag} />

            <Box ml={5}>
              <SubComments onReplyClick={handleReplyClickWithUserTag} />
            </Box>
          </Grid>

          <Grid xs={12} item sx={commentEditorSx}>
            <AddComment
              initialContentState={contentState}
              submitButtonText={LABELS.REPLY}
            />
          </Grid>
        </Grid>
      </ViewOverlay>
    </>
  );
};

const commentOverlayContainerSx = (
  theme: Theme
): SystemStyleObject<Theme> => ({});

const contentsContainerSx = (theme: Theme): SystemStyleObject<Theme> => ({
  overflowY: "auto",
  padding: 1.5,
  paddingBottom: 30,
});

const commentEditorSx = (theme: Theme): SystemStyleObject<Theme> => ({
  position: "fixed",
  width: "100%",
  bottom: 0,
  padding: 1,
  backgroundColor: theme.palette.background.paper,
});

export default CommentsOverlay;
