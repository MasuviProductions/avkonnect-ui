import DatePicker from "@mui/lab/DatePicker";
import dayjs from "dayjs";
import {
  Autocomplete,
  Checkbox,
  Container,
  Grid,
  Hidden,
  TextField,
  Theme,
  Typography,
} from "@mui/material";
import { SxProps } from "@mui/system";
import cloneDeep from "lodash.clonedeep";
import CustomButton from "../../../components/CustomButton";
import {
  EXPERIENCE_TEXT_FIELDS_CONFIG,
  IExperienceTextFields,
  EXPERIENCE_DATE_RANGE_FIELDS_CONFIG,
  INDUSTRY_FIELDS,
  EMPLOYMENT_TYPE_FIELDS,
} from "../../../constants/forms/experience";
import { LABELS } from "../../../constants/labels";
import useTextFieldsWithValidation from "../../../hooks/useTextFieldsWithValidation";
import { IUserExperienceApiModel } from "../../../interfaces/api/external";
import {
  IDateFieldConfig,
  IDateRangeType,
  ITextFieldConfig,
} from "../../../interfaces/app";
import useDateRangeFieldsWithValidation from "../../../hooks/useDateRangeFieldsWithValidation";
import { useEffect, useState } from "react";
import { MAX_DATE } from "../../../constants/app";
import {
  getURLFormattedMessage,
  setTextFieldColor,
} from "../../../utils/generic";
import { getDateRangeValidity } from "../../../utils/form";

interface IExperienceFormProps {
  experience?: IUserExperienceApiModel;
  saveLoading?: boolean;
  removeLoading?: boolean;
  onSaveExperience?: (experience: IUserExperienceApiModel) => void;
  onRemoveExperience?: () => void;
}

const getInitialExperienceTextFieldValues = (
  experience?: IUserExperienceApiModel
): Record<IExperienceTextFields, ITextFieldConfig> => {
  const experienceTextFieldsConfig = cloneDeep(EXPERIENCE_TEXT_FIELDS_CONFIG);
  experienceTextFieldsConfig.companyName.intialValue = experience?.companyName;
  experienceTextFieldsConfig.description.intialValue = experience?.description;
  experienceTextFieldsConfig.role.intialValue = experience?.role;
  experienceTextFieldsConfig.industry.intialValue =
    experience?.industry || INDUSTRY_FIELDS[0];
  experienceTextFieldsConfig.employmentType.intialValue =
    experience?.employmentType || EMPLOYMENT_TYPE_FIELDS[0];
  return experienceTextFieldsConfig;
};

const getInitialExperienceDateRangeFieldValues = (
  experience?: IUserExperienceApiModel
): Record<IDateRangeType, IDateFieldConfig> => {
  const experienceDateRangeFieldsConfig = cloneDeep(
    EXPERIENCE_DATE_RANGE_FIELDS_CONFIG
  );
  experienceDateRangeFieldsConfig.from.value = dayjs(experience?.startDate);
  experienceDateRangeFieldsConfig.to.value = dayjs(experience?.endDate);
  return experienceDateRangeFieldsConfig;
};

const ExperienceForm: React.FC<IExperienceFormProps> = ({
  experience,
  saveLoading = false,
  removeLoading = false,
  onSaveExperience,
  onRemoveExperience,
}) => {
  const experienceDateRangeFieldsConfig =
    getInitialExperienceDateRangeFieldValues(experience);

  const experienceTextFieldsConfig =
    getInitialExperienceTextFieldValues(experience);

  const {
    textFields,
    isFormInitialized,
    isFormValid,
    onFieldValueChange,
    onFieldValueBlur,
    onValidateAllFields,
  } = useTextFieldsWithValidation<IExperienceTextFields>(
    experienceTextFieldsConfig
  );

  const { dateValues, isDateRangeValid, onDateValueChange } =
    useDateRangeFieldsWithValidation(experienceDateRangeFieldsConfig);

  const [isPresentlyWorking, setIsPresentlyWorking] = useState(
    experience?.endDate === MAX_DATE
  );

  const handleIsPresentlyWorking = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setIsPresentlyWorking(event.target.checked);
  };

  const handleSaveExperience = () => {
    if (onValidateAllFields()) {
      const urlFormattedDescription = getURLFormattedMessage(
        textFields.description.value
      );
      const updatedExperience: IUserExperienceApiModel = {
        companyName: textFields.companyName.value as string,
        description: urlFormattedDescription,
        employmentType: textFields.employmentType.value,
        endDate: dateValues.to.value?.valueOf() as number,
        industry: textFields.industry.value,
        role: textFields.role.value as string,
        startDate: dateValues.from.value?.valueOf() as number,
      };
      onSaveExperience?.(updatedExperience);
    }
  };

  const handleRemoveExperience = () => {
    onRemoveExperience?.();
  };

  useEffect(() => {
    if (isPresentlyWorking) {
      onDateValueChange(dayjs(MAX_DATE), "to");
    } else {
      onDateValueChange(dayjs(Date.now()), "to");
    }
  }, [isPresentlyWorking, onDateValueChange]);

  return (
    <Container>
      <Grid container py={2} spacing={3}>
        <Grid item xs={12} md={6}>
          <TextField
            value={textFields.companyName.value}
            label={textFields.companyName.label}
            onChange={event => onFieldValueChange(event, "companyName")}
            onBlur={onFieldValueBlur("companyName")}
            sx={textField}
            required={textFields.companyName.isRequired}
            error={textFields.companyName.isError || false}
            color={setTextFieldColor(textFields.companyName.messageType)}
            helperText={textFields.companyName.message}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <Autocomplete
            disablePortal
            value={textFields.industry.value}
            options={textFields.industry.options as Readonly<string[]>}
            sx={textField}
            renderInput={params => (
              <TextField
                label={textFields.industry.label}
                required={textFields.industry.isRequired}
                error={textFields.industry.isError || false}
                color={setTextFieldColor(textFields.industry.messageType)}
                helperText={textFields.industry.message}
                {...params}
              />
            )}
            onChange={(event, value) =>
              onFieldValueChange(event, "industry", value)
            }
            filterSelectedOptions
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField
            value={textFields.role.value}
            label={textFields.role.label}
            onChange={event => onFieldValueChange(event, "role")}
            onBlur={onFieldValueBlur("role")}
            sx={textField}
            required={textFields.role.isRequired}
            error={textFields.role.isError || false}
            color={setTextFieldColor(textFields.role.messageType)}
            helperText={textFields.role.message}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <Autocomplete
            disablePortal
            value={textFields.employmentType.value}
            options={textFields.employmentType.options as Readonly<string[]>}
            sx={textField}
            renderInput={params => (
              <TextField
                label={textFields.employmentType.label}
                required={textFields.employmentType.isRequired}
                error={textFields.employmentType.isError || false}
                color={setTextFieldColor(textFields.employmentType.messageType)}
                helperText={textFields.employmentType.message}
                {...params}
              />
            )}
            onChange={(event, value) =>
              onFieldValueChange(event, "employmentType", value)
            }
            filterSelectedOptions
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <DatePicker
            views={dateValues.from.views}
            label={dateValues.from.label}
            value={dateValues.from.value}
            minDate={dateValues.from.minDate}
            maxDate={dateValues.from.maxDate}
            onChange={date => onDateValueChange(date, "from")}
            renderInput={params => (
              <TextField sx={textField} {...params} helperText={null} />
            )}
          />
        </Grid>

        {!isPresentlyWorking && (
          <Grid item xs={12} md={6}>
            <DatePicker
              views={dateValues.to.views}
              label={dateValues.to.label}
              value={dateValues.to.value}
              minDate={dateValues.to.minDate}
              maxDate={dateValues.to.maxDate}
              onChange={date => onDateValueChange(date, "to")}
              renderInput={params => (
                <TextField sx={textField} {...params} helperText={null} />
              )}
            />
          </Grid>
        )}

        <Grid item xs={12} mt={-3} ml={-1}>
          <Grid container alignItems="center">
            <Grid item>
              <Checkbox
                checked={isPresentlyWorking}
                onChange={handleIsPresentlyWorking}
                inputProps={{ "aria-label": "controlled" }}
              />
            </Grid>
            <Grid item>
              <Typography variant="body2">
                {LABELS.EXPERIENCE_ONGOING}
              </Typography>
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={12}>
          <TextField
            multiline
            rows={3}
            value={textFields.description.value}
            label={textFields.description.label}
            onChange={event => onFieldValueChange(event, "description")}
            onBlur={onFieldValueBlur("description")}
            sx={textField}
            required={textFields.description.isRequired}
            error={textFields.description.isError || false}
            color={setTextFieldColor(textFields.description.messageType)}
            helperText={textFields.description.message}
          />
        </Grid>

        <Grid item xs={12}>
          <Grid container justifyContent="flex-end" py={3}>
            {experience && (
              <Grid item px={2}>
                <CustomButton
                  loading={removeLoading}
                  disabled={removeLoading}
                  onClick={handleRemoveExperience}
                  dangerBtn
                >
                  {LABELS.REMOVE}
                </CustomButton>
              </Grid>
            )}
            <Grid item>
              <CustomButton
                loading={saveLoading}
                disabled={
                  !isDateRangeValid ||
                  !isFormInitialized ||
                  !isFormValid ||
                  saveLoading
                }
                onClick={handleSaveExperience}
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

export default ExperienceForm;
