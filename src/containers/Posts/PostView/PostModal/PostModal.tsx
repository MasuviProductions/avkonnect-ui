import { Box, Theme } from "@mui/material";
import { SystemStyleObject } from "@mui/system";
import { useEffect } from "react";
import { useResourceContext } from "../../../../contexts/ResourceContext";
import ModalLayout from "../../../../components/ModalLayout";
import { IModalLayoutProps } from "../../../../components/ModalLayout/ModalLayout";
import { IUseComments } from "../../../../hooks/useComments";
import PostComments from "./PostComments";
import CommentEditor from "../../CommentEditor";

interface IPostModalProps extends IModalLayoutProps {
  replyFocused?: boolean;
}

// Warning: Desktop specific component
const PostModal: React.FC<IPostModalProps> = ({
  replyFocused = false,
  showModal,
  onModalClose,
}) => {
  const { commentsQuery, commentsCount } = useResourceContext();

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

            <PostComments />
          </Box>

          <Box sx={addCommentSx}>
            <CommentEditor type="desktop" />
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
