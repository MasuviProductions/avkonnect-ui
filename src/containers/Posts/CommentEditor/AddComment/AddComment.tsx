import { Hidden } from "@mui/material";
import { ContentState } from "draft-js";
import { useEffect, useState } from "react";
import { LABELS } from "../../../../constants/labels";
import { useResourceContext } from "../../../../contexts/ResourceContext";
import TextEditorProvider, {
  ITextEditorContent,
} from "../../../../contexts/TextEditorContext";
import { ICommentContentApiModel } from "../../../../interfaces/api/external";
import DRAFTJS from "../../../../utils/draftjs";
import AddCommentDesktop from "./AddCommentDesktop";
import AddCommentHandheld from "./AddCommentHandheld";

interface IAddCommentProps {
  initialContentState?: ContentState;
  submitButtonText?: string;

  onClickCancel?: () => void;
  onClickSave?: () => void;
}

const AddComment: React.FC<IAddCommentProps> = ({
  initialContentState,
  submitButtonText,
  onClickCancel,
  onClickSave,
}) => {
  const resourceContext = useResourceContext();
  if (!resourceContext) {
    throw Error(LABELS.RESOURCE_CONTEXT_UNINITIALIZED);
  }

  const { updateResource, createCommentForResource } = resourceContext;
  const [contentState, setContentState] = useState<ContentState>(
    DRAFTJS.utils.getNewContentState()
  );

  const handleCommentCreate = (content: ITextEditorContent) => {
    const resourceContent: Omit<ICommentContentApiModel, "createdAt"> = {
      text: content.text,
      mediaUrls: [],
      stringifiedRawContent: content.stringifiedRawContent,
    };
    createCommentForResource(resourceContent);
  };

  useEffect(() => {
    setContentState(initialContentState || ContentState.createFromText(""));
  }, [initialContentState]);

  return (
    <TextEditorProvider
      contentState={contentState}
      pluginConfig={{
        hashtags: {
          plugin: DRAFTJS.editorPlugins.commentHashtags.pluginConfig,
          themeStyle: DRAFTJS.editorPlugins.commentHashtags.theme,
        },
        mentions: {
          plugin: DRAFTJS.editorPlugins.commentMentions.pluginConfig,
          themeStyle: DRAFTJS.editorPlugins.commentMentions.theme,
        },
      }}
      onSaveContent={handleCommentCreate}
    >
      <Hidden mdDown>
        <AddCommentDesktop submitButtonText={submitButtonText || LABELS.SAVE} />
      </Hidden>
      <Hidden mdUp>
        <AddCommentHandheld
          submitButtonText={submitButtonText || LABELS.SAVE}
        />
      </Hidden>
    </TextEditorProvider>
  );
};

export default AddComment;
