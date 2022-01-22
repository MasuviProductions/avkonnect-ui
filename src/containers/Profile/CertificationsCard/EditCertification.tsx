import ModalLayout, {
  IModal,
} from "../../../components/ModalLayout/ModalLayout";
import { LABELS } from "../../../constants/labels";
import { IUserCertificationApiModel } from "../../../interfaces/api/external";
import CertificationForm from "./CertificationForm";

interface IEditCertificationProps extends IModal {
  certification: IUserCertificationApiModel;
  onSaveCertification?: (certification: IUserCertificationApiModel) => void;
  onRemoveCertification?: () => void;
  saveLoading?: boolean;
  removeLoading?: boolean;
}

const EditCertification: React.FC<IEditCertificationProps> = ({
  showModal,
  onModalClose,
  certification,
  onSaveCertification,
  onRemoveCertification,
  saveLoading,
  removeLoading,
}) => {
  return (
    <>
      <ModalLayout
        showModal={showModal}
        onModalClose={onModalClose}
        title={LABELS.EDIT_CERTIFICATION}
      >
        <CertificationForm
          certification={certification}
          onSaveCertification={onSaveCertification}
          saveLoading={saveLoading}
          removeLoading={removeLoading}
          onRemoveCertification={onRemoveCertification}
        />
      </ModalLayout>
    </>
  );
};

export default EditCertification;
