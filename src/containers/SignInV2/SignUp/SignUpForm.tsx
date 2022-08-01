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
  ISignUpTextFields,
  SIGN_UP_FIELDS_CONFIG,
} from "../../../constants/forms/signup";
import { LABELS } from "../../../constants/labels";
import useTextFieldsWithValidation from "../../../hooks/useTextFieldsWithValidation";
import { ISignUpUserApiModel } from "../../../interfaces/api/external";
import { ITextFieldConfig } from "../../../interfaces/app";
import { setTextFieldColor } from "../../../utils/generic";

interface ISignUpFormProps {
  saveLoading?: boolean;
  removeLoading?: boolean;
  setActiveTabValue?: (tabValue: number) => void;
  onSignUp?: (signUpData: ISignUpUserApiModel) => void;
}

const getInitialSignUpTextFieldValues = (): Record<
  ISignUpTextFields,
  ITextFieldConfig
> => {
  const signUpTextFieldConfig = cloneDeep(SIGN_UP_FIELDS_CONFIG);
  signUpTextFieldConfig.emailId.intialValue = "";
  signUpTextFieldConfig.password.intialValue = "";
  return signUpTextFieldConfig;
};

const SignUpForm: React.FC<ISignUpFormProps> = ({
  saveLoading = false,
  removeLoading = false,
  setActiveTabValue = () => {},
  onSignUp = () => {},
}) => {
  const signUpTextFieldsConfig = getInitialSignUpTextFieldValues();

  const {
    textFields,
    isFormInitialized,
    isFormValid,
    onFieldValueChange,
    onFieldValueBlur,
  } = useTextFieldsWithValidation<ISignUpTextFields>(signUpTextFieldsConfig);

  const handleSignInRedirect = () => {
    setActiveTabValue(0);
  };

  return (
    <Grid container>
      <Grid item xs={6}>
        <Box m={1}>
          <TextField
            value={textFields.fname.value}
            label={textFields.fname.label}
            onChange={event => onFieldValueChange(event, "fname")}
            onBlur={onFieldValueBlur("fname")}
            sx={signUpTextFieldSx}
            required={textFields.fname.isRequired}
            error={textFields.fname.isError || false}
            color={setTextFieldColor(textFields.fname.messageType)}
            helperText={textFields.fname.message}
            fullWidth
          />
        </Box>
      </Grid>
      <Grid item xs={6}>
        <Box m={1}>
          <TextField
            value={textFields.lname.value}
            label={textFields.lname.label}
            onChange={event => onFieldValueChange(event, "lname")}
            onBlur={onFieldValueBlur("lname")}
            sx={signUpTextFieldSx}
            required={textFields.lname.isRequired}
            error={textFields.lname.isError || false}
            color={setTextFieldColor(textFields.lname.messageType)}
            helperText={textFields.lname.message}
            fullWidth
          />
        </Box>
      </Grid>
      <Grid item xs={12}>
        <Box m={1}>
          <TextField
            value={textFields.emailId.value}
            label={textFields.emailId.label}
            onChange={event => onFieldValueChange(event, "emailId")}
            onBlur={onFieldValueBlur("emailId")}
            sx={signUpTextFieldSx}
            required={textFields.emailId.isRequired}
            error={textFields.emailId.isError || false}
            color={setTextFieldColor(textFields.emailId.messageType)}
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
            onChange={event => onFieldValueChange(event, "password")}
            onBlur={onFieldValueBlur("password")}
            sx={signUpTextFieldSx}
            required={textFields.password.isRequired}
            error={textFields.password.isError || false}
            color={setTextFieldColor(textFields.password.messageType)}
            helperText={textFields.password.message}
            fullWidth
          />
        </Box>
      </Grid>
      <Grid item xs={12}>
        <Box my={2} mx={1}>
          <Button
            variant="contained"
            disabled={!isFormInitialized || !isFormValid}
            color="primary"
            fullWidth
          >
            {LABELS.SIGN_UP}
          </Button>
        </Box>
      </Grid>
      <Grid item xs={12}>
        <Box m={1}>
          <Link sx={linkSx} onClick={handleSignInRedirect}>
            <Typography variant="body2">
              {LABELS.ACCOUNT_PRESENT_SIGN_IN}
            </Typography>
          </Link>
        </Box>
      </Grid>
    </Grid>
  );
};

const signUpTextFieldSx: SxProps<Theme> = (theme: Theme) => ({
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

export default SignUpForm;
