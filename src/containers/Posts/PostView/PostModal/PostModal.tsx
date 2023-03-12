import { useEffect } from "react";
import { useResourceContext } from "../../../../contexts/ResourceContext";
import ModalLayout from "../../../../components/ModalLayout";
import { IModalLayoutProps } from "../../../../components/ModalLayout/ModalLayout";
import { IUseCommentsForResourceReturn } from "../../../../hooks/useCommentsForResource";
import { LABELS } from "../../../../constants/labels";
import PostLayoutDesktop from "../../PostLayout/PostLayoutDesktop";

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
  const { commentsQuery } = resourceContext;

  const { resetQueryData, triggerGetCommentsApi } =
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
        <PostLayoutDesktop />
      </ModalLayout>
    </>
  );
};

export default PostModal;
