import { Hidden } from "@mui/material";
import { useResourceContext } from "../../../../contexts/ResourceContext";
import { IUseComments } from "../../../../hooks/useComments";
import AddCommentDesktop from "./AddCommentDesktop";
import AddCommentHandheld from "./AddCommentHandheld";

interface IAddCommentProps {
  inputFeed?: string;
  isFocused?: boolean;
  onCommentFieldBlur?: () => void;
}

const AddComment: React.FC<IAddCommentProps> = ({
  inputFeed,
  isFocused,
  onCommentFieldBlur,
}) => {
  const { commentsQuery } = useResourceContext();

  const { addComment } = commentsQuery as IUseComments;

  const handleCommentSubmit = () => {
    addComment({
      text: `Create comment testing: ${Math.ceil(Math.random() * 1000)} `,
      mediaUrls: [],
    });
  };

  return (
    <>
      <Hidden mdUp>
        <AddCommentHandheld
          isFocused={isFocused}
          onSubmitComment={handleCommentSubmit}
          inputFeed={inputFeed}
          onCommentFieldBlur={onCommentFieldBlur}
        />
      </Hidden>

      <Hidden mdDown>
        <AddCommentDesktop
          isFocused={isFocused}
          inputFeed={inputFeed}
          onSubmitComment={handleCommentSubmit}
          onCommentFieldBlur={onCommentFieldBlur}
        />
      </Hidden>
    </>
  );
};

export default AddComment;
