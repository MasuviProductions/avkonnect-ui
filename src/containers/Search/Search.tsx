import { Box, Container, Grid, Typography } from "@mui/material";
import { useCallback } from "react";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import LayoutCard from "../../components/LayoutCard";
import UserMiniCard from "../../components/UserMiniCard";
import API_ENDPOINTS from "../../constants/api";
import { LABELS } from "../../constants/labels";
import { useAuthContext } from "../../contexts/AuthContext";
import useInfiniteLoading from "../../hooks/useInfiniteLoading";
import { IUsersSearchApiResponse } from "../../interfaces/api/external";
import { ReactFCWithSkeleton } from "../../interfaces/app";
import { getUsersSearch } from "../../utils/api";
import SearchSkeleton from "./SearchSkeleton";

interface SearchProps {
  searchString: string;
}

const Search: ReactFCWithSkeleton<SearchProps> = ({ searchString }) => {
  const { accessToken } = useAuthContext();
  const [nextSearchStartId, setNextSearchStartId] = useState<string>();
  const [upToDateUsersSearch, setUpToDateUsersSearch] = useState<
    IUsersSearchApiResponse[]
  >([]);

  const {
    data: getUsersSearchData,
    isFetching: getUsersSearchDataFetching,
    refetch: triggerGetUsersApi,
  } = useQuery(
    `${API_ENDPOINTS.USER_SKILLS.key}?${searchString} `,
    () =>
      getUsersSearch(
        accessToken as string,
        searchString,
        12,
        nextSearchStartId
      ),
    { refetchOnWindowFocus: false, cacheTime: 0 }
  );

  const infiniteLoadCallback = useCallback(() => {
    if (nextSearchStartId) {
      triggerGetUsersApi();
    }
  }, [nextSearchStartId, triggerGetUsersApi]);

  const infiniteLoadRef = useInfiniteLoading(
    getUsersSearchDataFetching,
    infiniteLoadCallback
  );

  useEffect(() => {
    if (getUsersSearchData) {
      setUpToDateUsersSearch((prev) => [
        ...prev,
        ...(getUsersSearchData?.data as IUsersSearchApiResponse[]),
      ]);
      setNextSearchStartId(
        getUsersSearchData?.dDBPagination?.nextSearchStartFromId
      );
    }
  }, [getUsersSearchData]);

  useEffect(() => {
    setUpToDateUsersSearch([]);
  }, [searchString]);

  return (
    <>
      <Container>
        {searchString && !getUsersSearchDataFetching && (
          <Box my={3}>
            <Typography variant="h5">{`${
              upToDateUsersSearch.length > 0
                ? LABELS.SEARCH_RESULTS_FOR
                : LABELS.SEARCH_NO_RESULTS_FOR
            } "${decodeURIComponent(searchString)}"`}</Typography>
          </Box>
        )}
        <Grid container spacing={2} mt={2}>
          {upToDateUsersSearch.map((user, index) => (
            <Grid
              item
              xs={12}
              sm={6}
              md={4}
              key={user.id}
              ref={
                index === upToDateUsersSearch.length - 1
                  ? infiniteLoadRef
                  : undefined
              }
            >
              <LayoutCard>
                <Box p={2}>
                  <UserMiniCard
                    id={user.id}
                    name={user.name}
                    headline={user.headline}
                    displayPictureUrl={user.displayPictureUrl}
                  />
                </Box>
              </LayoutCard>
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
};

Search.Skeleton = SearchSkeleton;

export default Search;
