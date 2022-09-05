import { Hidden } from "@mui/material";

import { LABELS } from "../../../../constants/labels";
import { useResourceContext } from "../../../../contexts/ResourceContext";
import TextEditorProvider, {
  ITextEditorContent,
} from "../../../../contexts/TextEditorContext";
import { IPostContentApiModel } from "../../../../interfaces/api/external";
import DRAFTJS from "../../../../utils/draftjs";
import PostEditorModal from "../PostEditorModal";
import PostEditorOverlay from "../PostEditorOverlay";

interface IEditPostEditorProps {
  showPostEditor: boolean;
  onPostEditorClose: () => void;
}

const EditPostEditor: React.FC<IEditPostEditorProps> = ({
  showPostEditor,
  onPostEditorClose,
}) => {
  const resourceContext = useResourceContext();
  if (!resourceContext) {
    throw Error(LABELS.RESOURCE_CONTEXT_UNINITIALIZED);
  }

  const { updateResource, isBeingEdited, content } = resourceContext;

  const contentState =
    DRAFTJS.utils.getContentStateFromStringifiedRawContentState(
      content.stringifiedRawContent
    );

  const handlePostUpdate = (content: ITextEditorContent) => {
    const postContent: IPostContentApiModel = {
      text: content.text,
      stringifiedRawContent: content.stringifiedRawContent,
      mediaUrls: [],
      createdAt: new Date(Date.now()),
    };
    updateResource(postContent);
  };

  return (
    <>
      <TextEditorProvider
        contentState={contentState}
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
        onSaveContent={handlePostUpdate}
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

export default EditPostEditor;
