import { Avatar, Button, Grid, Theme, IconButton, Hidden } from "@mui/material";
import { SystemStyleObject } from "@mui/system";
import PhotoCameraBackIcon from "@mui/icons-material/PhotoCameraBack";

import { userAvatarSx } from "../../../../styles/sx";
import { usernameToColor } from "../../../../utils/generic";
import { LABELS } from "../../../../constants/labels";
import { useAuthContext } from "../../../../contexts/AuthContext";
import TextEditor from "../../../../components/TextEditor";
import { useTextEditorContext } from "../../../../contexts/TextEditorContext";
import { useState } from "react";
import MediaUploadOverlay from "../../MediaUploadOverlay";

interface IAddCommentHandheldProps {
  submitButtonText: string;
}

const AddCommentHandheld: React.FC<IAddCommentHandheldProps> = ({
  submitButtonText,
}) => {
  const textEditorContext = useTextEditorContext();
  if (!textEditorContext) {
    throw Error(LABELS.TEXT_EDITOR_CONTEXT_UNINITIALIZED);
  }

  const { saveContent, isEditorFocused, isEditorEmpty } = textEditorContext;

  const { authUser } = useAuthContext();

  const name = authUser?.name as string;
  const displayPictureUrl = authUser?.displayPictureUrl as string;
  const [showMediaUpload, setShowMediaUpload] = useState<boolean>(false);

  const onMediaUploadOpen = () => {
    setShowMediaUpload(true);
  };
  const onMediaUploadClose = () => {
    setShowMediaUpload(false);
  };
  const handleCommentCreate = () => {
    saveContent();
  };

  return (
    <>
      <Grid container spacing={1} sx={commentEditorContainer}>
        <Grid item xs={12}>
          <Grid container>
            <Grid item>
              <Avatar
                alt={name as string}
                src={displayPictureUrl as string}
                sx={userAvatarSx(usernameToColor(name))}
              >
                {name[0]}
              </Avatar>
            </Grid>

            <Grid item xs sx={commentContainerSx(isEditorFocused)}>
              <TextEditor
                palceholder={LABELS.ADD_COMMENT_PLACEHOLDER}
                editorContainerSx={textEditorContainerSx}
              />
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={12} sx={actionsContainerSx}>
          <Grid container justifyContent="space-between">
            <Grid item>
              <IconButton>
                <PhotoCameraBackIcon
                  onClick={onMediaUploadOpen}
                  sx={actionIconsSx}
                  fontSize="small"
                />
              </IconButton>
            </Grid>

            <Grid item>
              <Button
                color="primary"
                sx={postButtonSx}
                disabled={isEditorEmpty}
                onClick={handleCommentCreate}
              >
                {submitButtonText}
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <MediaUploadOverlay
        showOverlay={showMediaUpload}
        onOverlayClose={onMediaUploadClose}
      />
    </>
  );
};

const actionsContainerSx = (theme: Theme): SystemStyleObject<Theme> => ({
  marginTop: 1,
  borderTop: `1px solid ${theme.palette.secondary.main}`,
});

const actionIconsSx = (theme: Theme): SystemStyleObject<Theme> => ({
  color: theme.palette.text.secondary,
});

const commentEditorContainer = (theme: Theme): SystemStyleObject<Theme> => ({
  borderTop: `2px solid ${theme.palette.secondary.main}`,
  backgroundColor: theme.palette.background.paper,
});

const postButtonSx = (theme: Theme): SystemStyleObject<Theme> => ({
  fontSize: 12,
  minWidth: 40,
  textTransform: "initial",
  padding: "4px 16px",
});

const commentContainerSx =
  (isFocused: boolean) =>
  (theme: Theme): SystemStyleObject<Theme> => ({
    marginLeft: 1,
    paddingY: 0.25,
  });

const textEditorContainerSx =
  (isFocused: boolean) =>
  (theme: Theme): SystemStyleObject<Theme> => ({
    padding: 1,
    fontSize: "14px",
    minHeight: "30px",
    widht: "100%",
    backgroundColor: theme.palette.background.paper,
    maxHeight: isFocused ? "150px" : "30px",
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

export default AddCommentHandheld;
