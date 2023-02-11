import { Grid, Hidden, IconButton, Theme } from "@mui/material";
import { SystemStyleObject } from "@mui/system";
import PhotoCameraBackIcon from "@mui/icons-material/PhotoCameraBack";

import CustomButton from "../../../../components/CustomButton";
import { LABELS } from "../../../../constants/labels";
import { useTextEditorContext } from "../../../../contexts/TextEditorContext";
import { useState } from "react";
import MediaUploadModal from "../MediaUploadModal/MediaUploadModal";
import MediaUploadOverlay from "../MediaUploadOverlay/MediaUploadOverlay";

interface IPostActionBarProps {}

const PostActionBar: React.FC<IPostActionBarProps> = ({}) => {
  const textEditorContext = useTextEditorContext();
  if (!textEditorContext) {
    throw Error(LABELS.TEXT_EDITOR_CONTEXT_UNINITIALIZED);
  }
  const [showMediaUpload, setShowMediaUpload] = useState<boolean>(false);

  const { editorState, saveContent, isEditorEmpty } = textEditorContext;

  const handlePostCreate = () => {
    saveContent();
  };

  const onMediaUploadOpen = () => {
    setShowMediaUpload(true);
  };
  const onMediaUploadClose = () => {
    setShowMediaUpload(false);
  };

  return (
    <>
      <Grid container justifyContent="space-between" spacing={1}>
        <Grid item>
          <Grid container spacing={1}>
            <Grid item>
              <IconButton>
                <PhotoCameraBackIcon
                  onClick={onMediaUploadOpen}
                  sx={actionIconsSx}
                />
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

      <Hidden mdUp>
        <MediaUploadOverlay
          showOverlay={showMediaUpload}
          onOverlayClose={onMediaUploadClose}
        />
      </Hidden>

      <Hidden mdDown>
        <MediaUploadModal
          title={LABELS.CREATE_POST}
          showModal={showMediaUpload}
          onModalClose={onMediaUploadClose}
        />
      </Hidden>
    </>
  );
};

const actionIconsSx = (theme: Theme): SystemStyleObject<Theme> => ({
  color: theme.palette.text.secondary,
});

export default PostActionBar;
