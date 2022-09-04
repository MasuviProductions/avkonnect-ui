import { Button, Grid, Theme } from "@mui/material";
import { SystemStyleObject } from "@mui/system";
import TextEditor from "../../../components/TextEditor";
import { LABELS } from "../../../constants/labels";
import { useTextEditorContext } from "../../../contexts/TextEditorContext";

interface ICommentInlineEditorProps {
  onClickCancel?: () => void;
  onClickSave?: () => void;
}
const CommentInlineEditor: React.FC<ICommentInlineEditorProps> = ({
  onClickCancel,
  onClickSave,
}) => {
  const textEditorContext = useTextEditorContext();
  if (!textEditorContext) {
    throw Error(LABELS.TEXT_EDITOR_CONTEXT_UNINITIALIZED);
  }

  const { saveContent } = textEditorContext;

  const handleCommentSave = () => {
    saveContent();
    onClickSave?.();
  };

  return (
    <>
      <Grid container>
        <Grid item xs={12}>
          <TextEditor
            palceholder={LABELS.ADD_COMMENT_PLACEHOLDER}
            editorContainerSx={textEditorContainerSx}
          />
        </Grid>

        <Grid item>
          <Grid container spacing={0.5} p={1.5}>
            <Grid item>
              <Button
                variant="contained"
                color="primary"
                sx={postButtonSx}
                onClick={handleCommentSave}
              >
                {LABELS.SAVE}
              </Button>
            </Grid>

            <Grid item>
              <Button
                variant="contained"
                color="primary"
                sx={postButtonSx}
                onClick={onClickCancel}
              >
                {LABELS.CANCEL}
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

const postButtonSx = (theme: Theme): SystemStyleObject<Theme> => ({
  fontSize: 12,
  minWidth: 40,
  textTransform: "initial",
  borderRadius: "1.5em",
  padding: "4px 16px",
  marginLeft: "8px",
});

const textEditorContainerSx =
  (isFocused: boolean) =>
  (theme: Theme): SystemStyleObject<Theme> => ({
    padding: 1,
    fontSize: "14px",
    minHeight: "30px",
    minWidth: "300px",
    // Hide scrollbar, but keep scroll functionality
    overflowY: "auto",
    overflowX: "hidden",
    msOverflowStyle: "none",
    scrollbarWidth: "none",
    "::-webkit-scrollbar": {
      display: "none",
    },

    ".public-DraftEditor-content": {
      wordBreak: "break-word",
    },
  });

export default CommentInlineEditor;
