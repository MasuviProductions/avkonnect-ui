import { Grid } from "@mui/material";
import FeedsSkeleton from "../Feeds/FeedsSkeleton";

const HomeSkeleton: React.FC = () => {
  return (
    <Grid container>
      <Grid item xs={12}>
        <FeedsSkeleton />
      </Grid>
    </Grid>
  );
};

export default HomeSkeleton;
