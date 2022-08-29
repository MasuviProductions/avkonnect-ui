import { Box, Theme } from "@mui/material";
import { SystemStyleObject } from "@mui/system";
import { useEffect } from "react";
import { useResourceContext } from "../../../../contexts/ResourceContext";
import ModalLayout from "../../../../components/ModalLayout";
import { IModalLayoutProps } from "../../../../components/ModalLayout/ModalLayout";
import { IUseComments } from "../../../../hooks/useComments";
import PostComments from "./PostComments";
import CommentEditor from "../../CommentEditor";
import { LABELS } from "../../../../constants/labels";

interface IPostModalProps extends IModalLayoutProps {
  replyFocused?: boolean;
}

// Warning: Desktop specific component
const PostModal: React.FC<IPostModalProps> = ({
  replyFocused = false,
  showModal,
  onModalClose,
}) => {
  const resourceContext = useResourceContext();
  if (!resourceContext) {
    throw Error(LABELS.RESOURCE_CONTEXT_UNINITIALIZED);
  }
  const { commentsQuery, totalCommentsCount } = resourceContext;

  const { resetQueryData, triggerGetCommentsApi, getCommentsFetching } =
    commentsQuery as IUseComments;

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
      <ModalLayout
        showModal={showModal}
        onModalClose={onModalClose}
        maxWidth="sm"
      >
        <Box sx={postModalContainerSx}>
          <Box sx={contentsContainerSx}>
            {/* TODO */}
            <Box
              sx={{ width: "100%", height: "25vh", border: "3px solid red" }}
            >
              Number of comments for post:
              {totalCommentsCount}
            </Box>

            <Box sx={addCommentSx}>
              <CommentEditor submitButtonText={LABELS.POST_COMMENT} />
            </Box>

            <PostComments />
          </Box>
        </Box>
      </ModalLayout>
    </>
  );
};

const postModalContainerSx = (theme: Theme): SystemStyleObject<Theme> => ({
  height: "100%",
});

const contentsContainerSx = (theme: Theme): SystemStyleObject<Theme> => ({
  overflowY: "auto",
  padding: 1.5,
  paddingBottom: 5,
});

const addCommentSx = (theme: Theme): SystemStyleObject<Theme> => ({
  paddingY: 1.5,
});

export default PostModal;
