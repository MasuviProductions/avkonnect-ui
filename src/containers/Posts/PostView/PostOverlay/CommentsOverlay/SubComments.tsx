import { Box } from "@mui/material";
import ResourceProvider, {
  useResourceContext,
} from "../../../../../contexts/ResourceContext";
import Comment from "../../../Comment/Comment";
import { IUseComments } from "../../../../../hooks/useComments";
import { IRelatedSource } from "../../../../../interfaces/api/external";
import { LABELS } from "../../../../../constants/labels";

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

  const { commentsQuery } = resourceContext;

  const {
    uptoDateComments,
    relatedSourcesMap,

    infiniteLoadRef,
  } = commentsQuery as IUseComments;

  const handleReplyClickWithSourceTag =
    (withTaggedSource?: IRelatedSource) =>
    (event: React.MouseEvent<HTMLButtonElement>) => {
      onReplyClick(event, withTaggedSource);
    };

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
                onReplyClick={handleReplyClickWithSourceTag(
                  relatedSourcesMap[comment.sourceId]
                )}
              />
            </ResourceProvider>
          </Box>
        ))}
      </Box>
    </>
  );
};

export default SubComments;
