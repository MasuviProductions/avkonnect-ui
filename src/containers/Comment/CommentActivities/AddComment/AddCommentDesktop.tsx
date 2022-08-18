import { Avatar, Button, Grid, Theme, TextField } from "@mui/material";
import { SystemStyleObject } from "@mui/system";
import { userAvatarSx } from "../../../../styles/sx";
import { usernameToColor } from "../../../../utils/generic";
import { LABELS } from "../../../../constants/labels";
import { useAuthContext } from "../../../../contexts/AuthContext";

interface IAddCommentDesktopProps {
  inputFeed?: string;
  onSubmitComment: () => void;
}

const AddCommentDesktop: React.FC<IAddCommentDesktopProps> = ({
  inputFeed,
  onSubmitComment,
}) => {
  const { authUser } = useAuthContext();

  const name = authUser?.name as string;
  const displayPictureUrl = authUser?.displayPictureUrl as string;

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
            <Grid xs={12}>
              <TextField
                label={LABELS.ADD_COMMENT}
                multiline
                fullWidth
                maxRows={4}
                sx={commentTextFieldSx}
                value={inputFeed}
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
