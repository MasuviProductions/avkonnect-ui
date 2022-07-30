import DatePicker from "@mui/lab/DatePicker";
import dayjs from "dayjs";
import {
  Autocomplete,
  Container,
  Grid,
  Hidden,
  TextField,
  Theme,
} from "@mui/material";
import { SxProps } from "@mui/system";
import cloneDeep from "lodash.clonedeep";
import CustomButton from "../../../components/CustomButton";
import {
  USER_INFO_TEXT_FIELDS_CONFIG,
  IUserInfoTextFields,
  IUserInfoDateFields,
  USER_INFO_DATE_FIELDS_CONFIG,
} from "../../../constants/forms/user-info";
import { LABELS } from "../../../constants/labels";
import useTextFieldsWithValidation from "../../../hooks/useTextFieldsWithValidation";
import { IUserProfilePatchApiRequest } from "../../../interfaces/api/external";
import { IDateFieldConfig, ITextFieldConfig } from "../../../interfaces/app";
import useDateFieldsWithValidation from "../../../hooks/useDateFieldsWithValidation";
import { patchUserProfile } from "../../../utils/api";
import { useQuery } from "react-query";
import API_ENDPOINTS from "../../../constants/api";
import { useEffect, useState } from "react";
import { useAuthContext } from "../../../contexts/AuthContext";
import { IUser, useUserContext } from "../../../contexts/UserContext";
import { useSnackbarContext } from "../../../contexts/SnackbarContext";

interface IEditUserProps {
  onModalClose?: () => void;
}

const getInitialUserInfoTextFieldValues = (
  userInfo?: IUser
): Record<IUserInfoTextFields, ITextFieldConfig> => {
  const userInfoTextFieldsConfig = cloneDeep(USER_INFO_TEXT_FIELDS_CONFIG);
  userInfoTextFieldsConfig.headline.intialValue = userInfo?.headline;
  userInfoTextFieldsConfig.name.intialValue = userInfo?.name;
  userInfoTextFieldsConfig.gender.intialValue = userInfo?.gender;
  userInfoTextFieldsConfig.location.intialValue = userInfo?.location;

  return userInfoTextFieldsConfig;
};

const getInitialUserInfoDateFieldValues = (
  userInfo?: IUser
): Record<IUserInfoDateFields, IDateFieldConfig> => {
  const userInfoDateFieldsConfig = cloneDeep(USER_INFO_DATE_FIELDS_CONFIG);
  userInfoDateFieldsConfig.dateOfBirth.value = dayjs(userInfo?.dateOfBirth);
  return userInfoDateFieldsConfig;
};

const EditUser: React.FC<IEditUserProps> = ({ onModalClose }) => {
  const { authUser, accessToken } = useAuthContext();
  const { user, setUser } = useUserContext();
  const { setSnackbar } = useSnackbarContext();
  const [patchUserReq, setPatchUserReq] =
    useState<IUserProfilePatchApiRequest>();

  const { data: patchUserData, status: patchUserStatus } = useQuery(
    `User Edit: ${API_ENDPOINTS.USER_PROFILE.key}`,
    () =>
      patchUserProfile(
        accessToken as string,
        authUser?.id as string,
        patchUserReq as IUserProfilePatchApiRequest
      ),
    { cacheTime: 0, enabled: !!patchUserReq }
  );

  const userInfoDateFieldsConfig = getInitialUserInfoDateFieldValues(user);
  const userInfoTextFieldsConfig = getInitialUserInfoTextFieldValues(user);

  const {
    textFields,
    isFormInitialized,
    isFormValid,
    onFieldValueChange,
    onFieldValueBlur,
    onValidateAllFields,
  } = useTextFieldsWithValidation<IUserInfoTextFields>(
    userInfoTextFieldsConfig
  );

  const { dateFields, onDateValueChange } =
    useDateFieldsWithValidation<IUserInfoDateFields>(userInfoDateFieldsConfig);

  const handleSaveUserInfo = () => {
    if (onValidateAllFields()) {
      const updatedUserInfo: IUserProfilePatchApiRequest = {
        name: textFields.name.value as string,
        headline: textFields.headline.value as string,
        dateOfBirth: dateFields.dateOfBirth.value?.valueOf() as number,
        gender: textFields.gender.value as string,
        location: textFields.location.value as string,
      };
      setPatchUserReq(updatedUserInfo);
    }
  };

  useEffect(() => {
    if (patchUserStatus === "success") {
      setSnackbar?.(() => ({
        message: LABELS.SAVE_SUCCESS,
        messageType: "success",
      }));
      setUser(prev => ({
        ...prev,
        name: patchUserData?.data?.name as string,
        headline: patchUserData?.data?.headline as string,
        dateOfBirth: patchUserData?.data?.dateOfBirth as number,
        location: patchUserData?.data?.location as string,
        gender: patchUserData?.data?.gender as string,
      }));
      onModalClose?.();
    }
  }, [
    onModalClose,
    patchUserStatus,
    patchUserReq,
    setUser,
    patchUserData,
    setSnackbar,
  ]);

  return (
    <Container>
      <Grid container py={2} spacing={3}>
        <Grid item xs={12} md={6}>
          <TextField
            value={textFields.name.value}
            label={textFields.name.label}
            onChange={event => onFieldValueChange(event, "name")}
            onBlur={onFieldValueBlur("name")}
            sx={textField}
            required={textFields.name.isRequired}
            error={textFields.name.isError || false}
            color={
              textFields.name.messageType === "warning" ? "warning" : undefined
            }
            helperText={textFields.name.message}
          />
        </Grid>

        <Hidden mdDown>
          <Grid item md={6} />
        </Hidden>

        <Grid item xs={12} md={6}>
          <Autocomplete
            disablePortal
            value={textFields.gender.value}
            options={textFields.gender.options as Readonly<string[]>}
            sx={textField}
            renderInput={params => (
              <TextField
                label={textFields.gender.label}
                required={textFields.gender.isRequired}
                error={textFields.gender.isError || false}
                color={
                  textFields.gender.messageType === "warning"
                    ? "warning"
                    : undefined
                }
                helperText={textFields.gender.message}
                {...params}
              />
            )}
            onChange={(event, value) =>
              onFieldValueChange(event, "gender", value)
            }
            filterSelectedOptions
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <DatePicker
            views={dateFields.dateOfBirth.views}
            label={dateFields.dateOfBirth.label}
            value={dateFields.dateOfBirth.value}
            minDate={dateFields.dateOfBirth.minDate}
            maxDate={dateFields.dateOfBirth.maxDate}
            inputFormat="DD/MM/YYYY"
            onChange={date => onDateValueChange(date, "dateOfBirth")}
            renderInput={params => (
              <TextField sx={textField} {...params} helperText={null} />
            )}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField
            value={textFields.headline.value}
            label={textFields.headline.label}
            onChange={event => onFieldValueChange(event, "headline")}
            onBlur={onFieldValueBlur("headline")}
            sx={textField}
            required={textFields.headline.isRequired}
            error={textFields.headline.isError || false}
            color={
              textFields.headline.messageType === "warning"
                ? "warning"
                : undefined
            }
            helperText={textFields.headline.message}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <Autocomplete
            disablePortal
            value={textFields.location.value}
            options={textFields.location.options as Readonly<string[]>}
            sx={textField}
            renderInput={params => (
              <TextField
                label={textFields.location.label}
                required={textFields.location.isRequired}
                error={textFields.location.isError || false}
                color={
                  textFields.location.messageType === "warning"
                    ? "warning"
                    : undefined
                }
                helperText={textFields.location.message}
                {...params}
              />
            )}
            onChange={(event, value) =>
              onFieldValueChange(event, "location", value)
            }
            filterSelectedOptions
          />
        </Grid>

        <Grid item xs={12}>
          <Grid container justifyContent="flex-end" py={3}>
            <Grid item>
              <CustomButton
                loading={patchUserStatus === "loading"}
                disabled={
                  !isFormInitialized ||
                  !isFormValid ||
                  patchUserStatus === "loading"
                }
                onClick={handleSaveUserInfo}
              >
                {LABELS.SAVE}
              </CustomButton>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

const textField: SxProps<Theme> = (theme: Theme) => ({
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

export default EditUser;
