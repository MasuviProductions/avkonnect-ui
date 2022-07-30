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
  CERTIFICATION_TEXT_FIELDS_CONFIG,
  ICertificationTextFields,
  CERTIFICATION_DATE_RANGE_FIELDS_CONFIG,
  INDUSTRY_FIELDS,
} from "../../../constants/forms/certification";
import { LABELS } from "../../../constants/labels";
import useTextFieldsWithValidation from "../../../hooks/useTextFieldsWithValidation";
import { IUserCertificationApiModel } from "../../../interfaces/api/external";
import {
  IDateFieldConfig,
  IDateRangeType,
  ITextFieldConfig,
} from "../../../interfaces/app";
import useDateRangeFieldsWithValidation from "../../../hooks/useDateRangeFieldsWithValidation";
import { useEffect, useState } from "react";
import { MAX_DATE } from "../../../constants/app";
import { getURLFormattedMessage } from "../../../utils/generic";

interface ICertificationFormProps {
  certification?: IUserCertificationApiModel;
  saveLoading?: boolean;
  removeLoading?: boolean;
  onSaveCertification?: (certification: IUserCertificationApiModel) => void;
  onRemoveCertification?: () => void;
}

const getInitialCertificationTextFieldValues = (
  certification?: IUserCertificationApiModel
): Record<ICertificationTextFields, ITextFieldConfig> => {
  const certificationTextFieldsConfig = cloneDeep(
    CERTIFICATION_TEXT_FIELDS_CONFIG
  );
  certificationTextFieldsConfig.issuerName.intialValue =
    certification?.issuerName;
  certificationTextFieldsConfig.name.intialValue = certification?.name;
  certificationTextFieldsConfig.description.intialValue =
    certification?.description;
  certificationTextFieldsConfig.link.intialValue = certification?.link;
  certificationTextFieldsConfig.industry.intialValue =
    certification?.industry || INDUSTRY_FIELDS[0];

  return certificationTextFieldsConfig;
};

const getInitialCertificationDateRangeFieldValues = (
  certification?: IUserCertificationApiModel
): Record<IDateRangeType, IDateFieldConfig> => {
  const certificationDateRangeFieldsConfig = cloneDeep(
    CERTIFICATION_DATE_RANGE_FIELDS_CONFIG
  );
  certificationDateRangeFieldsConfig.from.value = dayjs(
    certification?.issuedAt
  );
  certificationDateRangeFieldsConfig.to.value = dayjs(certification?.expiresAt);
  return certificationDateRangeFieldsConfig;
};

const CertificationForm: React.FC<ICertificationFormProps> = ({
  certification,
  saveLoading = false,
  removeLoading = false,
  onSaveCertification,
  onRemoveCertification,
}) => {
  const certificationDateRangeFieldsConfig =
    getInitialCertificationDateRangeFieldValues(certification);

  const certificationTextFieldsConfig =
    getInitialCertificationTextFieldValues(certification);

  const {
    textFields,
    isFormInitialized,
    isFormValid,
    onFieldValueChange,
    onFieldValueBlur,
    onValidateAllFields,
  } = useTextFieldsWithValidation<ICertificationTextFields>(
    certificationTextFieldsConfig
  );

  const { dateValues, onDateValueChange } = useDateRangeFieldsWithValidation(
    certificationDateRangeFieldsConfig
  );

  const [isPresentlyWorking, setIsPresentlyWorking] = useState(
    certification?.expiresAt === MAX_DATE
  );

  const handleIsPresentlyWorking = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setIsPresentlyWorking(event.target.checked);
  };

  const handleSaveCertification = () => {
    if (onValidateAllFields()) {
      const urlFormattedDescription: string = getURLFormattedMessage(
        textFields.description.value
      );
      const updatedCertification: IUserCertificationApiModel = {
        issuerName: textFields.issuerName.value as string,
        name: textFields.name.value as string,
        link: textFields.link.value as string,
        description: urlFormattedDescription,
        expiresAt: dateValues.to.value?.valueOf() as number,
        industry: textFields.industry.value,
        issuedAt: dateValues.from.value?.valueOf() as number,
        photoUrl: "",
      };
      onSaveCertification?.(updatedCertification);
    }
  };

  const handleRemoveCertification = () => {
    onRemoveCertification?.();
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
          <Grid item md={6} />
        </Hidden>

        <Grid item xs={12} md={6}>
          <TextField
            value={textFields.issuerName.value}
            label={textFields.issuerName.label}
            onChange={event => onFieldValueChange(event, "issuerName")}
            onBlur={onFieldValueBlur("issuerName")}
            sx={textField}
            required={textFields.issuerName.isRequired}
            error={textFields.issuerName.isError || false}
            color={
              textFields.issuerName.messageType === "warning"
                ? "warning"
                : undefined
            }
            helperText={textFields.issuerName.message}
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
                {LABELS.CERTIFICATION_NO_EXPIRY}
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
            color={
              textFields.description.messageType === "warning"
                ? "warning"
                : undefined
            }
            helperText={textFields.description.message}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField
            value={textFields.link.value}
            label={textFields.link.label}
            onChange={event => onFieldValueChange(event, "link")}
            onBlur={onFieldValueBlur("link")}
            sx={textField}
            required={textFields.link.isRequired}
            error={textFields.link.isError || false}
            color={
              textFields.link.messageType === "warning" ? "warning" : undefined
            }
            helperText={textFields.link.message}
          />
        </Grid>

        <Grid item xs={12}>
          <Grid container justifyContent="flex-end" py={3}>
            {certification && (
              <Grid item px={2}>
                <CustomButton
                  loading={removeLoading}
                  disabled={removeLoading}
                  onClick={handleRemoveCertification}
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
                onClick={handleSaveCertification}
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

export default CertificationForm;
