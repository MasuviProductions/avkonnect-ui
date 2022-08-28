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
import { Interpolation } from "@emotion/react";
import DRAFTJS from "../../utils/draftjs";

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
    throw Error("TextEditorContext not initialized");
  }

  const {
    editorKey,
    editorRef,
    editorState,
    editorPlugins,
    isEditorFocused,
    onChangeEditorState,
    onChangeEditorFocus,
  } = textEditorContext;

  const onChangeFocus = (_isFocused: boolean) => () => {
    onChangeEditorFocus(_isFocused);
  };

  const onElementFocus = () => {
    editorRef.current!.focus();
  };

  console.log("editorState:", editorState);

  return (
    <>
      <Box onClick={onElementFocus} sx={editorContainerSx(isEditorFocused)}>
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

const hashtagPluginOverrideTheme: Interpolation<Theme> = (theme: Theme) => ({
  [`.${DRAFTJS.editorPlugins.hashtags.themeOption.hashtag}`]: {
    color: theme.palette.text.link,
  },
});

export default TextEditor;
