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
import { useResourceContext } from "../../../contexts/ResourceContext";
import TextEditorProvider from "../../../contexts/TextEditorContext";
import { IUseComments } from "../../../hooks/useComments";
import {
  IPostRequestContentApiModel,
  IRelatedSource,
} from "../../../interfaces/api/external";
import DRAFTJS from "../../../utils/draftjs";
import CommentEditorDesktop from "./CommentEditorDesktop";

interface ICommentEditorProps {
  type: "desktop" | "handheld";
  mentionedSource?: IRelatedSource;
}

const CommentEditor: React.FC<ICommentEditorProps> = ({
  mentionedSource,
  type,
}) => {
  const { commentsQuery } = useResourceContext();
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
          plugins={{
            hashtags: DRAFTJS.editorPlugins.hashtags.plugin,
            mentions: DRAFTJS.editorPlugins.mentions.plugin,
          }}
          onSaveContent={handleCommentCreate}
        >
          <CommentEditorDesktop />;
        </TextEditorProvider>
      </Hidden>

      <Hidden mdDown>
        <TextEditorProvider
          initialEditorState={editorState}
          plugins={{
            hashtags: DRAFTJS.editorPlugins.hashtags.plugin,
            mentions: DRAFTJS.editorPlugins.mentions.plugin,
          }}
          onSaveContent={handleCommentCreate}
        >
          <CommentEditorDesktop />;
        </TextEditorProvider>
      </Hidden>
    </>
  );
};

export default CommentEditor;
