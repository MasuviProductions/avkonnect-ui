import MuiSnackbar from "@mui/material/Snackbar";
import Alert, { AlertColor } from "@mui/material/Alert";
import { useEffect, useState } from "react";
import { Theme } from "@mui/material";
import { SxProps } from "@mui/system";

interface ISnackbarInfo {
  message?: string;
  messageType?: AlertColor;
}
export interface ISnackbarProps extends ISnackbarInfo {
  onClose?: () => void;
}

const Snackbar: React.FC<ISnackbarProps> = ({
  message,
  messageType,
  onClose,
}) => {
  const [open, setOpen] = useState(false);

  const [messageInfo, setMessageInfo] = useState<ISnackbarInfo | undefined>();

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
    onClose?.();
  };

  useEffect(() => {
    if (message) {
      setMessageInfo(() => ({ message, messageType }));
    }
  }, [message, messageType]);

  useEffect(() => {
    setOpen(!!messageInfo);
  }, [messageInfo]);

  return (
    <MuiSnackbar open={open} autoHideDuration={8000} onClose={handleClose}>
      <Alert
        onClose={handleClose}
        severity={messageInfo?.messageType}
        sx={snackbarAlert}
      >
        {messageInfo?.message}
      </Alert>
    </MuiSnackbar>
  );
};

const snackbarAlert: SxProps<Theme> = (theme: Theme) => ({
  width: "100%",
  backgroundColor: theme.palette.background.paper,
  color: theme.palette.text.primary,
});

export default Snackbar;
