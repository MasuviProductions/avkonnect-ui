import {
  ComponentType,
  createContext,
  RefObject,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { ContentState, EditorState } from "draft-js";
import Editor, { EditorPlugin } from "@draft-js-plugins/editor";
import { MentionSuggestionsPubProps } from "@draft-js-plugins/mention/lib/MentionSuggestions/MentionSuggestions";
import { HashtagPluginConfig } from "@draft-js-plugins/hashtag";
import { MentionPluginConfig } from "@draft-js-plugins/mention";

import useRemountKey from "../hooks/useRemountKey";
import { IPostRequestContentApiModel } from "../interfaces/api/external";
import { Interpolation } from "@emotion/react";
import { Theme } from "@mui/material";
import DRAFTJS from "../utils/draftjs";

/* 
    Resources: https://github.com/draft-js-plugins/draft-js-plugins/issues/983
*/
interface ITextEditorContext {
  editorKey: string;
  editorRef: RefObject<Editor>;
  editorState: EditorState;
  onChangeEditorState: (_editorState: EditorState) => void;
  editorPlugins: EditorPlugin[];
  mentionsInterpolationStyle?: Interpolation<Theme>;
  hashtagsInterpolationStyle?: Interpolation<Theme>;
  isEditorFocused: boolean;
  onChangeEditorFocus: (_focus: boolean) => void;
  mentionSuggestionsComponent: ComponentType<MentionSuggestionsPubProps>;
  onSaveContent: (
    content: IPostRequestContentApiModel,
    hashtags?: string[]
  ) => void;
  focusEditor: () => void;
}

const TextEditorContext = createContext<ITextEditorContext | undefined>(
  undefined
);

interface ITextEditorProvider {
  contentState?: ContentState;
  pluginConfig: {
    hashtags: { plugin: HashtagPluginConfig; themeStyle: Interpolation<Theme> };
    mentions: { plugin: MentionPluginConfig; themeStyle: Interpolation<Theme> };
  };
  onSaveContent: (
    content: IPostRequestContentApiModel,
    hashtags?: string[]
  ) => void;
}

const TextEditorProvider: React.FC<ITextEditorProvider> = ({
  contentState,
  pluginConfig,
  onSaveContent,
  children,
}) => {
  const editorRef = useRef<Editor>(null);
  const { remountKey } = useRemountKey(5);
  const [isEditorFocused, setIsEditorFocused] = useState<boolean>(false);
  const [editorPlugins, setEditorPlugins] = useState<EditorPlugin[]>([]);
  const [editorState, setEditorState] = useState<EditorState>(
    EditorState.createEmpty()
  );

  // ******** Init plugins ********
  useMemo(() => {
    const plugin = DRAFTJS.editorPlugins.createHashtagPlugin(
      pluginConfig.hashtags.plugin
    );
    setEditorPlugins((prev) => [...prev, plugin]);
  }, [pluginConfig.hashtags.plugin]);

  const MentionSuggestionsComponent = useMemo(() => {
    const plugin = DRAFTJS.editorPlugins.createMentionPlugin(
      pluginConfig.mentions.plugin
    );
    setEditorPlugins((prev) => [...prev, plugin]);
    return plugin.MentionSuggestions;
  }, [pluginConfig.mentions.plugin]);
  // ******************************

  const handleChangeEditorState = useCallback((_editorState: EditorState) => {
    setEditorState(_editorState);
  }, []);

  const handleChangeEditorFocus = (_focus: boolean) => {
    setIsEditorFocused(_focus);
  };

  const focusEditor = useCallback(() => {
    editorRef.current?.focus();
  }, []);

  useEffect(() => {
    if (contentState) {
      setEditorState((prev) => {
        const resetEditorState = EditorState.push(
          prev,
          contentState,
          "remove-range"
        );
        const focusedEditorState = EditorState.moveFocusToEnd(resetEditorState);
        return focusedEditorState;
      });
    }
  }, [contentState]);

  return (
    <TextEditorContext.Provider
      value={{
        editorKey: `editor-${remountKey}`,
        editorRef,
        editorState,
        editorPlugins,
        mentionsInterpolationStyle: pluginConfig.mentions.themeStyle,
        hashtagsInterpolationStyle: pluginConfig.hashtags.themeStyle,
        isEditorFocused,
        onChangeEditorState: handleChangeEditorState,
        onChangeEditorFocus: handleChangeEditorFocus,
        mentionSuggestionsComponent: MentionSuggestionsComponent,
        onSaveContent: onSaveContent,
        focusEditor,
      }}
    >
      {children}
    </TextEditorContext.Provider>
  );
};

const useTextEditorContext = (): ITextEditorContext | undefined => {
  const textEditorContext = useContext(TextEditorContext);
  return textEditorContext;
};

export { useTextEditorContext };
export default TextEditorProvider;
