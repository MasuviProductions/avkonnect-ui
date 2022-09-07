import { Tabs, Tab } from "@mui/material";
import { useState } from "react";
import { LABELS } from "../../constants/labels";
import { useResourceContext } from "../../contexts/ResourceContext";
import useReactions from "../../hooks/useReactions";
import { IReactionTypes, REACTIONS } from "../../interfaces/api/external";
import ModalLayout from "../ModalLayout";

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
  const { type, id } = resourceContext;

  const [currentReactionTab, setCurrentReactionTab] = useState<
    "all" | IReactionTypes
  >("all");
  const { uptoDateReactions } = useReactions(
    type,
    id,
    currentReactionTab === "all" ? undefined : currentReactionTab
  );
  return (
    <ModalLayout
      showModal={showModal}
      onModalClose={onModalClose}
      title={"Reactions"}
    >
      <Tabs value>
        {["all"].concat(REACTIONS).map((reaction, index) => {
          if (
            uptoDateReactions[reaction as "all" | IReactionTypes]?.length > 0
          ) {
            <Tab key={`reaction-tab-${index}`} label={reaction as string} />;
          }
        })}
      </Tabs>
    </ModalLayout>
  );
};

export default ReactionModal;
