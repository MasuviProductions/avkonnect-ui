import { Box, Button } from "@mui/material";
import { useState } from "react";
import ResourceProvider, {
  useResourceContext,
} from "../../../../../contexts/ResourceContext";
import Comment from "../../../Comment";
import { IUseComments } from "../../../../../hooks/useComments";
import { LABELS } from "../../../../../constants/labels";
import SubComments from "./SubComments";

interface IPostCommentsProps {}
const PostComments: React.FC<IPostCommentsProps> = ({}) => {
  const { commentsQuery, allCommentsFetched } = useResourceContext();
  const [showReplyEditor, setShowReplyEditor] = useState(false);

  const {
    uptoDateComments,
    relatedSourcesMap,
    triggerGetCommentsApi,
    getCommentsFetching,
  } = commentsQuery as IUseComments;

  const handleClickLoadMore = () => {
    triggerGetCommentsApi();
  };

  const handleReplyClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setShowReplyEditor(true);
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
              onReplyClick={handleReplyClick}
            />
            <Box ml={5}>
              <SubComments promptyReply={showReplyEditor} />
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
          {LABELS.LOAD_MORE_COMMENTS}
        </Button>
      )}
    </>
  );
};

export default PostComments;
