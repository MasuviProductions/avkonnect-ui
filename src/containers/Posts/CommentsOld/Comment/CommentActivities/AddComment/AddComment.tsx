import { Hidden } from "@mui/material";
import { useResourceContext } from "../../../../../../contexts/ResourceContext";
import TextEditorProvider from "../../../../../../contexts/TextEditorContext";
import { IUseComments } from "../../../../../../hooks/useComments";
import { IPostRequestContentApiModel } from "../../../../../../interfaces/api/external";
import DRAFTJS from "../../../../../../utils/draftjs";
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

  const handlePostCreate = (
    content: IPostRequestContentApiModel,
    hashtags?: string[] | undefined
  ) => {
    addComment({
      text: content.text,
      mediaUrls: [],
    });
  };

  return (
    <>
      <Hidden mdUp>
        <TextEditorProvider
          plugins={{
            hashtags: DRAFTJS.editorPlugins.hashtags.plugin,
            mentions: DRAFTJS.editorPlugins.mentions.plugin,
          }}
          onSaveContent={handlePostCreate}
        >
          <AddCommentHandheld
            isFocused={isFocused}
            inputFeed={inputFeed}
            onCommentFieldBlur={onCommentFieldBlur}
          />
        </TextEditorProvider>
      </Hidden>

      <Hidden mdDown>
        <TextEditorProvider
          plugins={{
            hashtags: DRAFTJS.editorPlugins.hashtags.plugin,
            mentions: DRAFTJS.editorPlugins.mentions.plugin,
          }}
          onSaveContent={handlePostCreate}
        >
          <AddCommentDesktop
            isFocused={isFocused}
            inputFeed={inputFeed}
            onCommentFieldBlur={onCommentFieldBlur}
          />
        </TextEditorProvider>
      </Hidden>
    </>
  );
};

export default AddComment;
