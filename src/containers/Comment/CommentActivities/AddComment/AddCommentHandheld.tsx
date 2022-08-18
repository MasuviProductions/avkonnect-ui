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
import { userAvatarSx } from "../../../../styles/sx";
import { usernameToColor } from "../../../../utils/generic";
import { LABELS } from "../../../../constants/labels";
import { useAuthContext } from "../../../../contexts/AuthContext";
import { useEffect, useRef } from "react";

interface IAddCommentHandheldProps {
  isFocused?: boolean;
  inputFeed?: string;
  onSubmitComment: () => void;
  onCommentFieldBlur?: () => void;
}

const AddCommentHandheld: React.FC<IAddCommentHandheldProps> = ({
  isFocused = false,
  inputFeed,
  onSubmitComment,
  onCommentFieldBlur,
}) => {
  const { authUser } = useAuthContext();

  const textFieldRef = useRef<HTMLInputElement>();

  useEffect(() => {
    if (typeof inputFeed != "undefined" && isFocused)
      textFieldRef.current?.focus();
  }, [inputFeed, isFocused]);

  const name = authUser?.name as string;
  const displayPictureUrl = authUser?.displayPictureUrl as string;

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
              <TextField
                label={LABELS.ADD_COMMENT}
                multiline
                fullWidth
                maxRows={4}
                sx={commentTextFieldSx}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={onSubmitComment} edge="end">
                        <SendIcon />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                autoFocus={isFocused}
                inputRef={textFieldRef}
                value={inputFeed}
                onBlur={onCommentFieldBlur}
              />
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
  [theme.breakpoints.down("md")]: {
    backgroundColor: theme.palette.background.paper,
    position: "fixed",
    zIndex: 1,
    bottom: 0,
    left: 0,
  },
});

const commentTextFieldSx = (theme: Theme): SystemStyleObject<Theme> => ({});

export const postButtonSx = (theme: Theme): SystemStyleObject<Theme> => ({
  fontSize: 12,
  minWidth: 40,
  textTransform: "initial",
  borderRadius: "1.5em",
  padding: "4px 16px",
});

export default AddCommentHandheld;
