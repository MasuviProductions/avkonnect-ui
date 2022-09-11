import { Box, Grid, Theme } from "@mui/material";
import { SystemStyleObject } from "@mui/system";
import { useEffect } from "react";
import { useResourceContext } from "../../../../contexts/ResourceContext";
import ModalLayout from "../../../../components/ModalLayout";
import { IModalLayoutProps } from "../../../../components/ModalLayout/ModalLayout";
import { IUseCommentsForResourceReturn } from "../../../../hooks/useCommentsForResource";
import PostComments from "./PostComments";
import { LABELS } from "../../../../constants/labels";
import AddComment from "../../CommentEditor/AddComment";
import PostContent from "../PostContent";

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
  const { commentsQuery, totalCommentsCount, commentsCount } = resourceContext;

  const { resetQueryData, triggerGetCommentsApi, getCommentsFetching } =
    commentsQuery as IUseCommentsForResourceReturn;

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
        <Grid container sx={postModalContainerSx}>
          <Grid item sx={contentsContainerSx}>
            <PostContent />

            <Box sx={addCommentSx}>
              <AddComment submitButtonText={LABELS.POST_COMMENT} />
            </Box>

            <PostComments />
          </Grid>
        </Grid>
      </ModalLayout>
    </>
  );
};

const postModalContainerSx = (theme: Theme): SystemStyleObject<Theme> => ({
  height: "100%",
});

const contentsContainerSx = (theme: Theme): SystemStyleObject<Theme> => ({
  overflowY: "auto",
  paddingX: 1.5,
  paddingBottom: 5,
});

const addCommentSx = (theme: Theme): SystemStyleObject<Theme> => ({
  paddingY: 1.5,
});

export default PostModal;
