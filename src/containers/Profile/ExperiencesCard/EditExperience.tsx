import ModalLayout, {
  IModal,
} from "../../../components/ModalLayout/ModalLayout";
import { LABELS } from "../../../constants/labels";
import { IUserExperienceApiModel } from "../../../interfaces/api/external";
import ExperienceForm from "./ExperienceForm";

interface IEditExperienceProps extends IModal {
  experience: IUserExperienceApiModel;
  onSaveExperience?: (experience: IUserExperienceApiModel) => void;
  onRemoveExperience?: () => void;
  saveLoading?: boolean;
  removeLoading?: boolean;
}

const EditExperience: React.FC<IEditExperienceProps> = ({
  showModal,
  onModalClose,
  experience,
  onSaveExperience,
  onRemoveExperience,
  saveLoading,
  removeLoading,
}) => {
  return (
    <>
      <ModalLayout
        showModal={showModal}
        onModalClose={onModalClose}
        title={LABELS.EDIT_EXPERIENCE}
      >
        <ExperienceForm
          experience={experience}
          onSaveExperience={onSaveExperience}
          saveLoading={saveLoading}
          removeLoading={removeLoading}
          onRemoveExperience={onRemoveExperience}
        />
      </ModalLayout>
    </>
  );
};

export default EditExperience;
