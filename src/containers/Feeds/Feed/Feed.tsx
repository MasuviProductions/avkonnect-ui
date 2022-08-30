import { Button, Typography, Hidden, Box } from "@mui/material";
import { useState } from "react";
import PostView from "../../Posts/PostView";
import { useResourceContext } from "../../../contexts/ResourceContext";
import { LABELS } from "../../../constants/labels";

const Feed: React.FC = () => {
  const resourceContext = useResourceContext();
  if (!resourceContext) {
    throw Error(LABELS.RESOURCE_CONTEXT_UNINITIALIZED);
  }
  const { id } = resourceContext;
  const [showPostDetail, setShowPostDetail] = useState(false);

  const handlePostDetailOpen = () => {
    setShowPostDetail(true);
  };

  const handlePostDetailClose = () => {
    setShowPostDetail(false);
  };

  return (
    <>
      <Box
        sx={{
          border: "3px solid orange",
          minHeight: "20vh",
          maxWidth: "500px",
          backgroundColor: "background.paper",
        }}
      >
        <Box p={2}>
          <Typography variant="h5">Feed Item</Typography>
        </Box>

        <Box p={2}>
          <Typography variant="body1">Post Id: {id}</Typography>
        </Box>

        <Box p={2}>
          <Button variant="contained" onClick={handlePostDetailOpen}>
            <>
              <Hidden mdUp>Open post in Overlay</Hidden>

              <Hidden mdDown>Open post in Modal</Hidden>
            </>
          </Button>
        </Box>

        <Box p={2}>
          <Typography variant="body2">
            Resize screen to switch between Modal and Overlay. This is
            controlled in the ~PostView~ Component
          </Typography>
        </Box>

        <PostView
          showPost={showPostDetail}
          onPostClose={handlePostDetailClose}
        />
      </Box>
    </>
  );
};

export default Feed;
