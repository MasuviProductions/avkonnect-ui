import { Grid, IconButton, Theme } from "@mui/material";
import { SystemStyleObject } from "@mui/system";
import PhotoCameraBackIcon from "@mui/icons-material/PhotoCameraBack";

import CustomButton from "../../../../components/CustomButton";
import { LABELS } from "../../../../constants/labels";
import { useTextEditorContext } from "../../../../contexts/TextEditorContext";

interface IPostActionBarProps {}

const PostActionBar: React.FC<IPostActionBarProps> = ({}) => {
  const textEditorContext = useTextEditorContext();
  if (!textEditorContext) {
    throw Error(LABELS.TEXT_EDITOR_CONTEXT_UNINITIALIZED);
  }

  const { editorState, saveContent, isEditorEmpty } = textEditorContext;

  const handlePostCreate = () => {
    saveContent();
  };

  return (
    <>
      <Grid container justifyContent="space-between" spacing={1}>
        <Grid item>
          <Grid container spacing={1}>
            <Grid item>
              <IconButton>
                <PhotoCameraBackIcon sx={actionIconsSx} />
              </IconButton>
            </Grid>
            <Grid item></Grid>
          </Grid>
        </Grid>
        <Grid item>
          <CustomButton onClick={handlePostCreate} disabled={isEditorEmpty}>
            {LABELS.SUBMIT_POST}
          </CustomButton>
        </Grid>
      </Grid>
    </>
  );
};

const actionIconsSx = (theme: Theme): SystemStyleObject<Theme> => ({
  color: theme.palette.text.secondary,
});

export default PostActionBar;
