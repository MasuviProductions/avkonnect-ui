import { MentionData } from "@draft-js-plugins/mention";
import { Hidden } from "@mui/material";
import {
  ContentState,
  convertFromRaw,
  convertToRaw,
  EditorState,
  Modifier,
  RawDraftEntity,
} from "draft-js";
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
  const [editorState, setEditorState] = useState<EditorState | undefined>();

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
    if (mentionedSource) {
      const newEditorState =
        DRAFTJS.utils.getNewEditorStateWithMention(mentionedSource);
      setEditorState(newEditorState);
    }
  }, [mentionedSource]);

  return (
    <>
      <Hidden mdUp>
        <TextEditorProvider
          initialEditorState={editorState}
          pluginConfig={{
            hashtags: DRAFTJS.editorPlugins.hashtags.pluginConfig,
            mentions: DRAFTJS.editorPlugins.commentMentions.pluginConfig,
          }}
          mentionsInterpolationStyle={
            DRAFTJS.editorPlugins.commentMentions.theme
          }
          onSaveContent={handleCommentCreate}
        >
          <CommentEditorHandheld submitButtonText={submitButtonText} />
        </TextEditorProvider>
      </Hidden>

      <Hidden mdDown>
        <TextEditorProvider
          initialEditorState={editorState}
          pluginConfig={{
            hashtags: DRAFTJS.editorPlugins.hashtags.pluginConfig,
            mentions: DRAFTJS.editorPlugins.commentMentions.pluginConfig,
          }}
          mentionsInterpolationStyle={
            DRAFTJS.editorPlugins.commentMentions.theme
          }
          onSaveContent={handleCommentCreate}
        >
          <CommentEditorDesktop submitButtonText={submitButtonText} />
        </TextEditorProvider>
      </Hidden>
    </>
  );
};

export default CommentEditor;
