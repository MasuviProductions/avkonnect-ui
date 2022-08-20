import { Avatar, Button, Grid, Theme, TextField } from "@mui/material";
import { SystemStyleObject } from "@mui/system";
import { userAvatarSx } from "../../../../../../styles/sx";
import { usernameToColor } from "../../../../../../utils/generic";
import { LABELS } from "../../../../../../constants/labels";
import { useAuthContext } from "../../../../../../contexts/AuthContext";
import { useEffect, useRef } from "react";

interface IAddCommentDesktopProps {
  isFocused?: boolean;
  inputFeed?: string;
  onSubmitComment: () => void;
  onCommentFieldBlur?: () => void;
}

const AddCommentDesktop: React.FC<IAddCommentDesktopProps> = ({
  isFocused = false,
  inputFeed,
  onSubmitComment,
  onCommentFieldBlur,
}) => {
  const { authUser } = useAuthContext();

  const textFieldRef = useRef<HTMLInputElement>();

  const name = authUser?.name as string;
  const displayPictureUrl = authUser?.displayPictureUrl as string;

  useEffect(() => {
    if (typeof inputFeed != "undefined" && isFocused)
      textFieldRef.current?.focus();
  }, [inputFeed, isFocused]);

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
              <TextField
                label={LABELS.ADD_COMMENT}
                multiline
                fullWidth
                maxRows={4}
                inputRef={textFieldRef}
                sx={commentTextFieldSx}
                value={inputFeed}
                onBlur={onCommentFieldBlur}
              />
            </Grid>

            <Grid item xs={12} py={1}>
              <Button
                variant="contained"
                color="primary"
                sx={postButtonSx}
                onClick={onSubmitComment}
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

const commentTextFieldSx = (theme: Theme): SystemStyleObject<Theme> => ({});

export const postButtonSx = (theme: Theme): SystemStyleObject<Theme> => ({
  fontSize: 12,
  minWidth: 40,
  textTransform: "initial",
  borderRadius: "1.5em",
  padding: "4px 16px",
});

export default AddCommentDesktop;
