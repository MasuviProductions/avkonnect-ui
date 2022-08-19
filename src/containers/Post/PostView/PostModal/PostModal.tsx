import { Box, Button, Theme } from "@mui/material";
import { SystemStyleObject } from "@mui/system";
import { useEffect } from "react";
import AboutResourceProvider, {
  useAboutResourceContext,
} from "../../../../contexts/AboutResourceContext";
import { useAuthContext } from "../../../../contexts/AuthContext";
import Comment from "../../../Comment";
import ModalLayout from "../../../../components/ModalLayout";
import { IModalLayoutProps } from "../../../../components/ModalLayout/ModalLayout";
import AddComment from "../../../Comment/CommentActivities/AddComment";
import { IUseComments } from "../../../../hooks/useComments";

interface IPostModalProps extends IModalLayoutProps {
  replyFocused?: boolean;
}

// Warning: Desktop specific component
const PostModal: React.FC<IPostModalProps> = ({
  replyFocused = false,
  showModal,
  onModalClose,
}) => {
  const { accessToken } = useAuthContext();
  const { commentsQuery, commentsCount } = useAboutResourceContext();

  const {
    uptoDateComments,
    relatedSourcesMap,
    resetQueryData,
    triggerGetCommentsApi,
    getCommentsStatus,
    allCommentsFetched,
  } = commentsQuery as IUseComments;

  const handleClickLoadMore = () => {
    triggerGetCommentsApi();
  };

  useEffect(() => {
    if (showModal) {
      triggerGetCommentsApi();
    }
  }, [showModal, triggerGetCommentsApi]);

  useEffect(() => {
    if (!showModal) {
      resetQueryData();
    }
  }, [resetQueryData, showModal]);

  return (
    <>
      <ModalLayout showModal={showModal} onModalClose={onModalClose}>
        <Box sx={postModalContainerSx}>
          <Box sx={contentsContainerSx}>
            {/* TODO */}
            <Box
              sx={{ width: "100%", height: "25vh", border: "3px solid red" }}
            >
              Number of comments for post:
              {commentsCount}
            </Box>

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
                  loadedComments={[]}
                  relatedSourceMap={relatedSourcesMap}
                  createdAt={comment.createdAt}
                  userReaction={comment.sourceActivity?.reaction}
                  key={`comment-${comment.id}`}
                >
                  <Comment commentText={comment.contents[0].text} />
                </AboutResourceProvider>
              </Box>
            ))}

            {!allCommentsFetched && (
              <Button onClick={handleClickLoadMore}>Load more comments</Button>
            )}
          </Box>

          <Box sx={addCommentSx}>
            <AddComment />
          </Box>
        </Box>
      </ModalLayout>
    </>
  );
};

const postModalContainerSx = (theme: Theme): SystemStyleObject<Theme> => ({
  height: "100%",
  overflowY: "hidden",
});

const contentsContainerSx = (theme: Theme): SystemStyleObject<Theme> => ({
  height: "calc(100% - 100px - 16px)",
  overflowY: "auto",
  padding: 1.5,
  paddingBottom: 5,
});

const addCommentSx = (theme: Theme): SystemStyleObject<Theme> => ({
  paddingY: 1.5,
});

export default PostModal;
