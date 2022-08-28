import { Box } from "@mui/material";
import { useState } from "react";
import Comment from "../../../Comment";
import ResourceProvider, {
  useResourceContext,
} from "../../../../../contexts/ResourceContext";
import { IUseComments } from "../../../../../hooks/useComments";
import CommentsOverlay from "../CommentsOverlay";
import { ICommentApiResponseModel } from "../../../../../interfaces/api/external";

const PostComments: React.FC = () => {
  const { commentsQuery } = useResourceContext();

  const [showCommentsOverlay, setShowCommentsOverlay] =
    useState<boolean>(false);

  const [commentOverlayComment, setCommentOverlayComment] = useState<
    ICommentApiResponseModel | undefined
  >();

  const { uptoDateComments, relatedSourcesMap, infiniteLoadRef } =
    commentsQuery as IUseComments;

  const handleOverlayOpen = () => {
    setShowCommentsOverlay(true);
  };

  const handleReplyClick =
    (_comment: ICommentApiResponseModel) =>
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
