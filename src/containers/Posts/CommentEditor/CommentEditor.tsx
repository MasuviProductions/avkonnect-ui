import { Hidden } from "@mui/material";
import { ContentState, EditorState } from "draft-js";
import { useEffect, useState } from "react";
import { LABELS } from "../../../constants/labels";
import { useResourceContext } from "../../../contexts/ResourceContext";
import TextEditorProvider from "../../../contexts/TextEditorContext";
import { IUseComments } from "../../../hooks/useComments";
import {
  IPostRequestContentApiModel,
  IRelatedSource,
} from "../../../interfaces/api/external";
import DRAFTJS from "../../../utils/draftjs";
import CommentEditorDesktop from "./CommentEditorDesktop";
import CommentEditorHandheld from "./CommentEditorHandheld";

interface ICommentEditorProps {
  mentionedSource?: IRelatedSource;
  submitButtonText: string;
}

const CommentEditor: React.FC<ICommentEditorProps> = ({
  mentionedSource,
  submitButtonText,
}) => {
  const resourceContext = useResourceContext();
  if (!resourceContext) {
    throw Error(LABELS.RESOURCE_CONTEXT_UNINITIALIZED);
  }

  const { commentsQuery } = resourceContext;
  const { addComment } = commentsQuery as IUseComments;
  const [contentState, setContentState] = useState<ContentState>(
    DRAFTJS.utils.getNewContentState()
  );

  const handleCommentCreate = (
    content: IPostRequestContentApiModel,
    hashtags?: string[] | undefined
  ) => {
    addComment({
      text: content.text,
      mediaUrls: [],
    });
  };

  useEffect(() => {
    const newContentState = DRAFTJS.utils.getNewContentState(mentionedSource);
    setContentState(newContentState);
  }, [mentionedSource]);

  return (
    <>
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
          <CommentEditorDesktop submitButtonText={submitButtonText} />
        </Hidden>

        <Hidden mdUp>
          <CommentEditorHandheld submitButtonText={submitButtonText} />
        </Hidden>
      </TextEditorProvider>
    </>
  );
};

export default CommentEditor;
