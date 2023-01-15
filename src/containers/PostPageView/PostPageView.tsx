import { useEffect } from "react";
import { Box, Grid, Hidden, SxProps, Container, Theme } from "@mui/material";
import LayoutCard from "../../components/LayoutCard";
import { ReactFCWithSkeleton } from "../../interfaces/app";
import PostLayoutDesktop from "../Posts/PostLayout/PostLayoutDesktop";
import PostLayoutMobile from "../Posts/PostLayout/PostLayoutMobile";
import PostPageViewSkeleton from "./PostPageViewSkeleton";
import { LABELS } from "../../constants/labels";
import { useResourceContext } from "../../contexts/ResourceContext";
import Footer from "../Footer";

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
      <Grid container sx={postContainerSx}>
        <Grid item lg={6} md={7} xs={12}>
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
        </Grid>
        
        <Grid item md={4} xs={12}>
          <Hidden mdDown>
            <Box sx={stickyBoxSx}>
              <Footer footerType="side" />
            </Box>
          </Hidden>
        </Grid>

      </Grid>
    </Box>
  );
};

const postContainerSx: SxProps<Theme> = (theme: Theme) => ({
  margin: "0px 16px",
  [theme.breakpoints.down("sm")]: {
    margin: "0px",
  },
});

const stickyBoxSx: SxProps<Theme> = {
  // position: "sticky",
  top: "100px",
};

PostPageView.Skeleton = PostPageViewSkeleton;

export default PostPageView;
