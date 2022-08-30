import { Avatar, Box, Grid, Hidden, Theme } from "@mui/material";
import { SystemStyleObject } from "@mui/system";
import CommentActivities from "./CommentActivities";
import CommentBox from "./CommentBox";
import { userAvatarSx } from "../../../styles/sx";
import { usernameToColor } from "../../../utils/generic";
import { useResourceContext } from "../../../contexts/ResourceContext";
import { LABELS } from "../../../constants/labels";

export interface ICommentProps {
  commentText: string;
  onReplyClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const Comment: React.FC<ICommentProps> = ({ commentText, onReplyClick }) => {
  const resourceContext = useResourceContext();
  if (!resourceContext) {
    throw Error(LABELS.RESOURCE_CONTEXT_UNINITIALIZED);
  }

  const { sourceInfo } = resourceContext;

  const { name, displayPictureUrl } = sourceInfo;
  return (
    <Grid container spacing={1} sx={commentContainerSx}>
      <Grid item my={1}>
        <Avatar
          alt={name}
          src={displayPictureUrl}
          sx={userAvatarSx(usernameToColor(name))}
        >
          {name[0]}
        </Avatar>
      </Grid>

      <Grid item xs>
        <Grid container>
          <Grid item xs={12}>
            <CommentBox commentText={commentText} />
          </Grid>

          <Grid item xs={12}>
            <CommentActivities onReplyClick={onReplyClick} />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

const commentContainerSx = (theme: Theme): SystemStyleObject<Theme> => ({
  padding: 1,
});
export default Comment;
