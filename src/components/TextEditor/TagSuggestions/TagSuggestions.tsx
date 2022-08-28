import { useCallback, useEffect, useState } from "react";
import { GlobalStyles } from "@mui/material";
import { MentionData } from "@draft-js-plugins/mention";
import useSourceSearch from "../../../hooks/useSourceSearch";
import TagSuggestionsItem from "./TagSuggestionsItem";
import { useTextEditorContext } from "../../../contexts/TextEditorContext";

interface ITagSuggestionsProps {}

const TagSuggestions: React.FC<ITagSuggestionsProps> = ({}) => {
  const textEditorContext = useTextEditorContext();
  if (!textEditorContext) {
    throw Error("TextEditorContext not initialized");
  }

  const {
    mentionSuggestionsComponent: MentionSuggestions,
    mentionsInterpolationStyle,
  } = textEditorContext;

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
      <GlobalStyles styles={mentionsInterpolationStyle} />
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

export default TagSuggestions;
