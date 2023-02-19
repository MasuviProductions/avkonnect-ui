import {
  Avatar,
  Button,
  Grid,
  Theme,
  IconButton,
  Tooltip,
  Hidden,
} from "@mui/material";
import { SystemStyleObject } from "@mui/system";
import PhotoCameraBackIcon from "@mui/icons-material/PhotoCameraBack";

import { userAvatarSx } from "../../../../styles/sx";
import { usernameToColor } from "../../../../utils/generic";
import { LABELS } from "../../../../constants/labels";
import { useAuthContext } from "../../../../contexts/AuthContext";
import TextEditor from "../../../../components/TextEditor";
import { useTextEditorContext } from "../../../../contexts/TextEditorContext";
import { useState } from "react";
import MediaUploadModal from "../../MediaUploadModal";

interface IAddCommentDesktopProps {
  submitButtonText: string;
}

const AddCommentDesktop: React.FC<IAddCommentDesktopProps> = ({
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
      <Grid container spacing={1}>
        <Grid item py={1}>
          <Avatar
            alt={name as string}
            src={displayPictureUrl as string}
            sx={userAvatarSx(usernameToColor(name))}
          >
            {name[0]}
          </Avatar>
        </Grid>

        <Grid item xs py={1}>
          <Grid container>
            <Grid item xs={12}>
              <Grid
                container
                justifyContent="space-between"
                sx={commentContainerSx(isEditorFocused)}
              >
                <Grid item>
                  <TextEditor
                    palceholder={LABELS.ADD_COMMENT_PLACEHOLDER}
                    editorContainerSx={textEditorContainerSx}
                  />
                </Grid>

                <Grid item flex={1}>
                  <Grid container justifyContent="flex-end">
                    <Grid item>
                      <Tooltip title={LABELS.UPLOAD_MEDIA}>
                        <IconButton>
                          <PhotoCameraBackIcon
                            onClick={onMediaUploadOpen}
                            sx={actionIconsSx}
                            fontSize="small"
                          />
                        </IconButton>
                      </Tooltip>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={12} mt={1}>
              {!isEditorEmpty && (
                <Button
                  variant="contained"
                  color="primary"
                  sx={postButtonSx}
                  onClick={handleCommentCreate}
                >
                  {submitButtonText}
                </Button>
              )}
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <MediaUploadModal
        title={LABELS.UPLOAD_MEDIA}
        showModal={showMediaUpload}
        onModalClose={onMediaUploadClose}
      />
    </>
  );
};

const actionIconsSx = (theme: Theme): SystemStyleObject<Theme> => ({
  color: theme.palette.text.secondary,
});

const postButtonSx = (theme: Theme): SystemStyleObject<Theme> => ({
  fontSize: 12,
  minWidth: 40,
  textTransform: "initial",
  borderRadius: "1.5em",
  padding: "4px 16px",
  marginLeft: "8px",
});

const commentContainerSx =
  (isFocused: boolean) =>
  (theme: Theme): SystemStyleObject<Theme> => ({
    paddingX: 1.5,
    paddingY: 0.25,
    border: `1px solid ${
      isFocused ? theme.palette.text.primary : theme.palette.text.secondary
    }`,
    borderRadius: "2rem",
  });

const textEditorContainerSx =
  (isFocused: boolean) =>
  (theme: Theme): SystemStyleObject<Theme> => ({
    padding: 1,
    borderRadius: "1.5em",
    fontSize: "14px",
    minHeight: "30px",
    minWidth: "300px",
    backgroundColor: theme.palette.background.paper,
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

export default AddCommentDesktop;
