import React from "react";
import { Box, Theme } from "@mui/material";
import { SystemStyleObject } from "@mui/system";
import Editor from "@draft-js-plugins/editor";
// Internal dependencies
import TagSuggestions from "./TagSuggestions";
import HashtagsInit from "./HashtagsInit";
import { useTextEditorContext } from "../../contexts/TextEditorContext";
// Styles
import "draft-js/dist/Draft.css";
import { LABELS } from "../../constants/labels";

interface ITextEditorProps {
  palceholder: string;
  editorContainerSx: (
    isFocused: boolean
  ) => (theme: Theme) => SystemStyleObject<Theme>;
}

const TextEditor: React.FC<ITextEditorProps> = ({
  palceholder,
  editorContainerSx,
}) => {
  const textEditorContext = useTextEditorContext();
  if (!textEditorContext) {
    throw Error(LABELS.TEXT_EDITOR_CONTEXT_UNINITIALIZED);
  }

  const {
    editorKey,
    editorRef,
    editorState,
    editorPlugins,
    isEditorFocused,
    onChangeEditorState,
    onChangeEditorFocus,
    focusEditor,
  } = textEditorContext;

  const onChangeFocus = (_isFocused: boolean) => () => {
    onChangeEditorFocus(_isFocused);
  };

  return (
    <>
      <Box onClick={focusEditor} sx={editorContainerSx(isEditorFocused)}>
        <HashtagsInit />
        <TagSuggestions />
        <Editor
          editorKey={`content-text-field-${editorKey}`}
          editorState={editorState}
          onChange={onChangeEditorState}
          plugins={editorPlugins}
          ref={editorRef}
          placeholder={palceholder}
          onFocus={onChangeFocus(true)}
          onBlur={onChangeFocus(false)}
        />
      </Box>
    </>
  );
};

export default TextEditor;
