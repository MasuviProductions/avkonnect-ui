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
  PROJECT_TEXT_FIELDS_CONFIG,
  IProjectTextFields,
  PROJECT_DATE_RANGE_FIELDS_CONFIG,
  INDUSTRY_FIELDS,
  EMPLOYMENT_TYPE_FIELDS,
} from "../../../constants/forms/project";
import { LABELS } from "../../../constants/labels";
import useTextFieldsWithValidation from "../../../hooks/useTextFieldsWithValidation";
import { IUserProjectApiModel } from "../../../interfaces/api/external";
import {
  IDateFieldConfig,
  IDateRangeType,
  ITextFieldConfig,
} from "../../../interfaces/app";
import useDateRangeFieldsWithValidation from "../../../hooks/useDateRangeFieldsWithValidation";
import { useEffect, useState } from "react";
import { MAX_DATE } from "../../../constants/app";
import { getURLFormattedMessage } from "../../../utils/generic";
import { getDateRangeValidity } from "../../../utils/form";

interface IProjectFormProps {
  project?: IUserProjectApiModel;
  saveLoading?: boolean;
  removeLoading?: boolean;
  onSaveProject?: (project: IUserProjectApiModel) => void;
  onRemoveProject?: () => void;
}

const getInitialProjectTextFieldValues = (
  project?: IUserProjectApiModel
): Record<IProjectTextFields, ITextFieldConfig> => {
  const projectTextFieldsConfig = cloneDeep(PROJECT_TEXT_FIELDS_CONFIG);
  projectTextFieldsConfig.name.intialValue = project?.name;
  projectTextFieldsConfig.companyName.intialValue = project?.companyName;
  projectTextFieldsConfig.description.intialValue = project?.description;
  projectTextFieldsConfig.role.intialValue = project?.role;
  projectTextFieldsConfig.industry.intialValue =
    project?.industry || INDUSTRY_FIELDS[0];
  projectTextFieldsConfig.employmentType.intialValue =
    project?.employmentType || EMPLOYMENT_TYPE_FIELDS[0];
  return projectTextFieldsConfig;
};

const getInitialProjectDateRangeFieldValues = (
  project?: IUserProjectApiModel
): Record<IDateRangeType, IDateFieldConfig> => {
  const projectDateRangeFieldsConfig = cloneDeep(
    PROJECT_DATE_RANGE_FIELDS_CONFIG
  );
  projectDateRangeFieldsConfig.from.value = dayjs(project?.startDate);
  projectDateRangeFieldsConfig.to.value = dayjs(project?.endDate);
  return projectDateRangeFieldsConfig;
};

const ProjectForm: React.FC<IProjectFormProps> = ({
  project,
  saveLoading = false,
  removeLoading = false,
  onSaveProject,
  onRemoveProject,
}) => {
  const projectDateRangeFieldsConfig =
    getInitialProjectDateRangeFieldValues(project);

  const projectTextFieldsConfig = getInitialProjectTextFieldValues(project);

  const {
    textFields,
    isFormValid,
    isFormInitialized,
    onFieldValueChange,
    onFieldValueBlur,
    onValidateAllFields,
  } = useTextFieldsWithValidation<IProjectTextFields>(projectTextFieldsConfig);

  const { dateValues, onDateValueChange } = useDateRangeFieldsWithValidation(
    projectDateRangeFieldsConfig
  );

  const [isPresentlyWorking, setIsPresentlyWorking] = useState(
    project?.endDate === MAX_DATE
  );

  const handleIsPresentlyWorking = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setIsPresentlyWorking(event.target.checked);
  };

  const handleSaveProject = () => {
    if (
      onValidateAllFields() &&
      getDateRangeValidity(dateValues.from.value, dateValues.to.value)
    ) {
      const urlFormattedDescription: string = getURLFormattedMessage(
        textFields.description.value
      );
      const updatedProject: IUserProjectApiModel = {
        companyName: textFields.companyName.value as string,
        collaboratorsRefs: [],
        description: urlFormattedDescription,
        employmentType: textFields.employmentType.value,
        endDate: dateValues.to.value?.valueOf() as number,
        industry: textFields.industry.value,
        name: textFields.name.value as string,
        role: textFields.role.value as string,
        startDate: dateValues.from.value?.valueOf() as number,
      };
      onSaveProject?.(updatedProject);
    }
  };

  const handleRemoveProject = () => {
    onRemoveProject?.();
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
          <Grid item md={6}></Grid>
        </Hidden>

        <Grid item xs={12} md={6}>
          <TextField
            value={textFields.companyName.value}
            label={textFields.companyName.label}
            onChange={event => onFieldValueChange(event, "companyName")}
            onBlur={onFieldValueBlur("companyName")}
            sx={textField}
            required={textFields.companyName.isRequired}
            error={textFields.companyName.isError || false}
            color={
              textFields.companyName.messageType === "warning"
                ? "warning"
                : undefined
            }
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
                helperText={textFields.industry.message}
                label={textFields.industry.label}
                required={textFields.industry.isRequired}
                error={textFields.industry.isError || false}
                color={
                  textFields.industry.messageType === "warning"
                    ? "warning"
                    : undefined
                }
                onBlur={onFieldValueBlur("industry")}
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
            color={
              textFields.role.messageType === "warning" ? "warning" : undefined
            }
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
                helperText={textFields.employmentType.message}
                label={textFields.employmentType.label}
                required={textFields.employmentType.isRequired}
                error={textFields.employmentType.isError || false}
                color={
                  textFields.employmentType.messageType === "warning"
                    ? "warning"
                    : undefined
                }
                onBlur={onFieldValueBlur("employmentType")}
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
            renderInput={params => <TextField sx={textField} {...params} />}
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
              <Typography variant="body2">{LABELS.PROJECT_ONGOING}</Typography>
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
            color={
              textFields.description.messageType === "warning"
                ? "warning"
                : undefined
            }
            helperText={textFields.description.message}
          />
        </Grid>

        <Grid item xs={12}>
          <Grid container justifyContent="flex-end" py={3}>
            {project && (
              <Grid item px={2}>
                <CustomButton
                  loading={removeLoading}
                  disabled={removeLoading}
                  onClick={handleRemoveProject}
                  dangerBtn
                >
                  {LABELS.REMOVE}
                </CustomButton>
              </Grid>
            )}
            <Grid item>
              <CustomButton
                loading={saveLoading}
                disabled={!isFormInitialized || !isFormValid || saveLoading}
                onClick={handleSaveProject}
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

export default ProjectForm;
