import {
  ITextField,
  ITextFieldConfig,
  ITextFieldPattern,
  ITextFieldValidity,
} from "../interfaces/app";

export const getFieldValidity = (
  validations: ITextFieldPattern[],
  value: string
): ITextFieldValidity => {
  for (let index = 0; index < validations.length; index += 1) {
    let regex = new RegExp(validations[index].regex, "i");
    if (regex.test(value)) {
      const fieldValidity: ITextFieldValidity = {
        message: validations[index].message || "",
        messageType: validations[index].messageType || "",
        isValid: false,
      };
      return fieldValidity;
    }
  }
  const fieldValidity: ITextFieldValidity = {
    message: "",
    messageType: "",
    isValid: true,
  };
  return fieldValidity;
};

export const isFieldValueLimited = (
  limitations: ITextFieldPattern[],
  value: string
): boolean => {
  for (let index = 0; index < limitations.length; index += 1) {
    // TODO: Check for regex
    let regex = new RegExp(limitations[index].regex, "i");
    if (regex.test(value)) {
      return true;
    }
  }
  return false;
};

export const transformFieldConfigToFields = <T extends string>(
  fieldsConfig: Record<T, ITextFieldConfig>
): Record<T, ITextField> => {
  let fields: Record<string, ITextField> = {};
  Object.entries(fieldsConfig).forEach(([field, _]) => {
    fields[field as T] = {
      value: fieldsConfig[field as T].intialValue || "",
      message: "",
      messageType: "",
      label: fieldsConfig[field as T].label,
      options: fieldsConfig[field as T].options,
    };
  });

  return fields;
};
