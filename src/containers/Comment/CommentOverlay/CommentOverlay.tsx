import { Box } from "@mui/material";
import { useState, useEffect, useCallback } from "react";
import { useQuery } from "react-query";
import ViewOverlay, {
  IOverlay,
} from "../../../components/ViewOverlay/ViewOverlay";
import API_ENDPOINTS from "../../../constants/api";
import AboutResourceProvider, {
  useAboutResourceContext,
} from "../../../contexts/AboutResourceContext";
import { useAuthContext } from "../../../contexts/AuthContext";
import useInfiniteLoading from "../../../hooks/useInfiniteLoading";
import {
  ICommentApiResponseModel,
  IRelatedSource,
} from "../../../interfaces/api/external";
import { getCommentsComments } from "../../../utils/api";
import { transformUsersListToUserIdUserMap } from "../../../utils/transformers";
import Comment, { IComment } from "../Comment";
import AddComment from "../CommentActivities/AddComment";

interface CommentOverlay extends IOverlay, IComment {}

const CommentOverlay: React.FC<CommentOverlay> = ({
  commentText,
  showOverlay,
  onOverlayClose,
  replyFocused = false,
}) => {
  const { accessToken, authUser } = useAuthContext();
  const { id } = useAboutResourceContext();

  const [promptReply, setPromptReply] = useState<boolean>(replyFocused);

  const [commentInputFeed, setCommentInputfeed] = useState<string>("");

  useEffect(() => {
    setPromptReply(replyFocused);
  }, [replyFocused]);

  useEffect(() => {
    setCommentInputfeed("");
  }, [replyFocused]);

  const [nextNotificationsSearchKey, setNextNotificationsSearchKey] =
    useState<Record<string, unknown>>();

  const [uptoDateComments, setUptoDateComments] = useState<
    ICommentApiResponseModel[]
  >([]);

  const [relatedSourcesMap, setRelatedSourcesMap] = useState<
    Record<string, IRelatedSource>
  >({});

  const {
    data: commentCommentsResData,
    refetch: triggerCommentCommentsApi,
    status: commentCommentsStatus,
    isFetching: commentCommentsFetching,
    remove: clearCommentCommentsQueryData,
  } = useQuery(
    `GET:${API_ENDPOINTS.GET_COMMENTS_COMMENTS.key}-${id}`,
    () =>
      getCommentsComments(
        accessToken as string,
        id,
        5,
        nextNotificationsSearchKey
          ? encodeURI(JSON.stringify(nextNotificationsSearchKey))
          : undefined
      ),
    { cacheTime: 0, refetchInterval: false, enabled: showOverlay }
  );

  const infiniteLoadCallback = useCallback(() => {
    if (uptoDateComments.length > 0 && nextNotificationsSearchKey) {
      if (authUser) {
        triggerCommentCommentsApi();
      }
    }
  }, [
    authUser,
    nextNotificationsSearchKey,
    triggerCommentCommentsApi,
    uptoDateComments,
  ]);

  const infiniteLoadRef = useInfiniteLoading(
    commentCommentsFetching,
    infiniteLoadCallback
  );

  const handleOnReplyChainEnd = (tagUser: string) => {
    setPromptReply(true);
    setCommentInputfeed(tagUser);
  };

  const handleCommentFieldBlur = () => {
    setPromptReply(false);
  };

  const handleCloseOverlay = () => {
    setCommentInputfeed("");
    setPromptReply(false);
    onOverlayClose?.();
  };

  useEffect(() => {
    if (showOverlay) {
      triggerCommentCommentsApi();
    }
  }, [triggerCommentCommentsApi, showOverlay, clearCommentCommentsQueryData]);

  useEffect(() => {
    if (!showOverlay) {
      setNextNotificationsSearchKey(undefined);
      setUptoDateComments([]);
      clearCommentCommentsQueryData();
    }
  }, [clearCommentCommentsQueryData, showOverlay]);

  useEffect(() => {
    if (commentCommentsResData?.data) {
      setRelatedSourcesMap((prev) => {
        const sourcesMap = transformUsersListToUserIdUserMap(
          commentCommentsResData.data?.relatedSources || []
        ) as Record<string, IRelatedSource>;
        const updatedRelatedSourcesMap = {
          ...prev,
          ...sourcesMap,
        };
        return updatedRelatedSourcesMap;
      });

      setUptoDateComments((prev) => [
        ...prev,
        ...(commentCommentsResData?.data?.comments || []),
      ]);

      setNextNotificationsSearchKey(
        commentCommentsResData.dDBPagination?.nextSearchStartFromKey
      );
    }
  }, [
    commentCommentsResData?.dDBPagination?.nextSearchStartFromKey,
    commentCommentsResData?.data,
  ]);

  if (commentCommentsStatus === "loading") {
    return <></>;
  }

  return (
    <>
      <ViewOverlay
        showOverlay={showOverlay}
        onOverlayClose={handleCloseOverlay}
      >
        <Comment
          commentText={commentText}
          preventSubsequentOverlay
          replyFocused={promptReply}
          onReplyChainEnd={handleOnReplyChainEnd}
        />
        {uptoDateComments.map((comment, index) => (
          <Box
            key={comment.id}
            ml={5}
            ref={
              index === uptoDateComments.length - 1
                ? infiniteLoadRef
                : undefined
            }
          >
            <AboutResourceProvider
              id={comment.id}
              type="comment"
              sourceId={comment.sourceId}
              sourceType={comment.sourceType}
              resourceId={comment.resourceId}
              resourceType={comment.resourceType}
              reactionsCount={comment.activity.reactionsCount}
              commentsCount={comment.activity.commentsCount}
              relatedSourceMap={relatedSourcesMap}
              createdAt={comment.createdAt}
              userReaction={comment.sourceActivity?.reaction}
              key={`comment-${comment.id}`}
            >
              <Comment
                commentText={comment.contents[0].text}
                preventSubsequentOverlay
                onReplyChainEnd={handleOnReplyChainEnd}
              />
            </AboutResourceProvider>
          </Box>
        ))}
        <AddComment
          isFocused={promptReply}
          inputFeed={commentInputFeed}
          onCommentFieldBlur={handleCommentFieldBlur}
        />
      </ViewOverlay>
    </>
  );
};

export default CommentOverlay;
