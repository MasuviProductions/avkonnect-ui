import {
  EditorState,
  convertToRaw,
  RawDraftEntityRange,
  ContentState,
  RawDraftEntity,
  convertFromRaw,
} from "draft-js";
import createMentionPlugin, {
  MentionData,
  MentionPluginConfig,
} from "@draft-js-plugins/mention";
import createHashtagPlugin, {
  HashtagPluginConfig,
} from "@draft-js-plugins/hashtag";

import { HASHTAG_REGEX } from "../constants/app";
import { IRelatedSource } from "../interfaces/api/external";
import { FunctionInterpolation, Interpolation } from "@emotion/react";
import { Theme } from "@mui/material";
import { coloredLinkSx } from "../styles/sx";

const getPlainText = (editorState: EditorState): string => {
  const currentContent = editorState.getCurrentContent();
  let plainText = "";
  currentContent.getBlocksAsArray().forEach((item) => {
    plainText += item.getText() + "\n";
  });
  return plainText;
};

const getMentionSources = (
  editorState: EditorState
): {
  mentionedPositions: RawDraftEntityRange[];
  mentionedSources: MentionData[];
} => {
  const currentContent = editorState.getCurrentContent();
  const rawContentState = convertToRaw(currentContent);
  const contentEntityMap = rawContentState.entityMap;
  const mentionedSources = Object.values(contentEntityMap).map((entity) => {
    return entity.data.mention as MentionData;
  });

  return {
    mentionedPositions: rawContentState.blocks[0].entityRanges,
    mentionedSources,
  };
};

const getContentTextWithParsedMentions = (
  editorState: EditorState,
  contentText: string
): string => {
  let contentTextWithParsedMentions = contentText;
  const { mentionedPositions, mentionedSources } =
    getMentionSources(editorState);
  for (let index = mentionedPositions.length - 1; index >= 0; index -= 1) {
    const startIndex = mentionedPositions[index].offset;
    const endIndex = startIndex + mentionedPositions[index].length;

    contentTextWithParsedMentions =
      contentTextWithParsedMentions.substring(0, startIndex) +
      `@user_${mentionedSources[index].id}` +
      contentTextWithParsedMentions.substring(
        endIndex,
        contentTextWithParsedMentions.length
      );
  }
  return contentTextWithParsedMentions;
};

const getContentText = (editorState: EditorState): string => {
  const plainText = getPlainText(editorState);
  let contentText = plainText;
  contentText = getContentTextWithParsedMentions(editorState, contentText);
  return contentText;
};

const getContentStateFromStringifiedRawContentState = (
  stringifiedRawContentState: string
): ContentState => {
  return convertFromRaw(JSON.parse(stringifiedRawContentState));
};

const getStringifiedRawText = (editorState: EditorState): string => {
  const stringifiedRawState = JSON.stringify(
    convertToRaw(editorState.getCurrentContent())
  );
  return stringifiedRawState;
};

const getNewContentState = (mentionedSource?: IRelatedSource): ContentState => {
  if (!mentionedSource) {
    return ContentState.createFromText("");
  }
  const rawContent = convertToRaw(
    ContentState.createFromText(mentionedSource.name)
  );
  const rawState: RawDraftEntity = {
    type: "mention",
    mutability: "IMMUTABLE",
    data: {
      mention: {
        id: mentionedSource.id,
        name: mentionedSource.name,
        title: mentionedSource.headline,
        avatar: mentionedSource.displayPictureUrl,
      },
    },
  };
  const entityRanges: RawDraftEntityRange[] = [
    { key: 0, offset: 0, length: mentionedSource.name.length },
  ];
  rawContent.entityMap = { ["0"]: rawState };
  rawContent.blocks = [{ ...rawContent.blocks[0], entityRanges }];
  return convertFromRaw(rawContent);
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

const postMentionsPluginConfig: MentionPluginConfig = {
  entityMutability: "IMMUTABLE",
  theme: mentionsPluginThemeOption,
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
};

const commentMentionsPluginConfig: MentionPluginConfig = {
  entityMutability: "IMMUTABLE",
  theme: mentionsPluginThemeOption,
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
};

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
    ...(coloredLinkSx(16)(theme) as FunctionInterpolation<Theme>),
  },
});

const commentMentionPluginOverrideTheme: Interpolation<Theme> = (
  theme: Theme
) => ({
  [`.${mentionsPluginThemeOption.mentionSuggestions}`]: {
    position: "absolute",
    width: "300px",
    maxHeight: "400px",
    overflowY: "auto",
    zIndex: 1,
  },

  [`.${mentionsPluginThemeOption.mentionSuggestionsPopup}`]: {},
  [`.${mentionsPluginThemeOption.mentionSuggestionsPopupVisible}`]: {
    zIndex: 2,
    backgroundColor: theme.palette.background.paper,
    border: `1px solid ${theme.palette.secondary.main}`,
    borderRadius: "0.4rem",
    boxShadow:
      "0px 1px 2px 0px rgb(60 64 67 / 30%), 0px 2px 6px 2px rgb(60 64 67 / 15%)",

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
    ...(coloredLinkSx(14)(theme) as FunctionInterpolation<Theme>),
  },
});

const hashtagsPluginThemeOption = {
  hashtag: "hashtag",
};

const hashtagsPluginConfig: HashtagPluginConfig = {
  theme: hashtagsPluginThemeOption,
};

const postHashtagsPluginOverrideTheme: Interpolation<Theme> = (
  theme: Theme
) => ({
  [`.${hashtagsPluginThemeOption.hashtag}`]: {
    ...(coloredLinkSx(16)(theme) as FunctionInterpolation<Theme>),
  },
});

const commentHashtagsPluginOverrideTheme: Interpolation<Theme> = (
  theme: Theme
) => ({
  [`.${hashtagsPluginThemeOption.hashtag}`]: {
    ...(coloredLinkSx(14)(theme) as FunctionInterpolation<Theme>),
  },
});

const utils = {
  getContentStateFromStringifiedRawContentState,
  getStringifiedRawText,
  getContentText,
  getAllHashtagsFromPlainText,
  getNewContentState,
};

const editorPlugins = {
  createMentionPlugin,
  createHashtagPlugin,

  postMentions: {
    pluginConfig: postMentionsPluginConfig,
    themeOption: mentionsPluginThemeOption,
    theme: postMentionPluginOverrideTheme,
  },
  commentMentions: {
    pluginConfig: commentMentionsPluginConfig,
    themeOption: mentionsPluginThemeOption,
    theme: commentMentionPluginOverrideTheme,
  },
  postHashtags: {
    pluginConfig: hashtagsPluginConfig,
    themeOption: hashtagsPluginThemeOption,
    theme: postHashtagsPluginOverrideTheme,
  },
  commentHashtags: {
    pluginConfig: hashtagsPluginConfig,
    themeOption: hashtagsPluginThemeOption,
    theme: commentHashtagsPluginOverrideTheme,
  },
};

const DRAFTJS = {
  utils,
  editorPlugins,
};

export default DRAFTJS;
