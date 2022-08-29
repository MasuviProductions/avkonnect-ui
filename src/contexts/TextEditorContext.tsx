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
import { EditorState } from "draft-js";
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
  isEditorFocused: boolean;
  onChangeEditorFocus: (_focus: boolean) => void;
  mentionSuggestionsComponent: ComponentType<MentionSuggestionsPubProps>;
  onSaveContent: (
    content: IPostRequestContentApiModel,
    hashtags?: string[]
  ) => void;
}

const TextEditorContext = createContext<ITextEditorContext | undefined>(
  undefined
);

interface ITextEditorProvider {
  initialEditorState?: EditorState;
  pluginConfig: {
    hashtags: HashtagPluginConfig;
    mentions: MentionPluginConfig;
    //   MentionSuggestions: ComponentType<MentionSuggestionsPubProps>;
  };
  mentionsInterpolationStyle: Interpolation<Theme>;
  onSaveContent: (
    content: IPostRequestContentApiModel,
    hashtags?: string[]
  ) => void;
}

const TextEditorProvider: React.FC<ITextEditorProvider> = ({
  initialEditorState,
  pluginConfig,
  mentionsInterpolationStyle,
  onSaveContent,
  children,
}) => {
  const editorRef = useRef<Editor>(null);
  const { remountKey } = useRemountKey(5);
  const [isEditorFocused, setIsEditorFocused] = useState<boolean>(false);
  const [editorPlugins, setEditorPlugins] = useState<EditorPlugin[]>([]);
  const [editorState, setEditorState] = useState<EditorState>(
    initialEditorState || EditorState.createEmpty()
  );

  useMemo(() => {
    const plugin = DRAFTJS.editorPlugins.createHashtagPlugin(
      pluginConfig.hashtags
    );
    setEditorPlugins((prev) => [...prev, plugin]);
  }, [pluginConfig.hashtags]);

  const MentionSuggestionsComponent = useMemo(() => {
    const plugin = DRAFTJS.editorPlugins.createMentionPlugin(
      pluginConfig.mentions
    );
    setEditorPlugins((prev) => [...prev, plugin]);
    return plugin.MentionSuggestions;
  }, [pluginConfig.mentions]);

  const handleChangeEditorState = useCallback((_editorState: EditorState) => {
    setEditorState(_editorState);
  }, []);

  const handleChangeEditorFocus = (_focus: boolean) => {
    setIsEditorFocused(_focus);
  };

  useEffect(() => {
    if (initialEditorState) {
      setEditorState(initialEditorState);
    }
  }, [initialEditorState]);

  return (
    <TextEditorContext.Provider
      value={{
        editorKey: `editor-${remountKey}`,
        editorRef,
        editorState,
        editorPlugins,
        mentionsInterpolationStyle,
        isEditorFocused,
        onChangeEditorState: handleChangeEditorState,
        onChangeEditorFocus: handleChangeEditorFocus,
        mentionSuggestionsComponent: MentionSuggestionsComponent,
        onSaveContent: onSaveContent,
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
