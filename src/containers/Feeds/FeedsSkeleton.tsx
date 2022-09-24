import { Grid, Box, Skeleton, Container, Theme, SxProps } from "@mui/material";
import LayoutCard from "../../components/LayoutCard";

export const SingleFeedSkeleton: React.FC = () => {
  return (
    <Container maxWidth="sm" sx={containerSx}>
      <LayoutCard>
        <Grid container p={2}>
          <Grid item xs={12}>
            <Grid container spacing={4} alignItems="center">
              <Grid item mt={1} md={1.3} sm={1} xs={2}>
                <Skeleton variant="circular" width={40} height={40} />
              </Grid>
              <Grid item mt={1} md={10.6} sm={11} xs={10}>
                <Skeleton variant="rectangular" width="100%" height={30} />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} mt={1.5}>
            <Skeleton variant="rectangular" width="100%" height={200} />
          </Grid>
        </Grid>
      </LayoutCard>
    </Container>
  );
};

const FeedsSkeleton: React.FC = () => {
  return (
    <Box mt={2}>
      <Box>
        <SingleFeedSkeleton />
      </Box>
      <Box pt={2}>
        <SingleFeedSkeleton />
      </Box>
      <Box pt={2}>
        <SingleFeedSkeleton />
      </Box>
      <Box pt={2}>
        <SingleFeedSkeleton />
      </Box>
    </Box>
  );
};

const containerSx: SxProps<Theme> = (theme: Theme) => ({
  [theme.breakpoints.down("sm")]: {
    padding: "0px",
  },
});

export default FeedsSkeleton;
