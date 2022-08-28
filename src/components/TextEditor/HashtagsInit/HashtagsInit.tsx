import { GlobalStyles, Theme } from "@mui/material";
import { Interpolation } from "@emotion/react";
import DRAFTJS from "../../../utils/draftjs";

interface IHashtagsInitProps {}

const HashtagsInit: React.FC<IHashtagsInitProps> = ({}) => {
  return <GlobalStyles styles={hashtagPluginOverrideTheme} />;
};

const hashtagPluginOverrideTheme: Interpolation<Theme> = (theme: Theme) => ({
  [`.${DRAFTJS.editorPlugins.hashtags.themeOption.hashtag}`]: {
    color: theme.palette.text.link,
  },
});
export default HashtagsInit;
