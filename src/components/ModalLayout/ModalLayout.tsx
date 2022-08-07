import {
  Container,
  Grid,
  IconButton,
  Modal,
  Typography,
  Theme,
  Breakpoint,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { SxProps, SystemStyleObject } from "@mui/system";
import LayoutCard from "../LayoutCard";

export interface IModal {
  showModal: boolean;
  onModalClose: () => void;
}

export interface IModalLayoutProps extends IModal {
  title?: string;
  showTitleBorder?: boolean;
  maxWidth?: false | Breakpoint;
}
const ModalLayout: React.FC<IModalLayoutProps> = ({
  children,
  title,
  showTitleBorder = true,
  maxWidth = "md",
  showModal,
  onModalClose,
}) => {
  const handleHeaderContainerSx = (theme: Theme): SystemStyleObject<Theme> => {
    return headerContainer(theme, showTitleBorder);
  };

  return (
    <Modal
      open={showModal}
      onClose={onModalClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Container maxWidth={maxWidth} sx={modalContainer}>
        <LayoutCard>
          <Grid
            container
            justifyContent="space-between"
            alignItems="center"
            sx={handleHeaderContainerSx}
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
          <Grid item xs={12} py={2}>
            <Grid container>
              <Grid item xs={12} sx={childContainer}>
                {children}
              </Grid>
            </Grid>
          </Grid>
        </LayoutCard>
      </Container>
    </Modal>
  );
};

const modalContainer: SxProps<Theme> = (theme: Theme) => ({
  position: "absolute",
  top: "15%",
  left: "50%",
  transform: "translate(-50%, -15%)",
});

const closeButton: SxProps<Theme> = (theme: Theme) => ({
  color: `${theme.palette.text.primary}`,
});

const headerContainer = (
  theme: Theme,
  showBorder: boolean
): SystemStyleObject<Theme> => ({
  paddingY: 1,
  paddingX: 2,
  borderBottom: `1px solid ${
    showBorder ? theme.palette.secondary.dark : "transparent"
  }`,
});

const childContainer: SxProps<Theme> = (theme: Theme) => ({
  maxHeight: "75vh",
  overflow: "auto",
});

export default ModalLayout;
