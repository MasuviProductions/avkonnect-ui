import ModalLayout, {
  IModal,
} from "../../../components/ModalLayout/ModalLayout";
import { LABELS } from "../../../constants/labels";
import { IUserProjectApiModel } from "../../../interfaces/api/external";
import ProjectForm from "./ProjectForm";

interface IEditProjectProps extends IModal {
  project: IUserProjectApiModel;
  onSaveProject?: (project: IUserProjectApiModel) => void;
  onRemoveProject?: () => void;
  saveLoading?: boolean;
  removeLoading?: boolean;
}

const EditProject: React.FC<IEditProjectProps> = ({
  showModal,
  onModalClose,
  project,
  onSaveProject,
  onRemoveProject,
  saveLoading,
  removeLoading,
}) => {
  return (
    <>
      <ModalLayout
        showModal={showModal}
        onModalClose={onModalClose}
        title={LABELS.EDIT_PROJECT}
      >
        <ProjectForm
          project={project}
          onSaveProject={onSaveProject}
          saveLoading={saveLoading}
          removeLoading={removeLoading}
          onRemoveProject={onRemoveProject}
        />
      </ModalLayout>
    </>
  );
};

export default EditProject;
