import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";

import ResourceProvider, {
  useResourceContext,
} from "../../../../../contexts/ResourceContext";
import Comment from "../../../Comment";
import { IUseComments } from "../../../../../hooks/useComments";
import { IRelatedSource } from "../../../../../interfaces/api/external";
import { LABELS } from "../../../../../constants/labels";
import { decoratedLinkSx } from "../../../../../styles/sx";
import CommentEditor from "../../../CommentEditor";

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
  } = commentsQuery as IUseComments;

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
