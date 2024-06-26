import {
  Box,
  Button,
  ClickAwayListener,
  Grid,
  Hidden,
  IconButton,
  InputBase,
  Paper,
  Theme,
  Typography,
} from "@mui/material";
import { useRouter } from "next/router";
import SearchIcon from "@mui/icons-material/Search";
import { useState, useCallback, useEffect, ChangeEvent, useRef } from "react";
import { useQuery } from "react-query";
import API_ENDPOINTS from "../../../constants/api";
import { useAuthContext } from "../../../contexts/AuthContext";
import { getUsersSearch } from "../../../utils/api";
import { debounce } from "../../../utils/generic";
import { LABELS } from "../../../constants/labels";
import LayoutCard from "../../../components/LayoutCard";
import { SxProps } from "@mui/system";
import { APP_ROUTES, MAX_SEARCH_DROPDOWN_LIMIT } from "../../../constants/app";
import { IUsersSearchApiResponse } from "../../../interfaces/api/external";
import SearchedUserItem from "./SearchedUserItem";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { compile } from "path-to-regexp";
import { useMemo } from "react";

interface ISearchBarProps {}

const SearchBar: React.FC<ISearchBarProps> = () => {
  const router = useRouter();
  const { accessToken } = useAuthContext();
  const [showSearchDropdown, setShowSearchDropdown] = useState<boolean>(false);
  const [showSearchTextField, setShowSearchTextField] =
    useState<boolean>(false);
  const [searchText, setSearchText] = useState<string>("");
  const [searchString, setSearchString] = useState<string>("");
  const [userSearchData, setUserSearchData] = useState<
    IUsersSearchApiResponse[]
  >([]);

  const {
    data: getUsersSearchData,
    isFetching,
    refetch: triggerGetUsersApi,
  } = useQuery(
    `dropdown-${API_ENDPOINTS.USERS_SEARCH.key}`,
    () =>
      getUsersSearch(
        accessToken as string,
        searchString,
        1,
        MAX_SEARCH_DROPDOWN_LIMIT
      ),
    { enabled: false, cacheTime: 0 }
  );

  const searchDebouncer = useRef(
    debounce((newSearchString: string) => setSearchString(newSearchString))
  );

  const handleSearchDropdownOpen = useCallback(() => {
    setShowSearchDropdown(true);
  }, []);

  const handleSearchDropdownClose = useCallback(() => {
    setShowSearchDropdown(false);
  }, []);

  const handleSearchTextFieldOpen = useCallback(() => {
    setShowSearchTextField(true);
  }, []);

  const handleSearchTextFieldClose = useCallback(() => {
    handleSearchDropdownClose();
    setShowSearchTextField(false);
  }, [handleSearchDropdownClose]);

  const handleSearchTextChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.target.value);
  };

  const handleSearch = useCallback(() => {
    if (searchText) {
      handleSearchDropdownClose();
      const searchRoute = compile(APP_ROUTES.SEARCH.route)({
        key: encodeURI(searchText),
      });
      handleSearchTextFieldClose();
      router.push(searchRoute);
    }
  }, [
    handleSearchDropdownClose,
    router,
    searchText,
    handleSearchTextFieldClose,
  ]);

  const handleSearchKeyDown = useCallback(
    (event: any) => {
      if (event.keyCode === 13) {
        event.target.blur();
        handleSearch();
      }
    },
    [handleSearch]
  );

  const handleSearchItemClick = () => {
    setShowSearchDropdown(false);
    handleSearchTextFieldClose();
  };

  useEffect(() => {
    searchDebouncer.current(searchText);
  }, [searchText]);

  useEffect(() => {
    if (searchString) {
      triggerGetUsersApi();
    }
  }, [triggerGetUsersApi, searchString]);

  useEffect(() => {
    if (!searchString) {
      setUserSearchData([]);
    }
  }, [searchString]);

  useEffect(() => {
    if (getUsersSearchData?.data) {
      setUserSearchData(getUsersSearchData.data as IUsersSearchApiResponse[]);
    }
  }, [getUsersSearchData, handleSearchDropdownOpen, isFetching]);

  const searchFieldComponent = useMemo(() => {
    return (
      <Paper sx={searchBarContainer}>
        <IconButton onClick={handleSearch} sx={{ p: 1 }} aria-label="search">
          <SearchIcon />
        </IconButton>
        <InputBase
          sx={searchBarTextfield}
          placeholder={LABELS.SEARCH_FOR}
          inputProps={{ "aria-label": "search" }}
          value={searchText}
          onChange={handleSearchTextChange}
          onKeyDown={handleSearchKeyDown}
          onFocus={handleSearchDropdownOpen}
        />
      </Paper>
    );
  }, [handleSearch, handleSearchDropdownOpen, handleSearchKeyDown, searchText]);

  return (
    <>
      <ClickAwayListener onClickAway={handleSearchDropdownClose}>
        <Box>
          <Hidden smDown>{searchFieldComponent}</Hidden>

          <Hidden smUp>
            <IconButton onClick={handleSearchTextFieldOpen}>
              <SearchIcon fontSize="large" sx={iconColor} />
            </IconButton>

            {showSearchTextField && (
              <Box sx={searchFieldMobileContainer}>
                <Grid container alignItems="center">
                  <Grid item>
                    <IconButton onClick={handleSearchTextFieldClose}>
                      <ArrowBackIcon fontSize="large" sx={iconColor} />
                    </IconButton>
                  </Grid>
                  <Grid item ml={2} xs={8}>
                    {searchFieldComponent}
                  </Grid>
                </Grid>
              </Box>
            )}
          </Hidden>

          {showSearchDropdown && (
            <Box sx={searchDropdownContainer}>
              <LayoutCard withBorder>
                <Grid container sx={searchDropdown}>
                  {userSearchData.map((user) => (
                    <Grid item xs={12} key={user.id} p={1}>
                      <SearchedUserItem
                        id={user.id}
                        name={user.name}
                        headline={user.headline}
                        displayPictureUrl={user.displayPictureUrl}
                        onSearchItemClick={handleSearchItemClick}
                      />
                    </Grid>
                  ))}
                  {userSearchData.length <= 0 && !searchString && (
                    <Grid p={1}>
                      <Typography variant="body2" color="text.secondary" p={1}>
                        {LABELS.SEARCH_TEXT}
                      </Typography>
                    </Grid>
                  )}

                  {searchString && (
                    <Button onClick={handleSearch} sx={showResultsButton}>
                      {LABELS.SEARCH_ALL_RESULTS}
                    </Button>
                  )}
                </Grid>
              </LayoutCard>
            </Box>
          )}
        </Box>
      </ClickAwayListener>
    </>
  );
};

const searchDropdownContainer: SxProps<Theme> = (theme: Theme) => ({
  position: "absolute",
  width: 380,
  [theme.breakpoints.down("sm")]: {
    left: 0,
    width: "100%",
  },
  top: "60px",
  zIndex: 1,
});

const searchBarContainer: SxProps<Theme> = (theme: Theme) => ({
  p: "2px 4px",
  display: "flex",
  alignItems: "center",
  width: 250,
  [theme.breakpoints.down("sm")]: {
    width: "100%",
  },
  backgroundColor: "navbar.contrastText",
  color: "navbar.main",
});

const showResultsButton: SxProps<Theme> = (theme: Theme) => ({
  width: "100%",
  padding: 2,
});

const searchBarTextfield: SxProps<Theme> = (theme: Theme) => ({
  ml: 1,
  flex: 1,
  color: "navbar.main",
});

const iconColor: SxProps<Theme> = (theme: Theme) => ({
  color: "navbar.contrastText",
});

const searchFieldMobileContainer: SxProps<Theme> = (theme: Theme) => ({
  position: "fixed",
  width: "100vw",
  zIndex: 1,
  top: 0,
  left: 0,
  backgroundColor: "navbar.main",
  padding: 1,
});

const searchDropdown: SxProps<Theme> = (theme: Theme) => ({
  [theme.breakpoints.down("sm")]: {
    padding: 2,
  },
});

export default SearchBar;
