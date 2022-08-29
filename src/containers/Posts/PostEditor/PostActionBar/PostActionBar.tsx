import { Grid, IconButton } from "@mui/material";
import PhotoCameraBackIcon from "@mui/icons-material/PhotoCameraBack";
import CustomButton from "../../../../components/CustomButton";
import { LABELS } from "../../../../constants/labels";
import DRAFTJS from "../../../../utils/draftjs";
import { useTextEditorContext } from "../../../../contexts/TextEditorContext";

interface IPostActionBarProps {}

const PostActionBar: React.FC<IPostActionBarProps> = ({}) => {
  const textEditorContext = useTextEditorContext();
  if (!textEditorContext) {
    throw Error(LABELS.TEXT_EDITOR_CONTEXT_UNINITIALIZED);
  }

  const { editorState, onSaveContent } = textEditorContext;

  const handlePostCreate = () => {
    const contentText = DRAFTJS.utils.getContentText(editorState);
    const hastags = DRAFTJS.utils.getAllHashtagsFromPlainText(contentText);
    onSaveContent({ text: contentText, mediaUrls: [] }, hastags);
  };

  return (
    <>
      <Grid container justifyContent="space-between" spacing={1}>
        <Grid item>
          <Grid container spacing={1}>
            <Grid item>
              <IconButton>
                <PhotoCameraBackIcon />
              </IconButton>
            </Grid>
            <Grid item></Grid>
          </Grid>
        </Grid>
        <Grid item>
          <CustomButton onClick={handlePostCreate}>
            {LABELS.SUBMIT_POST}
          </CustomButton>
        </Grid>
      </Grid>
    </>
  );
};

export default PostActionBar;
