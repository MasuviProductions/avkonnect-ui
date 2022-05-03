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
import { useRouter } from "next/router";
import { APP_ROUTES } from "../../../constants/app";

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
  const router = useRouter();

  const signUpTextFieldsConfig = getInitialSignUpTextFieldValues();

  const { textFields, onFieldValueChange, onFieldValueBlur } =
    useTextFieldsWithValidation<ISignUpTextFields>(signUpTextFieldsConfig);

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
            onBlur={event => onFieldValueBlur(event, "fname")}
            sx={signUpTextFieldSx}
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
            onBlur={event => onFieldValueBlur(event, "lname")}
            sx={signUpTextFieldSx}
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
            onBlur={event => onFieldValueBlur(event, "emailId")}
            sx={signUpTextFieldSx}
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
            onBlur={event => onFieldValueBlur(event, "password")}
            sx={signUpTextFieldSx}
            fullWidth
          />
        </Box>
      </Grid>
      <Grid item xs={12}>
        <Box my={2} mx={1}>
          <Button variant="contained" color="primary" fullWidth>
            {LABELS.SIGN_UP}
          </Button>
        </Box>
      </Grid>
      <Grid item xs={12}>
        <Box m={1} display="flex" alignItems="center" justifyContent="center">
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
  input: {
    border: `1px solid ${theme.palette.primary.main}`,
    borderRadius: "4px",
    zIndex: 0,
    ":focus": {
      border: "none",
    },
  },
  fieldset: {
    legend: {
      span: {
        zIndex: 1,
      },
    },
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
