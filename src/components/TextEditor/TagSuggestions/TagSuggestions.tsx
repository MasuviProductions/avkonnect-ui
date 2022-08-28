import { useCallback, useEffect, useState } from "react";
import { Box, GlobalStyles, Theme } from "@mui/material";
import { FunctionInterpolation, Interpolation } from "@emotion/react";
import { MentionData } from "@draft-js-plugins/mention";
import useSourceSearch from "../../../hooks/useSourceSearch";
import TagSuggestionsItem from "./TagSuggestionsItem";
import { decoratedLinkSx } from "../../../styles/sx";
import { useTextEditorContext } from "../../../contexts/TextEditorContext";
import DRAFTJS from "../../../utils/draftjs";

interface ITagSuggestionsProps {
  suggestionsInterpolationStyle?: Interpolation<Theme>;
}

const TagSuggestions: React.FC<ITagSuggestionsProps> = ({
  suggestionsInterpolationStyle,
}) => {
  const textEditorContext = useTextEditorContext();
  if (!textEditorContext) {
    throw Error("TextEditorContext not initialized");
  }

  const { mentionSuggestionsComponent: MentionSuggestions } = textEditorContext;

  const { upToDateUsersSearch, searchForSources } = useSourceSearch(2, false);
  const [searchText, setSearchText] = useState<string>("");
  const [suggestions, setSuggestions] = useState<MentionData[]>([]);
  const [mentionSuggestionOpen, setMentionSuggestionOpen] = useState(false);

  const onOpenChange = useCallback((_open: boolean) => {
    // if (_open === false) return;
    setMentionSuggestionOpen(_open);
  }, []);

  const onSearchChange = useCallback(({ value }: { value: string }) => {
    setSearchText(value);
  }, []);

  useEffect(() => {
    searchForSources(searchText);
  }, [searchForSources, searchText]);

  useEffect(() => {
    setSuggestions(
      upToDateUsersSearch.map((searchSuggestion) => ({
        id: searchSuggestion.id,
        name: searchSuggestion.name,
        title: searchSuggestion.headline,
        avatar: searchSuggestion.displayPictureUrl,
      }))
    );
  }, [upToDateUsersSearch]);

  return (
    <>
      <GlobalStyles
        styles={suggestionsInterpolationStyle || mentionPluginOverrideTheme}
      />
      <MentionSuggestions
        open={mentionSuggestionOpen}
        onOpenChange={onOpenChange}
        suggestions={suggestions}
        onSearchChange={onSearchChange}
        entryComponent={TagSuggestionsItem}
      />
    </>
  );
};

const mentionSuggestionsEntryTheme = (theme: Theme) => ({
  transition: `background-color 0.4s cubic-bezier(0.27, 1.27, 0.48, 0.56)`,

  ":active": {
    backgroundColor: theme.palette.secondary.main,
  },
});

// Theme interpolation override to add CSS classes for @draft-js-plugins/mention plugin
const mentionPluginOverrideTheme: Interpolation<Theme> = (theme: Theme) => ({
  [`.${DRAFTJS.editorPlugins.mentions.themeOption.mentionSuggestions}`]: {
    width: "100%",
    maxHeight: "300px",
    overflowY: "auto",
    paddingBottom: "8px",
  },

  [`.${DRAFTJS.editorPlugins.mentions.themeOption.mentionSuggestionsPopup}`]:
    {},
  [`.${DRAFTJS.editorPlugins.mentions.themeOption.mentionSuggestionsPopupVisible}`]:
    {
      border: `1px solid ${theme.palette.secondary.main}`,
    },

  [`.${DRAFTJS.editorPlugins.mentions.themeOption.mentionSuggestionsEntry}`]:
    mentionSuggestionsEntryTheme(theme),

  [`.${DRAFTJS.editorPlugins.mentions.themeOption.mentionSuggestionsEntryFocused}`]:
    {
      ...mentionSuggestionsEntryTheme(theme),
      backgroundColor: theme.palette.secondary.main,
    },

  [`.${DRAFTJS.editorPlugins.mentions.themeOption.mention}`]: {
    ...(decoratedLinkSx(16)(theme) as FunctionInterpolation<Theme>),
  },
});

export default TagSuggestions;
