import { Grid, Skeleton } from "@mui/material";
import LayoutCard from "../LayoutCard";

const VerticalUserMiniCardSkeleton: React.FC = () => {
  return (
    <>
      <LayoutCard>
        <Grid container justifyContent="center" alignItems="center">
          <Grid pb={2} item>
            <Skeleton variant="circular" width={80} height={80} />
          </Grid>
          <Grid item>
            <Grid
              container
              direction="column"
              justifyContent="center"
              alignItems="center"
              spacing={2}
            >
              <Grid item xs={12}>
                <Skeleton variant="rectangular" width={120} height={12} />
              </Grid>
              <Grid item xs={12}>
                <Skeleton variant="rectangular" width={150} height={8} />
              </Grid>
            </Grid>
            <Grid
              item
              container
              pt={2}
              direction="column"
              justifyContent="center"
              alignItems="center"
            >
              <Grid item xs={12}>
                <Skeleton variant="rectangular" width={100} height={20} />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </LayoutCard>
    </>
  );
};

export default VerticalUserMiniCardSkeleton;
