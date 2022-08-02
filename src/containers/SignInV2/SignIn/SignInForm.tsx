import {
  Box,
  Button,
  Grid,
  Link,
  TextField,
  Theme,
  Typography,
} from "@mui/material";
import { SxProps } from "@mui/system";
import cloneDeep from "lodash.clonedeep";
import {
  ISignInTextFields,
  SIGN_IN_FIELDS_CONFIG,
} from "../../../constants/forms/signin";
import { LABELS } from "../../../constants/labels";
import useTextFieldsWithValidation from "../../../hooks/useTextFieldsWithValidation";
import { ISignInUserApiModel } from "../../../interfaces/api/external";
import { ITextFieldConfig } from "../../../interfaces/app";
import { getTextFieldColorBasedOnMessageType } from "../../../utils/generic";

interface ISignInFormProps {
  saveLoading?: boolean;
  removeLoading?: boolean;
  setActiveTabValue?: (tabValue: number) => void;
  onSignIn?: (signInData: ISignInUserApiModel) => void;
}

const getInitialSignInTextFieldValues = (): Record<
  ISignInTextFields,
  ITextFieldConfig
> => {
  const signInTextFieldConfig = cloneDeep(SIGN_IN_FIELDS_CONFIG);
  signInTextFieldConfig.emailId.intialValue = "";
  signInTextFieldConfig.password.intialValue = "";
  return signInTextFieldConfig;
};

const SignInForm: React.FC<ISignInFormProps> = ({
  saveLoading = false,
  removeLoading = false,
  setActiveTabValue = () => {},
  onSignIn = () => {},
}) => {
  const signInTextFieldsConfig = getInitialSignInTextFieldValues();

  const {
    textFields,
    isFormInitialized,
    isFormValid,
    onFieldValueChange,
    onFieldValueBlur,
  } = useTextFieldsWithValidation<ISignInTextFields>(signInTextFieldsConfig);

  const handleSignUpRedirect = () => {
    setActiveTabValue(1);
  };

  return (
    <Grid container>
      <Grid item xs={12}>
        <Box m={1}>
          <TextField
            value={textFields.emailId.value}
            label={textFields.emailId.label}
            onChange={(event) => onFieldValueChange(event, "emailId")}
            onBlur={onFieldValueBlur("emailId")}
            sx={signInTextFieldSx}
            required={textFields.emailId.isRequired}
            error={textFields.emailId.isError || false}
            color={getTextFieldColorBasedOnMessageType(
              textFields.emailId.messageType
            )}
            helperText={textFields.emailId.message}
            fullWidth
          />
        </Box>
      </Grid>
      <Grid item xs={12}>
        <Box m={1}>
          <TextField
            value={textFields.password.value}
            label={textFields.password.label}
            onChange={(event) => onFieldValueChange(event, "password")}
            onBlur={onFieldValueBlur("password")}
            sx={signInTextFieldSx}
            required={textFields.password.isRequired}
            error={textFields.password.isError || false}
            color={getTextFieldColorBasedOnMessageType(
              textFields.password.messageType
            )}
            helperText={textFields.password.message}
            fullWidth
          />
        </Box>
      </Grid>
      <Grid item xs={12}>
        <Box m={2}>
          <Button
            variant="contained"
            color="primary"
            disabled={!isFormInitialized || !isFormValid}
            fullWidth
          >
            {LABELS.SIGN_IN}
          </Button>
        </Box>
      </Grid>
      <Grid item xs={12}>
        <Box
          mx={1}
          my={2}
          display="flex"
          alignItems="center"
          justifyContent="space-between"
        >
          <Link sx={linkSx}>
            <Typography variant="body2">{LABELS.FORGOT_PASSWORD}</Typography>
          </Link>
          <Link sx={linkSx} onClick={handleSignUpRedirect}>
            <Typography variant="body2">{LABELS.NEW_SIGN_UP}</Typography>
          </Link>
        </Box>
      </Grid>
    </Grid>
  );
};

const signInTextFieldSx: SxProps<Theme> = (theme: Theme) => ({
  width: " 100%",
  color: theme.palette.text.primary,
  "& label.Mui-focused": {
    color: theme.palette.text.primary,
  },

  ".MuiOutlinedInput-root": {
    fieldset: {
      borderColor: theme.palette.secondary.main,
    },
    "&.Mui-focused fieldset": {
      borderColor: theme.palette.secondary.main,
    },
  },

  ".MuiButtonBase-root": {
    color: theme.palette.text.primary,
  },
});

const linkSx: SxProps<Theme> = () => ({
  ":hover": {
    cursor: "pointer",
    textDecoration: "underline",
  },
  textDecoration: "none",
});

export default SignInForm;
