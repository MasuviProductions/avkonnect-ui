import { useEffect } from "react";
import { Box, Container, Hidden } from "@mui/material";
import LayoutCard from "../../components/LayoutCard";
import { ReactFCWithSkeleton } from "../../interfaces/app";
import PostLayoutDesktop from "../Posts/PostLayout/PostLayoutDesktop";
import PostLayoutMobile from "../Posts/PostLayout/PostLayoutMobile";
import PostPageViewSkeleton from "./PostPageViewSkeleton";
import { LABELS } from "../../constants/labels";
import { useResourceContext } from "../../contexts/ResourceContext";

const PostPageView: ReactFCWithSkeleton = () => {
  const resourceContext = useResourceContext();

  if (!resourceContext) {
    throw Error(LABELS.RESOURCE_CONTEXT_UNINITIALIZED);
  }
  const { commentsQuery } = resourceContext;

  const { triggerGetCommentsApi } = commentsQuery!;

  useEffect(() => {
    triggerGetCommentsApi();
  }, [triggerGetCommentsApi]);

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
          <Box pt={1}>
            <PostLayoutMobile />
          </Box>
        </LayoutCard>
      </Hidden>
    </Box>
  );
};

PostPageView.Skeleton = PostPageViewSkeleton;

export default PostPageView;
