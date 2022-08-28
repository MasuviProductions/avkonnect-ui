import { Hidden } from "@mui/material";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";

import API_ENDPOINTS from "../../../constants/api";
import { useAuthContext } from "../../../contexts/AuthContext";
import TextEditorProvider from "../../../contexts/TextEditorContext";
import {
  ICreatePostApiRequest,
  IPostRequestContentApiModel,
} from "../../../interfaces/api/external";
import { createPost } from "../../../utils/api";
import DRAFTJS from "../../../utils/draftjs";
import PostEditorModal from "./PostEditorModal";
import PostEditorOverlay from "./PostEditorOverlay";

interface IPostEditorProps {
  showPostEditor: boolean;
  onPostEditorClose: () => void;
}

const PostEditor: React.FC<IPostEditorProps> = ({
  showPostEditor,
  onPostEditorClose,
}) => {
  const { accessToken } = useAuthContext();

  const [createPostReqBody, setCreatePostReqBody] = useState<
    ICreatePostApiRequest | undefined
  >();

  const {
    data: createPostData,
    error: createPostError,
    status: createPostStatus,
    isFetching: createPostFetching,
    refetch: triggerCreatePostApi,
    remove: clearCreatePostQuery,
  } = useQuery(
    `${API_ENDPOINTS.CREATE_POST.key}`,
    () => createPost(accessToken!, createPostReqBody!),
    {
      enabled: !!createPostReqBody,
      cacheTime: 0,
      refetchInterval: false,
      refetchOnWindowFocus: false,
    }
  );

  const handlePostCreate = (
    content: IPostRequestContentApiModel,
    hashtags?: string[] | undefined
  ) => {
    const postReqBody: ICreatePostApiRequest = {
      content,
      hashtags,
      visibleOnlyToConnections: false,
      commentsOnlyByConnections: false,
    };
    setCreatePostReqBody(postReqBody);
  };

  useEffect(() => {
    if (createPostStatus === "success") {
      setCreatePostReqBody(undefined);
      clearCreatePostQuery();
      onPostEditorClose();
    }
  }, [clearCreatePostQuery, createPostStatus, onPostEditorClose]);

  return (
    <>
      <Hidden mdUp>
        <TextEditorProvider
          plugins={{
            hashtags: DRAFTJS.editorPlugins.hashtags.plugin,
            mentions: DRAFTJS.editorPlugins.mentions.plugin,
          }}
          onSaveContent={handlePostCreate}
        >
          <PostEditorOverlay
            showOverlay={showPostEditor}
            onOverlayClose={onPostEditorClose}
          />
        </TextEditorProvider>
      </Hidden>

      <Hidden mdDown>
        <TextEditorProvider
          plugins={{
            hashtags: DRAFTJS.editorPlugins.hashtags.plugin,
            mentions: DRAFTJS.editorPlugins.mentions.plugin,
          }}
          onSaveContent={handlePostCreate}
        >
          <PostEditorModal
            showModal={showPostEditor}
            onModalClose={onPostEditorClose}
          />
        </TextEditorProvider>
      </Hidden>
    </>
  );
};

export default PostEditor;
