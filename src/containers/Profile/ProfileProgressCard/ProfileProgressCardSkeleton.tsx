import { Grid, Skeleton } from "@mui/material";
import React from "react";
import LayoutCard from "../../../components/LayoutCard";

const ProfileProgressCardSkeleton: React.FC = () => {
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
              <Grid item xs={12}>
                <Skeleton variant="rectangular" width={150} height={15} />
              </Grid>

              <Grid item xs={12}>
                <Grid container spacing={1}>
                  <Grid item xs={12}>
                    <Skeleton variant="rectangular" width={300} height={10} />
                  </Grid>

                  <Grid item xs={12}>
                    <Skeleton variant="rectangular" width={200} height={10} />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </LayoutCard>
    </>
  );
};

export default ProfileProgressCardSkeleton;
