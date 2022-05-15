import { Grid, Hidden, Skeleton } from "@mui/material";
import LayoutSection from "../../components/LayoutSection";

const MyNetworkSkeleton: React.FC = () => {
  return (
    <>
      <Grid container spacing={2} mt={4}>
        <Hidden mdDown>
          <Grid item xs={4}>
            <LayoutSection>
              <Grid container justifyContent="center" pb={2}>
                <Grid item xs={12} py={1}>
                  <Skeleton variant="rectangular" width="100%" height={20} />
                </Grid>
                <Grid item xs={12} py={1}>
                  <Skeleton variant="rectangular" width="100%" height={20} />
                </Grid>
                <Grid item xs={12} py={1}>
                  <Skeleton variant="rectangular" width="100%" height={20} />
                </Grid>
              </Grid>
            </LayoutSection>
          </Grid>

          <Grid item xs={8}>
            <LayoutSection>
              <Grid container justifyContent="center" pb={2}>
                <Grid item xs={12}>
                  <Skeleton variant="rectangular" width="100%" height="200px" />
                </Grid>
              </Grid>
            </LayoutSection>
          </Grid>
        </Hidden>

        <Hidden mdUp>
          <Grid item xs={12}>
            <LayoutSection>
              <Grid container spacing={1} pb={2}>
                <Grid item xs={4}>
                  <Skeleton variant="rectangular" width="100%" height={20} />
                </Grid>
                <Grid item xs={4}>
                  <Skeleton variant="rectangular" width="100%" height={20} />
                </Grid>
                <Grid item xs={4}>
                  <Skeleton variant="rectangular" width="100%" height={20} />
                </Grid>
              </Grid>
            </LayoutSection>
          </Grid>

          <Grid item xs={12} mt={1}>
            <LayoutSection>
              <Grid container justifyContent="center" pb={2}>
                <Grid item xs={12}>
                  <Skeleton variant="rectangular" width="100%" height="600px" />
                </Grid>
              </Grid>
            </LayoutSection>
          </Grid>
        </Hidden>
      </Grid>
    </>
  );
};

export default MyNetworkSkeleton;
