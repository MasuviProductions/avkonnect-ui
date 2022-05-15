import { Grid, Typography } from "@mui/material";
import UserConnectionCard from "../../../components/Connections/UserConnectionCard";

const ConnectionsSkeleton: React.FC = () => {
  return (
    <>
      <Grid container p={1} pb={2} spacing={1} justifyContent="center">
        {Array(8)
          .fill(false)
          .map((_, index) => (
            <Grid
              key={`connection-skeleton-${index}`}
              item
              xs={6}
              md={4}
              lg={3}
            >
              <UserConnectionCard.Skeleton />
            </Grid>
          ))}
      </Grid>
    </>
  );
};

export default ConnectionsSkeleton;
