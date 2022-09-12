import { Grid, Skeleton, SxProps, Theme } from "@mui/material";
import LayoutCard from "../../components/LayoutCard";
import FeedsSkeleton from "../Feeds/FeedsSkeleton";

const HomeSkeleton: React.FC = () => {
  return (
    <Grid container>
      <Grid item md={6} sm={10} xs={12} mt={2} sx={createPostSkelSx}>
        <LayoutCard>
          <Grid container p={2}>
            <Grid item xs={12}>
              <Skeleton variant="rectangular" width="100%" height={50} />
            </Grid>
          </Grid>
        </LayoutCard>
      </Grid>
      <Grid item md={6} xs={0} mt={4}>
        <Skeleton variant="rectangular" width="50%" height={50} />
      </Grid>
      <Grid item md={6} sm={10} xs={12}>
        <FeedsSkeleton />
      </Grid>
    </Grid>
  );
};

const createPostSkelSx: SxProps<Theme> = (theme: Theme) => ({
  paddingX: "24px",
  [theme.breakpoints.down("sm")]: {
    paddingX: 0,
  },
});

export default HomeSkeleton;
