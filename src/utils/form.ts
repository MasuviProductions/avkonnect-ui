import { Dayjs } from "dayjs";
import { LABELS } from "../constants/labels";
import {
  IDateField,
  IDateFieldConfig,
  ITextField,
  ITextFieldConfig,
  ITextFieldPattern,
  ITextFieldValidity,
} from "../interfaces/app";

export const getFieldValidity = (
  validations: ITextFieldPattern[],
  value: string,
  isRequired: boolean
): ITextFieldValidity => {
  if (isRequired && !value) {
    const fieldValidity: ITextFieldValidity = {
      message: LABELS.FORM_FIELD_MANDATORY_ERROR_MSG,
      messageType: "error",
      isValid: false,
    };
    return fieldValidity;
  }
  for (let index = 0; index < validations.length; index += 1) {
    let validRegex = validations[index].regex;
    if (validRegex) {
      let regex = new RegExp(validRegex, "i");
      if (!regex.test(value)) {
        const fieldValidity: ITextFieldValidity = {
          message: validations[index].message || "",
          messageType: validations[index].messageType || "",
          isValid: false,
        };
        return fieldValidity;
      }
    }
  }
  const fieldValidity: ITextFieldValidity = {
    isValid: true,
  };
  return fieldValidity;
};

export const getDateRangeValidity = (
  fromDate: Dayjs | null,
  toDate: Dayjs | null
): boolean => {
  if (toDate && fromDate) {
    if (toDate >= fromDate) {
      return true;
    }
  }
  return false;
};

export const isFieldValueLimited = (
  limitations: ITextFieldPattern[],
  value: string
): boolean => {
  for (let index = 0; index < limitations.length; index += 1) {
    let isValid = true;
    let validRegex = limitations[index].regex;
    let maxCharacters = limitations[index].maxCharacters;
    if (maxCharacters && value.length <= maxCharacters) {
      isValid = isValid && true;
    } else {
      isValid = false;
    }
    if (validRegex) {
      let regex = new RegExp(validRegex, "i");
      if (regex.test(value)) {
        isValid = isValid && true;
      }
    }
    return isValid;
  }
  return false;
};

export const transformTextFieldConfigToFields = <T extends string>(
  fieldsConfig: Record<T, ITextFieldConfig>
): Record<T, ITextField> => {
  let fields: Record<string, ITextField> = {};
  Object.entries(fieldsConfig).forEach(([field, _]) => {
    fields[field as T] = {
      value: fieldsConfig[field as T].intialValue || "",
      message: "",
      messageType: undefined,
      label: fieldsConfig[field as T].label,
      options: fieldsConfig[field as T].options,
      isError: false,
      isRequired: fieldsConfig[field as T].isRequired || false,
    };
  });

  return fields;
};

export const transformDateFieldConfigToFields = <T extends string>(
  fieldsConfig: Record<T, IDateFieldConfig>
): Record<T, IDateField> => {
  let fields: Record<string, IDateField> = {};
  Object.entries(fieldsConfig).forEach(([field, _]) => {
    fields[field as T] = {
      value: fieldsConfig[field as T].value || null,
      label: fieldsConfig[field as T].label,
      views: fieldsConfig[field as T].views,
      id: fieldsConfig[field as T].id,
      minDate: fieldsConfig[field as T].minDate,
      maxDate: fieldsConfig[field as T].maxDate,
    };
  });

  return fields;
};
