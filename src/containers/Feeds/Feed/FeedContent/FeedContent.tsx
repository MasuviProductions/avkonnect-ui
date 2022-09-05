import { Grid } from "@mui/material";
import { useResourceContext } from "../../../../contexts/ResourceContext";
import { parseContentText } from "../../../../utils/component";
import { LABELS } from "../../../../constants/labels";

interface IFeedContentProps {}

const FeedContent: React.FC<IFeedContentProps> = ({}) => {
  const resourceContext = useResourceContext();

  if (!resourceContext) {
    throw Error(LABELS.RESOURCE_CONTEXT_UNINITIALIZED);
  }
  const { relatedSourceMap, content } = resourceContext;
  return (
    <Grid container p={1}>
      <Grid item>{parseContentText(content.text, relatedSourceMap)}</Grid>
    </Grid>
  );
};

export default FeedContent;
