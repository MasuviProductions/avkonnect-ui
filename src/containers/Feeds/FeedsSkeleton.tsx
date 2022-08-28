import { Grid, Box, Skeleton, Container } from "@mui/material";
import LayoutCard from "../../components/LayoutCard";

const SingleFeedSkeleton: React.FC = () => {
  return (
    <Container maxWidth="sm">
      <LayoutCard>
        <Grid container p={2}>
          <Grid item xs={12}>
            <Grid container display="flex" alignItems="center">
              <Grid item mt={1} xs={1}>
                <Skeleton variant="circular" width={40} height={40} />
              </Grid>
              <Grid item xs={11}>
                <Grid container>
                  <Grid item mt={1} mx={1} xs={12}>
                    <Skeleton variant="rectangular" width="100%" height={30} />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} mt={1.5}>
            <Skeleton variant="rectangular" width={512} height={200} />
          </Grid>
        </Grid>
      </LayoutCard>
    </Container>
  );
};

const FeedsSkeleton: React.FC = () => {
  return (
    <Box mt={1}>
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

export default FeedsSkeleton;
