import { Box } from "@mui/material";
import { useState } from "react";
import Comment from "../../../Comment";
import ResourceProvider, {
  useResourceContext,
} from "../../../../../contexts/ResourceContext";
import { IUseCommentsForResourceReturn } from "../../../../../hooks/useCommentsForResource";
import CommentsOverlay from "../CommentsOverlay";
import { ICommentApiModel } from "../../../../../interfaces/api/external";
import { LABELS } from "../../../../../constants/labels";

const PostComments: React.FC = () => {
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

  const { uptoDateComments, relatedSourcesMap, infiniteLoadRef } =
    commentsQuery as IUseCommentsForResourceReturn;

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
            <Comment
              commentText={comment.contents[0].text}
              onReplyClick={handleReplyClick(comment)}
            />
          </ResourceProvider>
        </Box>
      ))}

      {commentOverlayComment && (
        <ResourceProvider
          id={commentOverlayComment.id}
          type="comment"
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
            commentText={commentOverlayComment.contents[0].text}
            showOverlay={showCommentsOverlay}
            onOverlayClose={handleOverlayClose}
          />
        </ResourceProvider>
      )}
    </>
  );
};

export default PostComments;
