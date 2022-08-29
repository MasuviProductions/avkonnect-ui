import { Box, Button } from "@mui/material";
import { useEffect, useState } from "react";
import ResourceProvider, {
  useResourceContext,
} from "../../../../../contexts/ResourceContext";
import Comment from "../../../Comment";
import { IUseComments } from "../../../../../hooks/useComments";
import { LABELS } from "../../../../../constants/labels";
import SubComments from "./SubComments";
import CommentEditor from "../../../CommentEditor";
import { IRelatedSource } from "../../../../../interfaces/api/external";

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
      setMentionedSource(withTaggedSource);
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
                  submitButtonText={LABELS.REPLY}
                  mentionedSource={mentionedSource}
                />
              )}
            </Box>
          </ResourceProvider>
        </Box>
      ))}

      {getCommentsFetching ? (
        <>Loading..</>
      ) : allCommentsFetched ? (
        <></>
      ) : (
        <Button onClick={handleClickLoadMore}>
          {LABELS.LOAD_MORE_COMMENTS} {uptoDateComments.length}-
          {commentsCount.comment}
        </Button>
      )}
    </>
  );
};

export default PostComments;
