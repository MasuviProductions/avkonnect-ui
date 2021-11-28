import { Card, Grid } from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import React from "react";
import { ReactFCWithSkeleton } from "../../interfaces/app";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
// import UserCardSkeleton from "./Skeleton";
import { useAuthContext } from "../../contexts/AuthContext";

interface IProfileProps {}

const UserCard: ReactFCWithSkeleton<IProfileProps> = ({}) => {
  const { user } = useAuthContext();

  // if (status === "loading") return <UserCardSkeleton />;

  if (user)
    return (
      <Card>
        <Box py={3} px={1}>
          <Grid
            container
            justifyContent="center"
            flexWrap="wrap-reverse"
            alignItems="center"
          >
            <Grid item>
              <Grid container flexDirection="column">
                <Grid item xs={12}>
                  <Box sx={{ paddingX: 2, paddingY: 1 }}>
                    <Typography color="primary" textAlign="center" variant="h4">
                      {user?.name}
                    </Typography>
                  </Box>
                </Grid>

                <Grid item xs={12}>
                  <Box sx={{ paddingX: 2, paddingY: 1 }}>
                    <Typography color="text.primary" variant="h5">
                      {user?.email}
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </Grid>

            <Grid item>
              <Box sx={{ paddingX: 2, paddingY: 1 }}>
                <AccountCircleIcon
                  sx={{
                    color: "navbar.contrastText",
                    fontSize: 100,
                  }}
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
