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
import { useRouter } from "next/router";
import { APP_ROUTES } from "../../../constants/app";
import {
  ISignInTextFields,
  SIGN_IN_FIELDS_CONFIG,
} from "../../../constants/forms/signin";
import { LABELS } from "../../../constants/labels";
import useTextFieldsWithValidation from "../../../hooks/useTextFieldsWithValidation";
import { ISignInUserApiModel } from "../../../interfaces/api/external";
import { ITextFieldConfig } from "../../../interfaces/app";

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
  const router = useRouter();

  const signInTextFieldsConfig = getInitialSignInTextFieldValues();

  const { textFields, onFieldValueChange, onFieldValueBlur } =
    useTextFieldsWithValidation<ISignInTextFields>(signInTextFieldsConfig);

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
            onChange={event => onFieldValueChange(event, "emailId")}
            onBlur={event => onFieldValueBlur(event, "emailId")}
            sx={signInTextFieldSx}
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
            sx={signInTextFieldSx}
            fullWidth
          />
        </Box>
      </Grid>
      <Grid item xs={12}>
        <Box m={2}>
          <Button variant="contained" color="primary" fullWidth>
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
  input: {
    border: `1px solid ${theme.palette.text.secondary}`,
    borderRadius: "4px",
    ":focus": {
      border: "none",
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

const authBtnSx: SxProps<Theme> = () => ({
  width: "75%",
  marginTop: "8px",
});

export default SignInForm;
