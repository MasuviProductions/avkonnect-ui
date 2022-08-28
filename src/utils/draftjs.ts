import { EditorState, convertToRaw } from "draft-js";
import createMentionPlugin, { MentionData } from "@draft-js-plugins/mention";

import createHashtagPlugin from "@draft-js-plugins/hashtag";

import { HASHTAG_REGEX } from "../constants/app";

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

const mentionsPlugin = createMentionPlugin({
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
};

const editorPlugins = {
  mentions: {
    plugin: mentionsPlugin,
    themeOption: mentionsPluginThemeOption,
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
