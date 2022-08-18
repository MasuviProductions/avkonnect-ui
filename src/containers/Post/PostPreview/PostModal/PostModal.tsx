import { Box, Button, Grid } from "@mui/material";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import ViewOverlay from "../../../../components/ViewOverlay";
import API_ENDPOINTS from "../../../../constants/api";
import AboutResourceProvider, {
  useAboutResourceContext,
} from "../../../../contexts/AboutResourceContext";
import { useAuthContext } from "../../../../contexts/AuthContext";
import { getPostComments } from "../../../../utils/api";
import Comment from "../../../Comment";
import ModalLayout from "../../../../components/ModalLayout";
import { IModalLayoutProps } from "../../../../components/ModalLayout/ModalLayout";
import {
  ICommentApiResponseModel,
  IRelatedSource,
} from "../../../../interfaces/api/external";
import { transformUsersListToUserIdUserMap } from "../../../../utils/transformers";

interface IPostModalProps extends IModalLayoutProps {}
const PostModal: React.FC<IPostModalProps> = ({ showModal, onModalClose }) => {
  const { accessToken } = useAuthContext();
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
        2,
        nextNotificationsSearchKey
          ? encodeURI(JSON.stringify(nextNotificationsSearchKey))
          : undefined
      ),
    { cacheTime: 0, refetchInterval: false, enabled: false }
  );

  const handleClickLoadMore = () => {
    triggerPostCommentsApi();
  };

  useEffect(() => {
    if (showModal) {
      triggerPostCommentsApi();
    }
  }, [showModal, triggerPostCommentsApi]);

  useEffect(() => {
    if (!showModal) {
      setNextNotificationsSearchKey(undefined);
      setUptoDateComments([]);
      clearpostCommentsQueryData();
    }
  }, [clearpostCommentsQueryData, showModal]);

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

  return (
    <>
      <ModalLayout showModal={showModal} onModalClose={onModalClose}>
        <Grid container>
          <Grid item xs={12} md={6}>
            POST
          </Grid>

          <Grid item xs={12} md={6}>
            {uptoDateComments.map((comment) => (
              <Box key={comment.id}>
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
                  <Comment commentText={comment.contents[0].text} />
                </AboutResourceProvider>
              </Box>
            ))}

            {nextNotificationsSearchKey && (
              <Button onClick={handleClickLoadMore}>Load more..</Button>
            )}
          </Grid>
        </Grid>
      </ModalLayout>
    </>
  );
};

export default PostModal;
