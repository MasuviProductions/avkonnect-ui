import { Button, Grid } from "@mui/material";
import { LABELS } from "../../../constants/labels";
import useConnection from "../../../hooks/useConnection";
import ModalLayout from "../../ModalLayout";
import { IModalLayoutProps } from "../../ModalLayout/ModalLayout";

interface IWithdrawConnectionModalProps extends IModalLayoutProps {
  connectorId: string;
}

const WithdrawConnectionModal: React.FC<IWithdrawConnectionModalProps> = ({
  connectorId,
  showModal,
  onModalClose,
}) => {
  const { rejectUserConnection } = useConnection(connectorId);

  const handleConnectionReject = () => {
    rejectUserConnection();
    onModalClose();
  };

  return (
    <>
      <ModalLayout
        maxWidth="xs"
        showModal={showModal}
        onModalClose={onModalClose}
      >
        <Grid p={3} container>
          <Grid item>{LABELS.CONNECTION_WITHDRAW_REQUEST}</Grid>
        </Grid>
        <Grid p={2} container justifyContent="flex-end">
          <Grid item>
            <Button
              color="primary"
              variant="outlined"
              onClick={handleConnectionReject}
              size="small"
            >
              {LABELS.CONNECTION_WITHDRAW}
            </Button>
          </Grid>
        </Grid>
      </ModalLayout>
    </>
  );
};

export default WithdrawConnectionModal;
