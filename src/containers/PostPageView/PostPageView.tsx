import { Box, Container, Hidden } from "@mui/material";
import LayoutCard from "../../components/LayoutCard";
import { ReactFCWithSkeleton } from "../../interfaces/app";
import PostLayoutDesktop from "../Posts/PostLayout/PostLayoutDesktop";
import PostLayoutMobile from "../Posts/PostLayout/PostLayoutMobile";
import PostPageViewSkeleton from "./PostPageViewSkeleton";

const PostPageView: ReactFCWithSkeleton = () => {
  return (
    <Box mt={2}>
      <Hidden mdDown>
        <Container maxWidth="sm">
          <LayoutCard>
            <PostLayoutDesktop />
          </LayoutCard>
        </Container>
      </Hidden>
      <Hidden mdUp>
        <LayoutCard>
          <PostLayoutMobile />
        </LayoutCard>
      </Hidden>
    </Box>
  );
};

PostPageView.Skeleton = PostPageViewSkeleton;

export default PostPageView;
