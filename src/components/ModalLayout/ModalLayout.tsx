import {
  Box,
  Container,
  Grid,
  IconButton,
  Modal,
  Typography,
  Theme,
} from "@mui/material";
import { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { SxProps } from "@mui/system";

import LayoutCard from "../LayoutCard";

export interface IModal {
  showModal: boolean;
  onModalClose: () => void;
}

export interface IModalLayoutProps extends IModal {
  title?: string;
}
const ModalLayout: React.FC<IModalLayoutProps> = ({
  children,
  title,
  showModal,
  onModalClose,
}) => {
  return (
    <Modal
      open={showModal}
      onClose={onModalClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Container maxWidth="md" sx={modalContainer}>
        <LayoutCard>
          <Grid
            container
            justifyContent="space-between"
            alignItems="center"
            sx={headerContainer}
          >
            <Grid item>
              <Typography variant="h6">{title}</Typography>
            </Grid>

            <Grid item>
              <IconButton onClick={onModalClose} sx={closeButton}>
                <CloseIcon />
              </IconButton>
            </Grid>
          </Grid>

          {children}
        </LayoutCard>
      </Container>
    </Modal>
  );
};

const modalContainer: SxProps<Theme> = (theme: Theme) => ({
  position: "absolute",
  top: "40%",
  left: "50%",
  transform: "translate(-50%, -50%)",
});

const closeButton: SxProps<Theme> = (theme: Theme) => ({
  color: `${theme.palette.text.primary}`,
});

const headerContainer: SxProps<Theme> = (theme: Theme) => ({
  paddingY: 1,
  paddingX: 2,
  borderBottom: `1px solid ${theme.palette.grey[700]}`,
});

export default ModalLayout;
