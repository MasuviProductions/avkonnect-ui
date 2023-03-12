import { Box, Container, Skeleton, SxProps, Theme } from "@mui/material";
import LayoutCard from "../../components/LayoutCard";
import { SingleFeedSkeleton } from "../Feeds/FeedsSkeleton";

const PostPageViewSkeleton: React.FC = () => {
  return (
    <Box mt={2}>
      <Container maxWidth="sm">
        <LayoutCard>
          <SingleFeedSkeleton />
          <Box sx={commentBoxSx}>
            <Skeleton variant="rectangular" width="100%" height="300px" />
          </Box>
        </LayoutCard>
      </Container>
    </Box>
  );
};

const commentBoxSx: SxProps<Theme> = (theme: Theme) => ({
  marginTop: "8px",
  paddingBottom: "16px",
  marginX: "40px",
  [theme.breakpoints.down("sm")]: {
    marginX: "16px",
  },
});

export default PostPageViewSkeleton;
