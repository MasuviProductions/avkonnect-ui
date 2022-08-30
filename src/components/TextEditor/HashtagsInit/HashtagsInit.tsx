import { GlobalStyles, Hidden } from "@mui/material";
import { LABELS } from "../../../constants/labels";
import { useTextEditorContext } from "../../../contexts/TextEditorContext";
import DRAFTJS from "../../../utils/draftjs";

interface IHashtagsInitProps {}

const HashtagsInit: React.FC<IHashtagsInitProps> = ({}) => {
  const textEditorContext = useTextEditorContext();
  if (!textEditorContext) {
    throw Error(LABELS.TEXT_EDITOR_CONTEXT_UNINITIALIZED);
  }

  const { hashtagsInterpolationStyle } = textEditorContext;
  return (
    <>
      <GlobalStyles styles={hashtagsInterpolationStyle} />
    </>
  );
};

export default HashtagsInit;
