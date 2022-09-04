import { Box, Typography } from "@mui/material";
import ResourceProvider, {
  useResourceContext,
} from "../../../../../contexts/ResourceContext";
import Comment from "../../../Comment";
import { IUseCommentsForResourceReturn } from "../../../../../hooks/useCommentsForResource";
import { IRelatedSource } from "../../../../../interfaces/api/external";
import { LABELS } from "../../../../../constants/labels";
import { coloredLinkSx } from "../../../../../styles/sx";

interface ISubCommentsProps {
  onReplyClick: (
    event: React.MouseEvent<HTMLButtonElement>,
    withTaggedSource?: IRelatedSource
  ) => void;
}

// Warning: Desktop specific component
const SubComments: React.FC<ISubCommentsProps> = ({ onReplyClick }) => {
  const resourceContext = useResourceContext();
  if (!resourceContext) {
    throw Error(LABELS.RESOURCE_CONTEXT_UNINITIALIZED);
  }

  const { commentsQuery, allCommentsFetched } = resourceContext;

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
    (withTaggedSource?: IRelatedSource) =>
    (event: React.MouseEvent<HTMLButtonElement>) => {
      onReplyClick(event, withTaggedSource);
    };

  return (
    <>
      <Box>
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
              <Comment
                onReplyClick={handleReplyClickWithSourceTag(
                  relatedSourcesMap[comment.sourceId]
                )}
              />
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
              sx={coloredLinkSx(12)}
            >
              {uptoDateComments.length === 0
                ? LABELS.VIEW_REPLIES
                : LABELS.LOAD_MORE_REPLIES}
            </Typography>
          </Box>
        )}
      </Box>
    </>
  );
};

export default SubComments;
