import { Grid, Skeleton } from "@mui/material";
import LayoutCard from "../LayoutCard";

const UserMiniCardSkeleton: React.FC = () => {
  return (
    <>
      <LayoutCard>
        <Grid container p={2} alignItems="center">
          <Grid item xs={2}>
            <Skeleton variant="circular" width={50} height={50} />
          </Grid>
          <Grid item xs={10} p={2}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Skeleton variant="rectangular" width={150} height={12} />
              </Grid>
              <Grid item xs={12}>
                <Skeleton variant="rectangular" width={200} height={8} />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </LayoutCard>
    </>
  );
};

export default UserMiniCardSkeleton;
