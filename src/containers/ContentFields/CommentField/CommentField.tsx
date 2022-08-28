import { Hidden } from "@mui/material";
import CommentFieldDesktop from "./CommentFieldDesktop";
import CommentFieldHandheld from "./CommentFieldHandheld";

interface ICommentFieldProps {}

const CommentField: React.FC<ICommentFieldProps> = ({}) => {
  return (
    <>
      <Hidden mdUp>
        <CommentFieldDesktop />
      </Hidden>

      <Hidden mdDown>
        <CommentFieldHandheld />
      </Hidden>
    </>
  );
};

export default CommentField;
