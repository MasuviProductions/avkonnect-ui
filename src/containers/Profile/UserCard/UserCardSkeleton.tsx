import { Grid, Hidden } from "@mui/material";
import Skeleton from "@mui/material/Skeleton";
import React from "react";
import LayoutCard from "../../../components/LayoutCard";

const UserCardSkeleton: React.FC = () => {
  return (
    <>
      <LayoutCard>
        <Grid
          container
          justifyContent="space-between"
          alignItems="center"
          p={3}
        >
          <Grid item>
            <Grid container flexDirection="column" spacing={3}>
              <Hidden mdDown>
                <Grid item xs={12}>
                  <Skeleton variant="rectangular" width={300} height={20} />
                </Grid>
              </Hidden>

              <Grid item xs={12}>
                <Skeleton variant="circular" width={140} height={140} />
              </Grid>
              <Grid item xs={12}>
                <Skeleton variant="rectangular" width={250} height={20} />
              </Grid>
              <Grid item xs={12}>
                <Skeleton variant="rectangular" width={200} height={20} />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </LayoutCard>
    </>
  );
};

export default UserCardSkeleton;
