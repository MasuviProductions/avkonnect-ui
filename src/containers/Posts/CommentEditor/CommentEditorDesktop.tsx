import { Avatar, Button, Grid, Theme, TextField } from "@mui/material";
import { SystemStyleObject } from "@mui/system";
import { userAvatarSx } from "../../../styles/sx";
import { usernameToColor } from "../../../utils/generic";
import { LABELS } from "../../../constants/labels";
import { useAuthContext } from "../../../contexts/AuthContext";
import TextEditor from "../../../components/TextEditor";
import { useTextEditorContext } from "../../../contexts/TextEditorContext";
import DRAFTJS from "../../../utils/draftjs";

interface ICommentEditorDesktopProps {}

const CommentEditorDesktop: React.FC<ICommentEditorDesktopProps> = ({}) => {
  const textEditorContext = useTextEditorContext();
  if (!textEditorContext) {
    throw Error("TextEditorContext not initialized");
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
      <Grid container spacing={1} py={1}>
        <Grid item>
          <Avatar
            alt={name as string}
            src={displayPictureUrl as string}
            sx={userAvatarSx(usernameToColor(name))}
          >
            {name[0]}
          </Avatar>
        </Grid>

        <Grid item xs>
          <Grid container>
            <Grid item xs={12}>
              <TextEditor
                palceholder={LABELS.ADD_POST_PLACEHOLDER}
                editorContainerSx={editorContainerSx}
              />
            </Grid>

            <Grid item xs={12} py={1}>
              <Button
                variant="contained"
                color="primary"
                sx={postButtonSx}
                onClick={handleCommentCreate}
              >
                {LABELS.POST_COMMENT}
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
});

const editorContainerSx =
  (_isFocused: boolean) =>
  (theme: Theme): SystemStyleObject<Theme> => ({
    minHeight: "40px",
    maxHeight: "300px",
    overflowY: "auto",
    overflowX: "hidden",
    backgroundColor: theme.palette.background.paper,
  });

export default CommentEditorDesktop;
