import { Hidden } from "@mui/material";
import { ContentState } from "draft-js";
import { useEffect, useState } from "react";
import { LABELS } from "../../../../constants/labels";
import { useResourceContext } from "../../../../contexts/ResourceContext";
import TextEditorProvider, {
  ITextEditorContent,
} from "../../../../contexts/TextEditorContext";
import {
  ICommentContentApiModel,
  IPostContentApiModel,
} from "../../../../interfaces/api/external";
import DRAFTJS from "../../../../utils/draftjs";
import EditCommentDesktop from "./EditCommentDesktop";
import EditCommentHandheld from "./EditCommentHandheld";

interface IEditCommentProps {
  initialContentState?: ContentState;
  submitButtonText?: string;
}

const EditComment: React.FC<IEditCommentProps> = ({
  initialContentState,
  submitButtonText,
}) => {
  const resourceContext = useResourceContext();
  if (!resourceContext) {
    throw Error(LABELS.RESOURCE_CONTEXT_UNINITIALIZED);
  }

  const { updateResource, updateIsBeingEdited } = resourceContext;
  const [contentState, setContentState] = useState<ContentState>(
    DRAFTJS.utils.getNewContentState()
  );

  const handleCommentUpdate = (content: ITextEditorContent) => {
    const resourceContent: ICommentContentApiModel | IPostContentApiModel = {
      stringifiedRawContent: content.stringifiedRawContent,
      text: content.text,
      mediaUrls: [],
      createdAt: new Date(Date.now()),
    };
    updateResource(resourceContent);
  };

  const handleEditModeClose = () => {
    updateIsBeingEdited(false);
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
      onSaveContent={handleCommentUpdate}
    >
      <Hidden mdDown>
        <EditCommentDesktop
          onClickCancel={handleEditModeClose}
          onClickSave={handleEditModeClose}
        />
      </Hidden>

      <Hidden mdUp>
        <EditCommentHandheld
          submitButtonText={submitButtonText || LABELS.SAVE}
          onClickCancel={handleEditModeClose}
          onClickSave={handleEditModeClose}
        />
      </Hidden>
    </TextEditorProvider>
  );
};

export default EditComment;
