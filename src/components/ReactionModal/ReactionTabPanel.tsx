import { Box, Grid } from "@mui/material";
import React, { useEffect } from "react";
import { LABELS } from "../../constants/labels";
import { useResourceContext } from "../../contexts/ResourceContext";
import useReactions from "../../hooks/useReactions";
import { IReactionTypes } from "../../interfaces/api/external";
import SpinLoader from "../SpinLoader";
import ReactionItem from "./ReactionItem";

export interface ITabPanelProps {
  index: "all" | IReactionTypes;
  value: "all" | IReactionTypes;
  clearData: boolean;
}

const ReactionTabPanel: React.FC<ITabPanelProps> = ({
  index,
  value,
  clearData,
}) => {
  const resourceContext = useResourceContext();

  if (!resourceContext) {
    throw Error(LABELS.RESOURCE_CONTEXT_UNINITIALIZED);
  }
  const { type, id } = resourceContext;

  const {
    uptoDateReactions,
    infiniteLoadRef,
    relatedSourcesMap,
    resetQueryData,
    getReactionsFetching,
  } = useReactions(type, id, index === "all" ? undefined : index);

  useEffect(() => {
    if (clearData) {
      resetQueryData();
    }
  }, [clearData, index, resetQueryData]);

  return (
    <Box hidden={value !== index}>
      <Grid container p={1}>
        {uptoDateReactions?.map((reactionObj, index) => {
          return (
            <Grid
              item
              xs={12}
              p={1}
              key={index}
              ref={
                index === uptoDateReactions.length - 1
                  ? infiniteLoadRef
                  : undefined
              }
            >
              <ReactionItem
                reaction={reactionObj}
                relatedSourceName={relatedSourcesMap[reactionObj.sourceId].name}
                relatedSourceDispPic={
                  relatedSourcesMap[reactionObj.sourceId].displayPictureUrl
                }
                relatedSourceHeadline={
                  relatedSourcesMap[reactionObj.sourceId].headline || "--"
                }
              />
            </Grid>
          );
        })}
        {getReactionsFetching && <SpinLoader fullWidth />}
      </Grid>
    </Box>
  );
};

export default ReactionTabPanel;
