import { EditorState, convertToRaw, Modifier } from "draft-js";
import createMentionPlugin, { MentionData } from "@draft-js-plugins/mention";

import createHashtagPlugin from "@draft-js-plugins/hashtag";

import { HASHTAG_REGEX } from "../constants/app";
import { IRelatedSource } from "../interfaces/api/external";
import { FunctionInterpolation, Interpolation } from "@emotion/react";
import { Theme } from "@mui/material";
import { decoratedLinkSx } from "../styles/sx";

const getPlainText = (editorState: EditorState): string => {
  const currentContent = editorState.getCurrentContent();
  let plainText = "";
  currentContent.getBlocksAsArray().forEach((item) => {
    plainText = item.getText() + plainText;
  });
  return plainText;
};

const getMentionSources = (editorState: EditorState): MentionData[] => {
  const currentContent = editorState.getCurrentContent();
  const contentEntityMap = convertToRaw(currentContent).entityMap;
  const mentionedSources = Object.values(contentEntityMap).map((entity) => {
    return entity.data.mention as MentionData;
  });
  return mentionedSources;
};

const getContentTextWithParsedMentions = (
  editorState: EditorState,
  contentText: string
): string => {
  let contentTextWithParsedMentions = contentText;
  const mentionedSources = getMentionSources(editorState);
  mentionedSources.forEach((source) => {
    contentTextWithParsedMentions = contentTextWithParsedMentions.replace(
      `@${source.name}`,
      `@user_${source.id}`
    );
  });
  return contentTextWithParsedMentions;
};

const getContentText = (editorState: EditorState): string => {
  const plainText = getPlainText(editorState);
  let contentText = plainText;
  contentText = getContentTextWithParsedMentions(editorState, contentText);
  return contentText;
};

const getStringifiedRawText = (editorState: EditorState): string => {
  const stringifiedRawState = JSON.stringify(
    convertToRaw(editorState.getCurrentContent())
  );
  return stringifiedRawState;
};

const getNewEditorStateWithMention = (mentionedSource: IRelatedSource) => {
  const newEditorState = EditorState.createEmpty();
  const stateWithEntity = newEditorState
    .getCurrentContent()
    .createEntity("mention", "IMMUTABLE", {
      mention: {
        id: mentionedSource.id,
        name: mentionedSource.name,
        title: mentionedSource.headline,
        avatar: mentionedSource.displayPictureUrl,
      },
    });
  const editorContent = Modifier.insertText(
    stateWithEntity,
    newEditorState.getSelection(),
    `@${mentionedSource.name}`,
    undefined,
    stateWithEntity.getLastCreatedEntityKey()
  );
  return EditorState.createWithContent(editorContent);
};

const getAllHashtagsFromPlainText = (text: string): string[] => {
  const hashtagMatches = text.match(HASHTAG_REGEX) || [];
  const hashtags = hashtagMatches.map((hashtag) => hashtag.replace("#", ""));
  return hashtags;
};

const mentionsPluginThemeOption = {
  mention: "mention",
  mentionSuggestions: "mentionSuggestions",
  mentionSuggestionsPopup: "mentionSuggestionsPopup",
  mentionSuggestionsPopupVisible: "mentionSuggestionsPopupVisible",
  mentionSuggestionsEntry: "mentionSuggestionsEntry",
  mentionSuggestionsEntryFocused: "mentionSuggestionsEntryFocused",
};

const postMentionsPlugin = createMentionPlugin({
  entityMutability: "IMMUTABLE",
  theme: mentionsPluginThemeOption,
  mentionPrefix: "@",
  supportWhitespace: true,
  popperOptions: {
    strategy: "absolute",
    placement: "bottom",
    modifiers: [
      {
        name: "flip",
        options: {
          fallbackPlacements: ["bottom"],
        },
      },
      {
        name: "offset",
        options: {
          offset: [0, 10],
        },
      },
    ],
  },
});

const commentMentionsPlugin = createMentionPlugin({
  entityMutability: "IMMUTABLE",
  theme: mentionsPluginThemeOption,
  mentionPrefix: "@",
  supportWhitespace: true,
  popperOptions: {
    strategy: "absolute",
    placement: "top-start",
    modifiers: [
      {
        name: "offset",
        options: {
          offset: [0, 15],
        },
      },
    ],
  },
});

const mentionSuggestionsEntryTheme = (theme: Theme) => ({
  transition: `background-color 0.4s cubic-bezier(0.27, 1.27, 0.48, 0.56)`,
  backgroundColor: theme.palette.background.paper,

  ":active": {
    backgroundColor: theme.palette.secondary.main,
  },
});

// Theme interpolation override to add CSS classes for @draft-js-plugins/mention plugin
const postMentionPluginOverrideTheme: Interpolation<Theme> = (
  theme: Theme
) => ({
  [`.${mentionsPluginThemeOption.mentionSuggestions}`]: {
    width: "100%",
    maxHeight: "300px",
    overflowY: "auto",
    paddingBottom: "8px",
  },

  [`.${mentionsPluginThemeOption.mentionSuggestionsPopup}`]: {},
  [`.${mentionsPluginThemeOption.mentionSuggestionsPopupVisible}`]: {
    border: `1px solid ${theme.palette.secondary.main}`,
  },

  [`.${mentionsPluginThemeOption.mentionSuggestionsEntry}`]:
    mentionSuggestionsEntryTheme(theme),

  [`.${mentionsPluginThemeOption.mentionSuggestionsEntryFocused}`]: {
    ...mentionSuggestionsEntryTheme(theme),
    backgroundColor: theme.palette.secondary.main,
  },

  [`.${mentionsPluginThemeOption.mention}`]: {
    ...(decoratedLinkSx(16)(theme) as FunctionInterpolation<Theme>),
  },
});

const commentMentionPluginOverrideTheme: Interpolation<Theme> = (
  theme: Theme
) => ({
  [`.${mentionsPluginThemeOption.mentionSuggestions}`]: {
    width: "300px",
    maxHeight: "400px",
    overflowY: "auto",
  },

  [`.${mentionsPluginThemeOption.mentionSuggestionsPopup}`]: {},
  [`.${mentionsPluginThemeOption.mentionSuggestionsPopupVisible}`]: {
    border: `1px solid ${theme.palette.secondary.main}`,
    backgroundColor: theme.palette.background.paper,
    boxShadow:
      "0px 1px 2px 0px rgb(60 64 67 / 30%), 0px 2px 6px 2px rgb(60 64 67 / 15%)",
    borderRadius: "0.4rem",

    [theme.breakpoints.down("sm")]: {
      borderRadius: "0",
      minHeight: "200px",
    },
  },

  [`.${mentionsPluginThemeOption.mentionSuggestionsEntry}`]:
    mentionSuggestionsEntryTheme(theme),

  [`.${mentionsPluginThemeOption.mentionSuggestionsEntryFocused}`]: {
    ...mentionSuggestionsEntryTheme(theme),
    backgroundColor: theme.palette.secondary.main,
  },

  [`.${mentionsPluginThemeOption.mention}`]: {
    ...(decoratedLinkSx(16)(theme) as FunctionInterpolation<Theme>),
  },
});

const hashtagsPluginThemeOption = {
  hashtag: "hashtag",
};

const hashtagsPlugin = createHashtagPlugin({
  theme: hashtagsPluginThemeOption,
});

const utils = {
  getStringifiedRawText,
  getContentText,
  getAllHashtagsFromPlainText,
  getNewEditorStateWithMention,
};

const editorPlugins = {
  postMentions: {
    plugin: postMentionsPlugin,
    themeOption: mentionsPluginThemeOption,
    theme: postMentionPluginOverrideTheme,
  },
  commentMentions: {
    plugin: commentMentionsPlugin,
    themeOptions: mentionsPluginThemeOption,
    theme: commentMentionPluginOverrideTheme,
  },
  hashtags: {
    plugin: hashtagsPlugin,
    themeOption: hashtagsPluginThemeOption,
  },
};

const DRAFTJS = {
  utils,
  editorPlugins,
};

export default DRAFTJS;
