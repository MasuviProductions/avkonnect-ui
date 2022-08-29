import {
  ComponentType,
  createContext,
  RefObject,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { EditorState } from "draft-js";
import Editor, { EditorPlugin } from "@draft-js-plugins/editor";
import { MentionSuggestionsPubProps } from "@draft-js-plugins/mention/lib/MentionSuggestions/MentionSuggestions";

import useRemountKey from "../hooks/useRemountKey";
import { IPostRequestContentApiModel } from "../interfaces/api/external";
import { Interpolation } from "@emotion/react";
import { Theme } from "@mui/material";

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
  plugins: {
    hashtags: EditorPlugin;
    mentions: EditorPlugin & {
      MentionSuggestions: ComponentType<MentionSuggestionsPubProps>;
    };
  };
  mentionsInterpolationStyle: Interpolation<Theme>;
  onSaveContent: (
    content: IPostRequestContentApiModel,
    hashtags?: string[]
  ) => void;
}

const TextEditorProvider: React.FC<ITextEditorProvider> = ({
  initialEditorState,
  plugins,
  mentionsInterpolationStyle,
  onSaveContent,
  children,
}) => {
  const editorRef = useRef<Editor>(null);

  const { remountKey } = useRemountKey(5);

  const [editorState, setEditorState] = useState<EditorState>(
    initialEditorState || EditorState.createEmpty()
  );

  const [isEditorFocused, setIsEditorFocused] = useState<boolean>(false);

  const editorPlugins = [plugins.hashtags, plugins.mentions];

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
        mentionSuggestionsComponent: plugins.mentions.MentionSuggestions,
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
