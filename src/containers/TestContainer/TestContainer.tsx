import { Box, Button, Hidden } from "@mui/material";
import { useState } from "react";
import { useAuthContext } from "../../contexts/AuthContext";
import PostEditor from "../Posts/PostEditor";
import Feeds from "../Feeds";

const TestContainer: React.FC = () => {
  const { authUser } = useAuthContext();

  const [showCreatePost, setShowCreatePost] = useState(false);

  if (!authUser) {
    return <></>;
  }
  return (
    <>
      <Box sx={{}} mt={5}>
        <Button variant="contained" onClick={() => setShowCreatePost(true)}>
          <Hidden mdDown>Create Post in Modal</Hidden>
          <Hidden mdUp>Create Post in Overlay</Hidden>
        </Button>
        <PostEditor
          showPostEditor={showCreatePost}
          onPostEditorClose={() => setShowCreatePost(false)}
        />
      </Box>
      <Feeds />
    </>
  );
};

export default TestContainer;
