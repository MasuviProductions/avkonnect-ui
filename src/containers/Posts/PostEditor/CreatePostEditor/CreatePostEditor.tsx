import { Hidden } from "@mui/material";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";

import API_ENDPOINTS from "../../../../constants/api";
import { useAuthContext } from "../../../../contexts/AuthContext";
import TextEditorProvider, {
  ITextEditorContent,
} from "../../../../contexts/TextEditorContext";
import {
  ICreatePostApiRequest,
  IPostContentApiModel,
} from "../../../../interfaces/api/external";
import { createPost } from "../../../../utils/api";
import DRAFTJS from "../../../../utils/draftjs";
import PostEditorModal from "../PostEditorModal";
import PostEditorOverlay from "../PostEditorOverlay";

interface ICreatePostEditorProps {
  showPostEditor: boolean;
  onPostEditorClose: () => void;
}

const CreatePostEditor: React.FC<ICreatePostEditorProps> = ({
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

  const handlePostCreate = (content: ITextEditorContent) => {
    const postContent: Omit<IPostContentApiModel, "createdAt"> = {
      text: content.text,
      stringifiedRawContent: content.stringifiedRawContent,
      mediaUrls: [],
    };
    const postReqBody: ICreatePostApiRequest = {
      content: postContent,
      hashtags: [],
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
      <TextEditorProvider
        pluginConfig={{
          hashtags: {
            plugin: DRAFTJS.editorPlugins.postHashtags.pluginConfig,
            themeStyle: DRAFTJS.editorPlugins.postHashtags.theme,
          },
          mentions: {
            plugin: DRAFTJS.editorPlugins.postMentions.pluginConfig,
            themeStyle: DRAFTJS.editorPlugins.postMentions.theme,
          },
        }}
        onSaveContent={handlePostCreate}
      >
        <Hidden mdUp>
          <PostEditorOverlay
            showOverlay={showPostEditor}
            onOverlayClose={onPostEditorClose}
          />
        </Hidden>

        <Hidden mdDown>
          <PostEditorModal
            showModal={showPostEditor}
            onModalClose={onPostEditorClose}
          />
        </Hidden>
      </TextEditorProvider>
    </>
  );
};

export default CreatePostEditor;
