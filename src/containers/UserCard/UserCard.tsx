import { Card, CardContent, CardMedia, Grid } from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import React from "react";
import { useQuery } from "react-query";
import { IUserApiResponse } from "../../pages/api/user";
import { ReactFCWithSkeleton } from "../../interfaces/app";
import { fetchUser } from "../../utils/api";
import UserCardSkeleton from "./Skeleton";

interface IProfileProps {}

const UserCard: ReactFCWithSkeleton<IProfileProps> = ({}) => {
  const { data, isLoading, status } = useQuery<IUserApiResponse>(
    "todos",
    fetchUser
  );

  if (status === "loading") return <UserCardSkeleton />;

  if (status === "success")
    return (
      <Card>
        <Box p={4}>
          <Grid container justifyContent="space-between" alignItems="center">
            <Grid item>
              <Grid container flexDirection="column">
                <Grid item xs={12}>
                  <Box sx={{ paddingX: 2, paddingY: 1 }}>
                    <Typography color="primary" textAlign="center" variant="h4">
                      {data?.name}
                    </Typography>
                  </Box>
                </Grid>

                <Grid item xs={12}>
                  <Box sx={{ paddingX: 2, paddingY: 1 }}>
                    <Typography color="text.primary" variant="h5">
                      {data?.title}
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </Grid>

            <Grid item>
              <Box sx={{ paddingX: 2, paddingY: 1 }}>
                <CardMedia
                  component="img"
                  alt="green iguana"
                  sx={{ width: "80px", borderRadius: "50%", marginX: "2" }}
                  src="https://anthonycarbonepersonalinjurylawyer.com/wp-content/uploads/2018/06/shutterstock_126920099.jpg"
                />
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Card>
    );
  else return <></>;
};

export default UserCard;
