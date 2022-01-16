import ModalLayout, {
  IModal,
} from "../../../components/ModalLayout/ModalLayout";
import { LABELS } from "../../../constants/labels";
import { IUserProjectApiModel } from "../../../interfaces/api/external";
import ProjectForm from "./ProjectForm";

interface IAddProjectProps extends IModal {
  onSaveProject?: (project: IUserProjectApiModel) => void;
  saveLoading?: boolean;
  removeLoading?: boolean;
}

const AddProject: React.FC<IAddProjectProps> = ({
  showModal,
  onModalClose,
  onSaveProject,
  saveLoading,
  removeLoading,
}) => {
  return (
    <>
      <ModalLayout
        showModal={showModal}
        onModalClose={onModalClose}
        title={LABELS.ADD_PROJECT}
      >
        <ProjectForm
          onSaveProject={onSaveProject}
          saveLoading={saveLoading}
          removeLoading={removeLoading}
        />
      </ModalLayout>
    </>
  );
};

export default AddProject;
