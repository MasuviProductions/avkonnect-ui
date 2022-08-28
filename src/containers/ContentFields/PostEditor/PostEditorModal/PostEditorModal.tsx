import { Grid, Theme } from "@mui/material";
import { SystemStyleObject } from "@mui/system";
import ModalLayout from "../../../../components/ModalLayout";
import { IModalLayoutProps } from "../../../../components/ModalLayout/ModalLayout";
import "draft-js/dist/Draft.css";
import { LABELS } from "../../../../constants/labels";
import PostActionBar from "../PostActionBar";
import TextEditor from "../../../../components/TextEditor/TextEditor";
import { useTextEditorContext } from "../../../../contexts/TextEditorContext";

interface IPostEditorModalProps extends IModalLayoutProps {}

const PostEditorModal: React.FC<IPostEditorModalProps> = ({
  showModal,
  onModalClose,
}) => {
  const textEditorContext = useTextEditorContext();
  if (!textEditorContext) {
    throw Error("TextEditorContext not initialized");
  }

  return (
    <>
      <ModalLayout
        showModal={showModal}
        onModalClose={onModalClose}
        maxWidth="sm"
        title={LABELS.CREATE_POST}
      >
        <Grid container p={2} spacing={2}>
          <Grid item xs={12}>
            <TextEditor
              palceholder={LABELS.ADD_POST_PLACEHOLDER}
              editorContainerSx={editorContainerSx}
            />
          </Grid>
          <Grid item xs={12}>
            <PostActionBar />
          </Grid>
        </Grid>
      </ModalLayout>
    </>
  );
};

const editorContainerSx =
  (_isFocused: boolean) =>
  (theme: Theme): SystemStyleObject<Theme> => ({
    position: "relative",
    minHeight: "200px",
    maxHeight: "500px",
    width: "100%",
    overflowY: "auto",
    overflowX: "hidden",
    backgroundColor: theme.palette.background.paper,
  });

export default PostEditorModal;
