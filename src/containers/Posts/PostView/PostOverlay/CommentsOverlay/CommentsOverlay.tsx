import { Box, Grid, Theme } from "@mui/material";
import { SystemStyleObject } from "@mui/system";
import { useState, useEffect } from "react";
import ViewOverlay, {
  IOverlay,
} from "../../../../../components/ViewOverlay/ViewOverlay";
import { useResourceContext } from "../../../../../contexts/ResourceContext";
import Comment, { ICommentProps } from "../../../Comment";
import { IUseComments } from "../../../../../hooks/useComments";
import CommentEditor from "../../../CommentEditor";
import SubComments from "./SubComments";
import { IRelatedSource } from "../../../../../interfaces/api/external";
import { LABELS } from "../../../../../constants/labels";

interface ICommentsOverlayProps extends IOverlay, ICommentProps {}

// Warning: Handheld specific component
const CommentsOverlay: React.FC<ICommentsOverlayProps> = ({
  commentText,
  showOverlay,
  onOverlayClose,
}) => {
  const resourceContext = useResourceContext();
  if (!resourceContext) {
    throw Error(LABELS.RESOURCE_CONTEXT_UNINITIALIZED);
  }

  const { commentsQuery } = resourceContext;

  const [mentionedSource, setMentionedSource] = useState<
    IRelatedSource | undefined
  >();

  const { resetQueryData, triggerGetCommentsApi, getCommentsStatus } =
    commentsQuery as IUseComments;

  const handleCloseOverlay = () => {
    onOverlayClose?.();
  };

  const handleReplyClickWithUserTag = (
    event: React.MouseEvent<HTMLButtonElement>,
    withTaggedSource?: IRelatedSource
  ) => {
    if (withTaggedSource) {
      setMentionedSource(withTaggedSource);
    }
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
            <Comment commentText={commentText} onReplyClick={() => {}} />

            <Box ml={5}>
              <SubComments onReplyClick={handleReplyClickWithUserTag} />
            </Box>
          </Grid>
          <Grid xs={12} item sx={commentEditorSx}>
            <CommentEditor
              mentionedSource={mentionedSource}
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
