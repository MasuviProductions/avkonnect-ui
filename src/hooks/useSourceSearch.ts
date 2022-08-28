import { debounce } from "@mui/material";
import { useRef, useState, useEffect, useCallback } from "react";
import { useQuery } from "react-query";
import API_ENDPOINTS from "../constants/api";
import { useAuthContext } from "../contexts/AuthContext";
import { IUsersSearchApiResponse } from "../interfaces/api/external";
import { getUsersSearch } from "../utils/api";
import useInfiniteLoading from "./useInfiniteLoading";
import useRemountKey from "./useRemountKey";

const useSourceSearch = (limit: number, withInfiniteLoading: boolean) => {
  const { accessToken } = useAuthContext();

  const { remountKey } = useRemountKey(4);

  const [searchString, setSearchString] = useState<string>("");
  const [upToDateUsersSearch, setUpToDateUsersSearch] = useState<
    IUsersSearchApiResponse[]
  >([]);
  const [nextPageNumber, setNextPageNumber] = useState<number>(1);

  const {
    data: getUsersSearchData,
    isFetching: getUsersSearchFetching,
    refetch: triggerGetUsersApi,
    remove: clearGetUsersSearchQuery,
  } = useQuery(
    `${API_ENDPOINTS.USERS_SEARCH.key}-${remountKey}`,
    () =>
      getUsersSearch(
        accessToken as string,
        searchString,
        limit,
        nextPageNumber
      ),
    {
      enabled: false,
      cacheTime: 0,
      refetchInterval: false,
      refetchOnWindowFocus: false,
    }
  );

  const searchDebouncer = useRef(
    debounce((newSearchString: string) => setSearchString(newSearchString))
  );

  const infiniteLoadCallback = useCallback(() => {
    if (withInfiniteLoading && nextPageNumber) {
      if (getUsersSearchData?.data?.length) {
        triggerGetUsersApi();
      }
    }
  }, [
    getUsersSearchData?.data?.length,
    nextPageNumber,
    triggerGetUsersApi,
    withInfiniteLoading,
  ]);

  const infiniteLoadRef = useInfiniteLoading(
    getUsersSearchFetching,
    infiniteLoadCallback
  );

  const searchForSources = useCallback((text: string) => {
    searchDebouncer.current(text);
  }, []);

  useEffect(() => {
    if (searchString) {
      setUpToDateUsersSearch([]);
      setNextPageNumber(1);
      triggerGetUsersApi();
    }
  }, [triggerGetUsersApi, searchString]);

  useEffect(() => {
    if (!searchString) {
      setUpToDateUsersSearch([]);
      clearGetUsersSearchQuery();
    }
  }, [clearGetUsersSearchQuery, searchString]);

  useEffect(() => {
    if (getUsersSearchData) {
      setUpToDateUsersSearch((prev) => [
        ...prev,
        ...(getUsersSearchData?.data as IUsersSearchApiResponse[]),
      ]);

      if (withInfiniteLoading) {
        setNextPageNumber((prev) =>
          getUsersSearchData?.pagination?.totalPages === prev + 1 ? prev + 1 : 0
        );
      }
    }
  }, [getUsersSearchData, withInfiniteLoading]);

  return {
    upToDateUsersSearch,
    getUsersSearchFetching,
    triggerGetUsersApi,
    searchForSources,
    infiniteLoadRef,
  };
};

export default useSourceSearch;
