import { Box, Typography } from "@mui/material";
import { useState } from "react";
import ResourceProvider, {
  useResourceContext,
} from "../../../../../contexts/ResourceContext";
import Comment from "../../../Comment";
import { IUseCommentsForResourceReturn } from "../../../../../hooks/useCommentsForResource";
import { LABELS } from "../../../../../constants/labels";
import SubComments from "./SubComments";
import { IRelatedSource } from "../../../../../interfaces/api/external";
import { coloredLinkSx } from "../../../../../styles/sx";
import DRAFTJS from "../../../../../utils/draftjs";
import { ContentState } from "draft-js";
import AddComment from "../../../CommentEditor/AddComment";

interface IPostCommentsProps {}
const PostComments: React.FC<IPostCommentsProps> = ({}) => {
  const resourceContext = useResourceContext();
  if (!resourceContext) {
    throw Error(LABELS.RESOURCE_CONTEXT_UNINITIALIZED);
  }

  const { commentsQuery, allCommentsFetched, commentsCount } = resourceContext;
  const [replyEditorCommentId, setReplyEditorCommentId] = useState<
    string | undefined
  >();

  const [contentState, setContentState] = useState<ContentState>(
    DRAFTJS.utils.getNewContentState()
  );

  const {
    uptoDateComments,
    relatedSourcesMap,
    triggerGetCommentsApi,
    getCommentsFetching,
  } = commentsQuery as IUseCommentsForResourceReturn;

  const handleClickLoadMore = () => {
    triggerGetCommentsApi();
  };

  const handleReplyClickWithSourceTag =
    (commentId: string) =>
    (
      event: React.MouseEvent<HTMLButtonElement>,
      withTaggedSource?: IRelatedSource
    ) => {
      const newContentState =
        DRAFTJS.utils.getNewContentState(withTaggedSource);
      setContentState(newContentState);
      setReplyEditorCommentId(commentId);
    };

  return (
    <>
      {uptoDateComments.map((comment) => (
        <Box key={comment.id}>
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
            key={`comment-${comment.id}`}
          >
            <Comment onReplyClick={handleReplyClickWithSourceTag(comment.id)} />
            <Box ml={5}>
              <SubComments
                onReplyClick={handleReplyClickWithSourceTag(comment.id)}
              />

              {replyEditorCommentId === comment.id && (
                <AddComment
                  key={`comment-editor-${comment.id}`}
                  submitButtonText={LABELS.REPLY}
                  initialContentState={contentState}
                />
              )}
            </Box>
          </ResourceProvider>
        </Box>
      ))}

      {getCommentsFetching ? (
        <>....</>
      ) : allCommentsFetched ? (
        <></>
      ) : (
        <Box px={1} pb={1}>
          <Typography
            paragraph
            onClick={handleClickLoadMore}
            sx={coloredLinkSx(14)}
          >
            {LABELS.VIEW_MORE_COMMENTS}
          </Typography>
        </Box>
      )}
    </>
  );
};

export default PostComments;
