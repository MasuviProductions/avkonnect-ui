import { GlobalStyles, Theme } from "@mui/material";
import { FunctionInterpolation, Interpolation } from "@emotion/react";
import DRAFTJS from "../../../utils/draftjs";
import { decoratedLinkSx } from "../../../styles/sx";

interface IHashtagsInitProps {}

const HashtagsInit: React.FC<IHashtagsInitProps> = ({}) => {
  return <GlobalStyles styles={hashtagPluginOverrideTheme} />;
};

const hashtagPluginOverrideTheme: Interpolation<Theme> = (theme: Theme) => ({
  [`.${DRAFTJS.editorPlugins.hashtags.themeOption.hashtag}`]: {
    ...(decoratedLinkSx(16)(theme) as FunctionInterpolation<Theme>),
  },
});
export default HashtagsInit;
