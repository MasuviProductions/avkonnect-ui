import {
  Avatar,
  Button,
  Grid,
  Theme,
  TextField,
  IconButton,
} from "@mui/material";
import { SystemStyleObject } from "@mui/system";
import PhotoCameraBackIcon from "@mui/icons-material/PhotoCameraBack";

import { userAvatarSx } from "../../../styles/sx";
import { usernameToColor } from "../../../utils/generic";
import { LABELS } from "../../../constants/labels";
import { useAuthContext } from "../../../contexts/AuthContext";
import TextEditor from "../../../components/TextEditor";
import { useTextEditorContext } from "../../../contexts/TextEditorContext";
import DRAFTJS from "../../../utils/draftjs";

interface ICommentEditorDesktopProps {
  submitButtonText: string;
}

const CommentEditorDesktop: React.FC<ICommentEditorDesktopProps> = ({
  submitButtonText,
}) => {
  const textEditorContext = useTextEditorContext();
  if (!textEditorContext) {
    throw Error(LABELS.TEXT_EDITOR_CONTEXT_UNINITIALIZED);
  }

  const { onSaveContent, editorState } = textEditorContext;

  const { authUser } = useAuthContext();

  const name = authUser?.name as string;
  const displayPictureUrl = authUser?.displayPictureUrl as string;

  const handleCommentCreate = () => {
    const contentText = DRAFTJS.utils.getContentText(editorState);
    const hastags = DRAFTJS.utils.getAllHashtagsFromPlainText(contentText);
    onSaveContent({ text: contentText, mediaUrls: [] }, hastags);
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
                sx={commentContainerSx}
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
                      <IconButton>
                        <PhotoCameraBackIcon fontSize="small" />
                      </IconButton>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={12} mt={1}>
              <Button
                variant="contained"
                color="primary"
                sx={postButtonSx}
                onClick={handleCommentCreate}
              >
                {submitButtonText}
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export const postButtonSx = (theme: Theme): SystemStyleObject<Theme> => ({
  fontSize: 12,
  minWidth: 40,
  textTransform: "initial",
  borderRadius: "1.5em",
  padding: "4px 16px",
  marginLeft: "8px",
});

export const commentContainerSx = (theme: Theme): SystemStyleObject<Theme> => ({
  paddingX: 1.5,
  paddingY: 0.25,
  border: "1px solid black",
  borderRadius: "2rem",
});

const textEditorContainerSx =
  (_isFocused: boolean) =>
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

export default CommentEditorDesktop;
