import { Grid, Skeleton } from "@mui/material";
import LayoutCard from "../../LayoutCard";

const UserConnectionCardSkeleton: React.FC = () => {
  return (
    <>
      <LayoutCard withBorder>
        <Grid
          container
          justifyContent="space-between"
          alignItems="center"
          p={3}
        >
          <Grid item xs={12}>
            <Grid
              container
              flexDirection="column"
              spacing={2}
              alignItems="center"
            >
              <Grid item>
                <Skeleton variant="circular" width={100} height={100} />
              </Grid>
              <Grid item>
                <Skeleton variant="rectangular" width={80} height={10} />
              </Grid>
              <Grid item>
                <Skeleton variant="rectangular" width={120} height={10} />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </LayoutCard>
    </>
  );
};

export default UserConnectionCardSkeleton;
