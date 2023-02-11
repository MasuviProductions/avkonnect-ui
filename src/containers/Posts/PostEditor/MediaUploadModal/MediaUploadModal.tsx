import { Grid, Typography } from "@mui/material";
import ModalLayout from "../../../../components/ModalLayout";
import { IModalLayoutProps } from "../../../../components/ModalLayout/ModalLayout";
import "draft-js/dist/Draft.css";
import { LABELS } from "../../../../constants/labels";
import SentimentVerySatisfiedIcon from "@mui/icons-material/SentimentVerySatisfied";

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
          <SentimentVerySatisfiedIcon sx={{ marginLeft: 2 }} />
          <Grid item xs={12}>
            <Typography align="center">{LABELS.COMING_SOON}</Typography>
          </Grid>
        </Grid>
      </ModalLayout>
    </>
  );
};

export default MediaUploadModal;
