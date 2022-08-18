import { Box } from "@mui/material";
import { useState } from "react";
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

interface IPostModalProps extends IModalLayoutProps {}
const PostModal: React.FC<IPostModalProps> = ({ showModal, onModalClose }) => {
  const { accessToken } = useAuthContext();
  const { id } = useAboutResourceContext();

  // const { data: postsCommentsRes } = useQuery(
  //   `GET:${API_ENDPOINTS.GET_POST_COMMENTS.key}-${id}`,
  //   () => getPostComments(accessToken as string, id),
  //   { cacheTime: 0, refetchInterval: false }
  // );

  return (
    <>
      <ModalLayout showModal={showModal} onModalClose={onModalClose}>
        {/* {postsCommentsRes?.data?.comments.map((comment) => (
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
              relatedSources={postsCommentsRes.data?.relatedSources || []}
              createdAt={comment.createdAt}
              userReaction={comment.sourceActivity?.reaction}
              key={`comment-${comment.id}`}
            >
              <Comment commentText={comment.contents[0].text} />
            </AboutResourceProvider>
          </Box>
        ))} */}
      </ModalLayout>
    </>
  );
};

export default PostModal;
