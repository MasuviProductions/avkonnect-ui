import ModalLayout, {
  IModal,
} from "../../../components/ModalLayout/ModalLayout";
import { LABELS } from "../../../constants/labels";
import { IUserCertificationApiModel } from "../../../interfaces/api/external";
import CertificationForm from "./CertificationForm";

interface IAddCertificationProps extends IModal {
  onSaveCertification?: (certification: IUserCertificationApiModel) => void;
  saveLoading?: boolean;
  removeLoading?: boolean;
}

const AddCertification: React.FC<IAddCertificationProps> = ({
  showModal,
  onModalClose,
  onSaveCertification,
  saveLoading,
  removeLoading,
}) => {
  return (
    <>
      <ModalLayout
        showModal={showModal}
        onModalClose={onModalClose}
        title={LABELS.ADD_CERTIFICATION}
      >
        <CertificationForm
          onSaveCertification={onSaveCertification}
          saveLoading={saveLoading}
          removeLoading={removeLoading}
        />
      </ModalLayout>
    </>
  );
};

export default AddCertification;
