import { Tabs, Tab, Theme } from "@mui/material";
import { SystemStyleObject } from "@mui/system";
import { useEffect, useState } from "react";
import { REACTION_CONFIGS } from "../../constants/app";
import { LABELS } from "../../constants/labels";
import { useResourceContext } from "../../contexts/ResourceContext";
import { IReactionTypes, REACTIONS } from "../../interfaces/api/external";
import ModalLayout from "../ModalLayout";
import ReactionTabPanel from "./ReactionTabPanel";

interface IReactionModalProps {
  showModal: boolean;
  onModalClose: () => void;
}

const ReactionModal: React.FC<IReactionModalProps> = ({
  showModal,
  onModalClose,
}) => {
  const resourceContext = useResourceContext();

  if (!resourceContext) {
    throw Error(LABELS.RESOURCE_CONTEXT_UNINITIALIZED);
  }
  const { reactionsCount, totalReactionsCount } = resourceContext;

  const [currentReactionTab, setCurrentReactionTab] = useState<
    "all" | IReactionTypes
  >("all");
  const [clearData, setClearData] = useState<boolean>(false);

  const handleReactionTabChange = (
    _event: React.SyntheticEvent<Element, Event>,
    newTabValue: "all" | IReactionTypes
  ) => {
    setCurrentReactionTab(newTabValue);
  };

  const handleCloseModal = () => {
    setClearData(true);
  };

  useEffect(() => {
    if (showModal) {
      setClearData(false);
    }
  }, [showModal]);

  useEffect(() => {
    if (clearData) {
      onModalClose();
    }
  }, [clearData, onModalClose]);

  return (
    <ModalLayout
      showModal={showModal}
      onModalClose={handleCloseModal}
      withContentPadding={false}
      title={"Reactions"}
      maxWidth="sm"
    >
      <Tabs value={currentReactionTab} onChange={handleReactionTabChange}>
        <Tab
          key={`reaction-tab-all`}
          label={LABELS.REACTION_ALL_TAB(totalReactionsCount)}
          value={"all"}
        />
        {REACTIONS.map((reaction, index) => {
          if (reactionsCount[reaction as IReactionTypes] > 0) {
            const Icon = REACTION_CONFIGS[reaction].iconActive;
            return (
              <Tab
                key={`reaction-tab-${index}`}
                icon={<Icon sx={reactionCountIconSx(reaction)} />}
                iconPosition="start"
                label={`${reactionsCount[reaction]}`}
                value={reaction}
              />
            );
          }
        })}
      </Tabs>
      <ReactionTabPanel
        key={`reaction-tabpanel-all`}
        index={"all"}
        value={currentReactionTab}
        clearData={clearData}
      />
      {REACTIONS.map((reaction, index) => {
        if (reactionsCount[reaction as IReactionTypes] > 0) {
          return (
            <ReactionTabPanel
              key={`reaction-tabpanel-${index}`}
              index={reaction}
              value={currentReactionTab}
              clearData={clearData}
            />
          );
        }
      })}
    </ModalLayout>
  );
};

const reactionCountIconSx: (
  reactionType: IReactionTypes
) => (theme: Theme) => SystemStyleObject<Theme> = reactionType => {
  return (theme: Theme) => ({
    borderRadius: "50%",
    padding: "0px",
    margin: "0px",
    fill: theme.palette.reactions[reactionType],
  });
};

export default ReactionModal;
