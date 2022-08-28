import {
  Avatar,
  Grid,
  Theme,
  TextField,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { SystemStyleObject } from "@mui/system";
import SendIcon from "@mui/icons-material/Send";
import { userAvatarSx } from "../../../../../../styles/sx";
import { usernameToColor } from "../../../../../../utils/generic";
import { LABELS } from "../../../../../../constants/labels";
import { useAuthContext } from "../../../../../../contexts/AuthContext";
import { useEffect, useRef } from "react";
import DRAFTJS from "../../../../../../utils/draftjs";
import { useTextEditorContext } from "../../../../../../contexts/TextEditorContext";
import TextEditor from "../../../../../../components/TextEditor";

interface IAddCommentHandheldProps {
  isFocused?: boolean;
  inputFeed?: string;
  onCommentFieldBlur?: () => void;
}

const AddCommentHandheld: React.FC<IAddCommentHandheldProps> = ({
  isFocused = false,
  inputFeed,
  onCommentFieldBlur,
}) => {
  const textEditorContext = useTextEditorContext();
  if (!textEditorContext) {
    throw Error("TextEditorContext not initialized");
  }

  const { onSaveContent, editorState } = textEditorContext;

  const { authUser } = useAuthContext();

  // const textFieldRef = useRef<HTMLInputElement>();

  const name = authUser?.name as string;
  const displayPictureUrl = authUser?.displayPictureUrl as string;

  const handleCommentCreate = () => {
    const contentText = DRAFTJS.utils.getContentText(editorState);
    const hastags = DRAFTJS.utils.getAllHashtagsFromPlainText(contentText);
    onSaveContent({ text: contentText, mediaUrls: [] }, hastags);
  };

  // useEffect(() => {
  //   if (typeof inputFeed != "undefined" && isFocused)
  //     textFieldRef.current?.focus();
  // }, [inputFeed, isFocused]);

  return (
    <>
      <Grid
        container
        spacing={1}
        alignItems="center"
        sx={addCommentContainerSx}
      >
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
              {/* <TextField
                label={LABELS.ADD_COMMENT_PLACEHOLDER}
                multiline
                fullWidth
                maxRows={4}
                sx={commentTextFieldSx}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={handleCommentCreate} edge="end">
                        <SendIcon />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                autoFocus={isFocused}
                inputRef={textFieldRef}
                value={inputFeed}
                onBlur={onCommentFieldBlur}
              /> */}

              <TextEditor
                palceholder={LABELS.ADD_POST_PLACEHOLDER}
                editorContainerSx={editorContainerSx}
              />

              <IconButton onClick={handleCommentCreate}>
                <SendIcon />
              </IconButton>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

const addCommentContainerSx = (theme: Theme): SystemStyleObject<Theme> => ({
  paddingBottom: 1,
  paddingX: 1,
  backgroundColor: theme.palette.background.paper,
  height: "80px",
});

const commentTextFieldSx = (theme: Theme): SystemStyleObject<Theme> => ({});

const editorContainerSx =
  (_isFocused: boolean) =>
  (theme: Theme): SystemStyleObject<Theme> => ({
    position: "relative",
    height: "100%",
    overflowY: "auto",
    overflowX: "hidden",
    backgroundColor: theme.palette.background.paper,
  });

export const postButtonSx = (theme: Theme): SystemStyleObject<Theme> => ({
  fontSize: 12,
  minWidth: 40,
  textTransform: "initial",
  borderRadius: "1.5em",
  padding: "4px 16px",
});

export default AddCommentHandheld;
