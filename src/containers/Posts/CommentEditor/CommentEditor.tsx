import { Hidden } from "@mui/material";
import { ContentState } from "draft-js";
import { useEffect, useState } from "react";
import { LABELS } from "../../../constants/labels";
import { useResourceContext } from "../../../contexts/ResourceContext";
import TextEditorProvider, {
  ITextEditorContent,
} from "../../../contexts/TextEditorContext";
import { IUseCommentsForResourceReturn } from "../../../hooks/useCommentsForResource";
import {
  ICommentContentApiModel,
  IPostContentApiModel,
} from "../../../interfaces/api/external";
import DRAFTJS from "../../../utils/draftjs";
import CommentEditorDesktop from "./CommentEditorDesktop";
import CommentEditorHandheld from "./CommentEditorHandheld";
import CommentInlineEditor from "./CommentInlineEditor";

type ICommentEditorType = "create" | "edit";

interface ICommentEditorProps {
  type?: ICommentEditorType;
  initialContentState?: ContentState;
  submitButtonText?: string;

  onClickCancel?: () => void;
  onClickSave?: () => void;
}

const CommentEditor: React.FC<ICommentEditorProps> = ({
  initialContentState,
  submitButtonText,
  type = "create",
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

  const handleCommentUpdate = (content: ITextEditorContent) => {
    const resourceContent: ICommentContentApiModel | IPostContentApiModel = {
      stringifiedRawContent: content.stringifiedRawContent,
      text: content.text,
      mediaUrls: [],
      createdAt: new Date(Date.now()),
    };
    updateResource(resourceContent);
  };

  useEffect(() => {
    setContentState(initialContentState || ContentState.createFromText(""));
  }, [initialContentState]);

  switch (type) {
    case "create": {
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
            <CommentEditorDesktop
              submitButtonText={submitButtonText || LABELS.SAVE}
            />
          </Hidden>
          <Hidden mdUp>
            <CommentEditorHandheld
              submitButtonText={submitButtonText || LABELS.SAVE}
            />
          </Hidden>
        </TextEditorProvider>
      );
    }

    case "edit": {
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
            <CommentInlineEditor
              onClickCancel={onClickCancel}
              onClickSave={onClickSave}
            />
          </Hidden>

          <Hidden mdUp>
            <CommentEditorHandheld
              submitButtonText={submitButtonText || LABELS.SAVE}
            />
          </Hidden>
        </TextEditorProvider>
      );
    }

    default: {
      return <></>;
    }
  }
};

export default CommentEditor;
