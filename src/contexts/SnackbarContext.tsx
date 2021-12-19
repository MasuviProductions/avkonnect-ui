import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from "react";
import Snackbar, { ISnackbarProps } from "../components/Snackbar/Snackbar";

interface ISnackbarContext {
  snackbar?: ISnackbarProps;
  setSnackbar?: Dispatch<SetStateAction<ISnackbarProps | undefined>>;
}

const SnackbarContext = createContext<ISnackbarContext>({
  snackbar: undefined,
  setSnackbar: () => {},
});

const SnackbarProvider: React.FC = ({ children }) => {
  const [snackbar, setSnackbar] = useState<ISnackbarProps | undefined>();

  const handleClose = () => {
    setSnackbar(undefined);
  };

  return (
    <SnackbarContext.Provider value={{ snackbar, setSnackbar }}>
      {children}
      <Snackbar
        message={snackbar?.message}
        messageType={snackbar?.messageType}
        onClose={handleClose}
      />
    </SnackbarContext.Provider>
  );
};

const useSnackbarContext = (): ISnackbarContext => {
  const snackbarContext = useContext(SnackbarContext);
  return snackbarContext;
};

export { useSnackbarContext };
export default SnackbarProvider;
