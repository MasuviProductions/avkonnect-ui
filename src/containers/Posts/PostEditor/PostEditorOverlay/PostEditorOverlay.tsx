import { Grid, Theme } from "@mui/material";
import { SystemStyleObject } from "@mui/system";
import { useEffect } from "react";
import TextEditor from "../../../../components/TextEditor/TextEditor";
import ViewOverlay from "../../../../components/ViewOverlay";
import { IOverlay } from "../../../../components/ViewOverlay/ViewOverlay";
import { LABELS } from "../../../../constants/labels";
import { useTextEditorContext } from "../../../../contexts/TextEditorContext";
import PostActionBar from "../PostActionBar";

interface IPostEditorOverlayProps extends IOverlay {}

const PostEditorOverlay: React.FC<IPostEditorOverlayProps> = ({
  showOverlay,
  onOverlayClose,
}) => {
  const textEditorContext = useTextEditorContext();
  if (!textEditorContext) {
    throw Error(LABELS.TEXT_EDITOR_CONTEXT_UNINITIALIZED);
  }

  const { focusEditor } = textEditorContext;

  useEffect(() => {
    if (showOverlay) {
      focusEditor();
    }
  }, [focusEditor, showOverlay]);

  return (
    <>
      <ViewOverlay showOverlay={showOverlay} onOverlayClose={onOverlayClose}>
        <Grid container sx={postEditorOverlayContainerSx}>
          <Grid item xs={12} sx={postEditorContainerSx}>
            <TextEditor
              palceholder={LABELS.ADD_POST_PLACEHOLDER}
              editorContainerSx={editorContainerSx}
            />
          </Grid>
          <Grid item xs={12} sx={postActionBarContainerSx}>
            <PostActionBar />
          </Grid>
        </Grid>
      </ViewOverlay>
    </>
  );
};

const postEditorOverlayContainerSx = (
  theme: Theme
): SystemStyleObject<Theme> => ({
  height: "100%",
  overflowY: "hidden",
  width: "inherit",
});

const postActionBarHeightInPx = 50 + 20;

const postActionBarContainerSx = (theme: Theme): SystemStyleObject<Theme> => ({
  padding: 2,
  overflowY: "auto",
  height: `calc(${postActionBarHeightInPx}px)`,
});

const postEditorContainerSx = (theme: Theme): SystemStyleObject<Theme> => ({
  overflowY: "auto",
  // Height of postActionBarContainerSx
  height: `calc(100% - ${postActionBarHeightInPx}px)`,
  padding: 1.5,
  paddingBottom: 5,
});

const editorContainerSx =
  (_isFocused: boolean) =>
  (theme: Theme): SystemStyleObject<Theme> => ({
    position: "relative",
    height: "100%",
    overflowY: "auto",
    overflowX: "hidden",
    backgroundColor: theme.palette.background.paper,
  });

export default PostEditorOverlay;
