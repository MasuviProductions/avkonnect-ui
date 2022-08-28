import { Grid } from "@mui/material";
import { useResourceContext } from "../../../../contexts/ResourceContext";
import { IPostResponseContentModel } from "../../../../interfaces/api/external";
import { parseContentText } from "../../../../utils/component";

interface IFeedContentProps {
  feedContent: IPostResponseContentModel[];
}

const FeedContent: React.FC<IFeedContentProps> = ({ feedContent }) => {
  const { relatedSourceMap } = useResourceContext();
  return (
    <Grid container p={2}>
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
