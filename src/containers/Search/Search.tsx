import { Box, Container, Grid, Typography } from "@mui/material";
import { useEffect } from "react";
import LayoutCard from "../../components/LayoutCard";
import SpinLoader from "../../components/SpinLoader";
import UserMiniCard from "../../components/UserMiniCard";
import { LABELS } from "../../constants/labels";
import useSourceSearch from "../../hooks/useSourceSearch";
import { ReactFCWithSkeleton } from "../../interfaces/app";
import SearchSkeleton from "./SearchSkeleton";

interface SearchProps {
  searchString: string;
}

const Search: ReactFCWithSkeleton<SearchProps> = ({ searchString }) => {
  const {
    upToDateUsersSearch,
    searchForSources,
    getUsersSearchFetching,
    infiniteLoadRef,
  } = useSourceSearch(10, true);

  useEffect(() => {
    searchForSources(searchString);
  }, [searchForSources, searchString]);

  return (
    <>
      <Container>
        {searchString && !getUsersSearchFetching && (
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
          {getUsersSearchFetching && (
            <Grid item xs={12}>
              <SpinLoader isLoading={getUsersSearchFetching} />
            </Grid>
          )}
        </Grid>
      </Container>
    </>
  );
};

Search.Skeleton = SearchSkeleton;

export default Search;
