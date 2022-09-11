import { Box, Grid } from "@mui/material";
import ResourceProvider, {
  useResourceContext,
} from "../../../../../contexts/ResourceContext";
import Comment from "../../../Comment/Comment";
import { IUseCommentsForResourceReturn } from "../../../../../hooks/useCommentsForResource";
import { IRelatedSource } from "../../../../../interfaces/api/external";
import { LABELS } from "../../../../../constants/labels";
import { useCallback } from "react";
import SpinLoader from "../../../../../components/SpinLoader";

interface ISubCommentsProps {
  onReplyClick: (
    event: React.MouseEvent<HTMLButtonElement>,
    withTaggedSource?: IRelatedSource
  ) => void;
}

// Note: Desktop specific component
const SubComments: React.FC<ISubCommentsProps> = ({ onReplyClick }) => {
  const resourceContext = useResourceContext();
  if (!resourceContext) {
    throw Error(LABELS.RESOURCE_CONTEXT_UNINITIALIZED);
  }

  const { commentsQuery } = resourceContext;

  const {
    uptoDateComments,
    relatedSourcesMap,
    infiniteLoadRef,
    getCommentsFetching,
  } = commentsQuery as IUseCommentsForResourceReturn;

  const handleReplyClickWithSourceTag = useCallback(
    (withTaggedSource?: IRelatedSource) =>
      (event: React.MouseEvent<HTMLButtonElement>) => {
        onReplyClick(event, withTaggedSource);
      },
    [onReplyClick]
  );

  return (
    <>
      <Box>
        {uptoDateComments.map((comment, index) => (
          <Box
            key={comment.id}
            ref={
              index === uptoDateComments.length - 1
                ? infiniteLoadRef
                : undefined
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
        {getCommentsFetching && (
          <Grid item xs={12}>
            <SpinLoader isLoading={getCommentsFetching} />
          </Grid>
        )}
      </Box>
    </>
  );
};

export default SubComments;
