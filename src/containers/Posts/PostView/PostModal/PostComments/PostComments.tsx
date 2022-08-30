import { Box, Typography } from "@mui/material";
import { useState } from "react";
import ResourceProvider, {
  useResourceContext,
} from "../../../../../contexts/ResourceContext";
import Comment from "../../../Comment";
import { IUseComments } from "../../../../../hooks/useComments";
import { LABELS } from "../../../../../constants/labels";
import SubComments from "./SubComments";
import CommentEditor from "../../../CommentEditor";
import { IRelatedSource } from "../../../../../interfaces/api/external";
import { decoratedLinkSx } from "../../../../../styles/sx";

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

  const [mentionedSource, setMentionedSource] = useState<
    IRelatedSource | undefined
  >();

  const {
    uptoDateComments,
    relatedSourcesMap,
    triggerGetCommentsApi,
    getCommentsFetching,
  } = commentsQuery as IUseComments;

  const handleClickLoadMore = () => {
    triggerGetCommentsApi();
  };

  const handleReplyClickWithSourceTag =
    (commentId: string) =>
    (
      event: React.MouseEvent<HTMLButtonElement>,
      withTaggedSource?: IRelatedSource
    ) => {
      setMentionedSource(
        withTaggedSource ? { ...withTaggedSource } : undefined
      );
      setReplyEditorCommentId(commentId);
    };

  return (
    <>
      {uptoDateComments.map((comment) => (
        <Box key={comment.id}>
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
            key={`comment-${comment.id}`}
          >
            <Comment
              commentText={comment.contents[0].text}
              onReplyClick={handleReplyClickWithSourceTag(comment.id)}
            />
            <Box ml={5}>
              <SubComments
                onReplyClick={handleReplyClickWithSourceTag(comment.id)}
              />

              {replyEditorCommentId === comment.id && (
                <CommentEditor
                  key={`comment-editor-${comment.id}`}
                  submitButtonText={LABELS.REPLY}
                  mentionedSource={mentionedSource}
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
            sx={decoratedLinkSx(14)}
          >
            {LABELS.VIEW_MORE_COMMENTS}
          </Typography>
        </Box>
      )}
    </>
  );
};

export default PostComments;
