import { Box, Theme } from "@mui/material";
import { SystemStyleObject } from "@mui/system";
import { useCallback, useEffect, useState } from "react";
import { useQuery } from "react-query";
import ViewOverlay from "../../../../components/ViewOverlay";
import { IOverlay } from "../../../../components/ViewOverlay/ViewOverlay";
import API_ENDPOINTS from "../../../../constants/api";
import AboutResourceProvider, {
  useAboutResourceContext,
} from "../../../../contexts/AboutResourceContext";
import { useAuthContext } from "../../../../contexts/AuthContext";
import useInfiniteLoading from "../../../../hooks/useInfiniteLoading";
import {
  ICommentApiResponseModel,
  IRelatedSource,
} from "../../../../interfaces/api/external";
import { getPostComments } from "../../../../utils/api";
import { transformUsersListToUserIdUserMap } from "../../../../utils/transformers";
import Comment from "../../../Comment";
import AddComment from "../../../Comment/CommentActivities/AddComment";

interface IPostOverlayProps extends IOverlay {
  replyFocused?: boolean;
}

const PostOverlay: React.FC<IPostOverlayProps> = ({
  replyFocused = false,
  showOverlay,
  onOverlayClose,
}) => {
  const { accessToken, authUser } = useAuthContext();
  const { id } = useAboutResourceContext();

  const [nextNotificationsSearchKey, setNextNotificationsSearchKey] =
    useState<Record<string, unknown>>();

  const [uptoDateComments, setUptoDateComments] = useState<
    ICommentApiResponseModel[]
  >([]);

  const [relatedSourcesMap, setRelatedSourcesMap] = useState<
    Record<string, IRelatedSource>
  >({});

  const {
    data: postsCommentsRes,
    refetch: triggerPostCommentsApi,
    isFetching: postCommentsFetching,
    status: postCommentsStatus,
    remove: clearpostCommentsQueryData,
  } = useQuery(
    `GET:${API_ENDPOINTS.GET_POST_COMMENTS.key}-${id}`,
    () =>
      getPostComments(
        accessToken as string,
        id,
        5,
        nextNotificationsSearchKey
          ? encodeURI(JSON.stringify(nextNotificationsSearchKey))
          : undefined
      ),
    { cacheTime: 0, refetchInterval: false, enabled: false }
  );

  const infiniteLoadCallback = useCallback(() => {
    if (uptoDateComments.length > 0 && nextNotificationsSearchKey) {
      if (authUser) {
        triggerPostCommentsApi();
      }
    }
  }, [
    authUser,
    nextNotificationsSearchKey,
    triggerPostCommentsApi,
    uptoDateComments,
  ]);

  const infiniteLoadRef = useInfiniteLoading(
    postCommentsFetching,
    infiniteLoadCallback
  );

  useEffect(() => {
    if (showOverlay) {
      triggerPostCommentsApi();
    }
  }, [triggerPostCommentsApi, showOverlay, clearpostCommentsQueryData]);

  useEffect(() => {
    if (!showOverlay) {
      setNextNotificationsSearchKey(undefined);
      setUptoDateComments([]);
      clearpostCommentsQueryData();
    }
  }, [clearpostCommentsQueryData, showOverlay]);

  useEffect(() => {
    if (postsCommentsRes?.data) {
      setUptoDateComments((prev) => [
        ...prev,
        ...(postsCommentsRes?.data?.comments || []),
      ]);
      setRelatedSourcesMap((prev) => {
        const sourcesMap = transformUsersListToUserIdUserMap(
          postsCommentsRes.data?.relatedSources || []
        ) as Record<string, IRelatedSource>;
        const updatedRelatedSourcesMap = {
          ...prev,
          ...sourcesMap,
        };
        return updatedRelatedSourcesMap;
      });

      setNextNotificationsSearchKey(
        postsCommentsRes.dDBPagination?.nextSearchStartFromKey
      );
    }
  }, [
    postsCommentsRes?.dDBPagination?.nextSearchStartFromKey,
    postsCommentsRes?.data,
  ]);

  if (postCommentsStatus === "loading") {
    return <></>;
  }

  return (
    <>
      <ViewOverlay showOverlay={showOverlay} onOverlayClose={onOverlayClose}>
        <Box sx={postOverlayContainerSx}>
          <Box sx={contentsContainerSx}>
            {uptoDateComments.map((comment, index) => (
              <Box
                key={comment.id}
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
                >
                  <Comment commentText={comment.contents[0].text} />
                </AboutResourceProvider>
              </Box>
            ))}
          </Box>

          <Box sx={addCommentx}>
            <AddComment isFocused={replyFocused} />
          </Box>
        </Box>
      </ViewOverlay>
    </>
  );
};

const postOverlayContainerSx = (theme: Theme): SystemStyleObject<Theme> => ({
  height: "100%",
  overflowY: "hidden",
});

const contentsContainerSx = (theme: Theme): SystemStyleObject<Theme> => ({
  height: "calc(100% - 100px - 16px)",
  overflowY: "auto",
  padding: 1.5,
  paddingBottom: 5,
});

const addCommentx = (theme: Theme): SystemStyleObject<Theme> => ({
  paddingY: 1.5,
});

export default PostOverlay;
