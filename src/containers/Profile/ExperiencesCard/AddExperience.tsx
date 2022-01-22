import ModalLayout, {
  IModal,
} from "../../../components/ModalLayout/ModalLayout";
import { LABELS } from "../../../constants/labels";
import { IUserExperienceApiModel } from "../../../interfaces/api/external";
import ExperienceForm from "./ExperienceForm";

interface IAddExperienceProps extends IModal {
  onSaveExperience?: (experience: IUserExperienceApiModel) => void;
  saveLoading?: boolean;
  removeLoading?: boolean;
}

const AddExperience: React.FC<IAddExperienceProps> = ({
  showModal,
  onModalClose,
  onSaveExperience,
  saveLoading,
  removeLoading,
}) => {
  return (
    <>
      <ModalLayout
        showModal={showModal}
        onModalClose={onModalClose}
        title={LABELS.ADD_EXPERIENCE}
      >
        <ExperienceForm
          onSaveExperience={onSaveExperience}
          saveLoading={saveLoading}
          removeLoading={removeLoading}
        />
      </ModalLayout>
    </>
  );
};

export default AddExperience;
