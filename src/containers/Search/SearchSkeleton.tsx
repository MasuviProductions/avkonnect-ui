import { Box, Grid, Skeleton } from "@mui/material";
import React from "react";
import LayoutCard from "../../components/LayoutCard";
import UserMiniCardSkeleton from "../../components/UserMiniCard/UserMiniCardSkeleton";

const SearchSkeleton: React.FC = () => {
  return (
    <>
      <Grid container mt={2}>
        <Grid xs={12} p={2}>
          <Grid item>
            <LayoutCard>
              <Box p={2}>
                <Skeleton variant="rectangular" width={250} height={20} />
              </Box>
            </LayoutCard>
          </Grid>
        </Grid>
        {Array(12)
          .fill(undefined)
          .map((_, index) => (
            <Grid
              key={`search-skeleton-${index}`}
              p={3}
              item
              xs={12}
              sm={6}
              md={4}
            >
              <UserMiniCardSkeleton />
            </Grid>
          ))}
      </Grid>
    </>
  );
};

export default SearchSkeleton;
