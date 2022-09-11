import { Box, Grid } from "@mui/material";
import { useCallback, useState } from "react";
import { ContentState } from "draft-js";
import Comment from "../../../Comment";
import ResourceProvider, {
  useResourceContext,
} from "../../../../../contexts/ResourceContext";
import { IUseCommentsForResourceReturn } from "../../../../../hooks/useCommentsForResource";
import CommentsOverlay from "../CommentsOverlay";
import { ICommentApiModel } from "../../../../../interfaces/api/external";
import { LABELS } from "../../../../../constants/labels";
import DRAFTJS from "../../../../../utils/draftjs";
import SpinLoader from "../../../../../components/SpinLoader";

interface IPostCommentsProps {}

const PostComments: React.FC<IPostCommentsProps> = ({}) => {
  const resourceContext = useResourceContext();
  if (!resourceContext) {
    throw Error(LABELS.RESOURCE_CONTEXT_UNINITIALIZED);
  }

  const { commentsQuery } = resourceContext;

  const [showCommentsOverlay, setShowCommentsOverlay] =
    useState<boolean>(false);

  const [commentOverlayComment, setCommentOverlayComment] = useState<
    ICommentApiModel | undefined
  >();

  const [contentState, setContentState] = useState<ContentState>(
    DRAFTJS.utils.getNewContentState()
  );

  const {
    uptoDateComments,
    relatedSourcesMap,
    infiniteLoadRef,
    getCommentsFetching,
  } = commentsQuery as IUseCommentsForResourceReturn;

  const handleOverlayOpen = () => {
    setShowCommentsOverlay(true);
  };

  const handleReplyClick =
    (_comment: ICommentApiModel) =>
    (event: React.MouseEvent<HTMLButtonElement>) => {
      setCommentOverlayComment(_comment);
      handleOverlayOpen();
    };

  const handleOverlayClose = () => {
    setShowCommentsOverlay(false);
  };

  return (
    <>
      {uptoDateComments.map((comment, index) => (
        <Box
          key={comment.id}
          ref={
            index === uptoDateComments.length - 1 ? infiniteLoadRef : undefined
          }
        >
          <ResourceProvider
            id={comment.id}
            type="comment"
            content={comment.contents.slice(-1)[0]}
            sourceId={comment.sourceId}
            sourceType={comment.sourceType}
            resourceId={comment.resourceId}
            resourceType={comment.resourceType}
            reactionsCount={comment.activity.reactionsCount}
            commentsCount={comment.activity.commentsCount}
            loadedComments={[]}
            relatedSourceMap={relatedSourcesMap}
            createdAt={comment.createdAt}
            userReaction={comment.sourceActivity?.reaction}
          >
            <Comment onReplyClick={handleReplyClick(comment)} />
          </ResourceProvider>
        </Box>
      ))}

      {commentOverlayComment && (
        <ResourceProvider
          id={commentOverlayComment.id}
          type="comment"
          content={commentOverlayComment.contents.slice(-1)[0]}
          sourceId={commentOverlayComment.sourceId}
          sourceType={commentOverlayComment.sourceType}
          resourceId={commentOverlayComment.resourceId}
          resourceType={commentOverlayComment.resourceType}
          reactionsCount={commentOverlayComment.activity.reactionsCount}
          commentsCount={commentOverlayComment.activity.commentsCount}
          loadedComments={[]}
          relatedSourceMap={relatedSourcesMap}
          createdAt={commentOverlayComment.createdAt}
          userReaction={commentOverlayComment.sourceActivity?.reaction}
        >
          <CommentsOverlay
            initialContentState={contentState}
            showOverlay={showCommentsOverlay}
            onOverlayClose={handleOverlayClose}
          />
        </ResourceProvider>
      )}
      {getCommentsFetching && (
        <Grid item xs={12}>
          <SpinLoader isLoading={getCommentsFetching} />
        </Grid>
      )}
    </>
  );
};

export default PostComments;
