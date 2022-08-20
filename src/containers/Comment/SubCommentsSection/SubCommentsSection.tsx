import { Box, Typography } from "@mui/material";
import ResourceProvider, {
  useResourceContext,
} from "../../../contexts/ResourceContext";
import Comment from "../Comment";
import { IUseComments } from "../../../hooks/useComments";
import { ICommentApiResponseModel } from "../../../interfaces/api/external";
import { LABELS } from "../../../constants/labels";
import { decoratedLinkSx } from "../../../styles/sx";

interface ISubCommentsSectionProps {
  initialCommentsFeed: ICommentApiResponseModel[];
  onReplyChainEnd?: (tagUser: string) => void;
  onSubCommentFieldBlur?: () => void;
}

// Warning: Desktop specific component
const SubCommentsSection: React.FC<ISubCommentsSectionProps> = ({
  initialCommentsFeed,
  onReplyChainEnd,
  onSubCommentFieldBlur,
}) => {
  const { commentsQuery, allCommentsFetched } = useResourceContext();

  const {
    uptoDateComments,
    relatedSourcesMap,
    resetQueryData,
    triggerGetCommentsApi,
    getCommentsStatus,
    getCommentsFetching,
  } = commentsQuery as IUseComments;

  const handleClickLoadMore = () => {
    triggerGetCommentsApi();
  };

  return (
    <>
      <Box>
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
                onReplyChainEnd={onReplyChainEnd}
                onSubCommentFieldBlur={onSubCommentFieldBlur}
              />
            </ResourceProvider>
          </Box>
        ))}

        {getCommentsFetching ? (
          <>Loading..</>
        ) : allCommentsFetched ? (
          <></>
        ) : (
          <Box px={1} pb={1}>
            <Typography
              paragraph
              onClick={handleClickLoadMore}
              sx={decoratedLinkSx(12)}
            >
              {LABELS.LOAD_MORE_REPLIES}
            </Typography>
          </Box>
        )}
      </Box>
    </>
  );
};

export default SubCommentsSection;
