import { Grid, Typography } from "@mui/material";
import ModalLayout from "../../../../components/ModalLayout";
import { IModalLayoutProps } from "../../../../components/ModalLayout/ModalLayout";
import "draft-js/dist/Draft.css";
import { LABELS } from "../../../../constants/labels";

interface IMediaUploadModalProps extends IModalLayoutProps {
  title: string;
}

const MediaUploadModal: React.FC<IMediaUploadModalProps> = ({
  title,
  showModal,
  onModalClose,
}) => {
  return (
    <>
      <ModalLayout
        showModal={showModal}
        onModalClose={onModalClose}
        maxWidth="sm"
        title={title}
      >
        <Grid container p={2} spacing={2} justifyItems="center">
          <Grid item xs={12}>
            <Typography align="center">{LABELS.COMING_SOON}</Typography>
          </Grid>
        </Grid>
      </ModalLayout>
    </>
  );
};

export default MediaUploadModal;
