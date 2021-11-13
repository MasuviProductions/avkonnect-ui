import { Card, CardContent, Grid, Box } from "@mui/material";
import Skeleton from "@mui/material/Skeleton";
import React from "react";

const UserCardSkeleton: React.FC = () => {
  return (
    <>
      <Card>
        <Box p={3}>
          <Grid container justifyContent="space-between" alignItems="center">
            <Grid item>
              <Grid container flexDirection="column">
                <Grid item xs={12}>
                  <Box sx={{ paddingX: 2, paddingY: 1 }}>
                    <Skeleton variant="rectangular" width={160} height={30} />
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <Box sx={{ paddingX: 2, paddingY: 1 }}>
                    <Skeleton variant="rectangular" width={160} height={20} />
                  </Box>
                </Grid>
              </Grid>
            </Grid>

            <Grid item>
              <Box sx={{ padding: 2 }}>
                <Skeleton variant="circular" width={60} height={60} />
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Card>
    </>
  );
};

export default UserCardSkeleton;
