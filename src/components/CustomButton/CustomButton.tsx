import { Button, CircularProgress, Theme } from "@mui/material";
import { SystemStyleObject } from "@mui/system";
import { MouseEventHandler } from "react";

interface ICustomBtnProps {
  loading?: boolean;
  disabled?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  dangerBtn?: boolean;
}

const CustomButton: React.FC<ICustomBtnProps> = ({
  loading = false,
  disabled = false,
  dangerBtn = false,
  onClick,
  children,
}) => {
  const handleLoadingBtnSx = (theme: Theme): SystemStyleObject<Theme> => {
    return loadingBtnSx(theme, loading);
  };

  const handleSpinnerSx = (theme: Theme): SystemStyleObject<Theme> => {
    return spinnerSx(theme, disabled);
  };

  return (
    <Button
      variant="contained"
      sx={handleLoadingBtnSx}
      disabled={disabled}
      onClick={onClick}
      color={dangerBtn ? "error" : undefined}
    >
      {loading && <CircularProgress size="16px" sx={handleSpinnerSx} />}
      {children}
    </Button>
  );
};

const spinnerSx = (
  theme: Theme,
  disabled: boolean
): SystemStyleObject<Theme> => ({
  marginRight: "4px",
  color: disabled
    ? theme.palette.getContrastText(theme.palette.background.highlighted)
    : `${theme.palette.primary.contrastText}`,
  opacity: disabled ? 0.5 : 1,
});

const loadingBtnSx = (
  theme: Theme,
  loading: boolean
): SystemStyleObject<Theme> => ({
  paddingX: loading ? "12px" : "22px",
  opacity: 1,
  "&.MuiButtonBase-root:disabled": {
    backgroundColor: theme.palette.background.highlighted,
    color: theme.palette.getContrastText(theme.palette.background.highlighted),
    opacity: 0.5,
  },
});

export default CustomButton;
