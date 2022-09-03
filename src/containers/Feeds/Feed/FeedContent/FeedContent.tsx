import { Grid } from "@mui/material";
import { useResourceContext } from "../../../../contexts/ResourceContext";
import { IPostContentModel } from "../../../../interfaces/api/external";
import { parseContentText } from "../../../../utils/component";
import { LABELS } from "../../../../constants/labels";

interface IFeedContentProps {
  feedContent: IPostContentModel[];
}

const FeedContent: React.FC<IFeedContentProps> = ({ feedContent }) => {
  const resourceContext = useResourceContext();

  if (!resourceContext) {
    throw Error(LABELS.RESOURCE_CONTEXT_UNINITIALIZED);
  }
  const { relatedSourceMap } = resourceContext;
  return (
    <Grid container py={2}>
      <Grid item>
        {parseContentText(
          feedContent[feedContent.length - 1].text,
          relatedSourceMap
        )}
      </Grid>
    </Grid>
  );
};

export default FeedContent;
