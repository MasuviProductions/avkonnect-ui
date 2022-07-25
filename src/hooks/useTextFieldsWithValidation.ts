import {
  ChangeEvent,
  SyntheticEvent,
  useCallback,
  useEffect,
  useState,
} from "react";
import { ITextField, ITextFieldConfig } from "../interfaces/app";
import {
  getFieldValidity,
  isFieldValueLimited,
  transformTextFieldConfigToFields,
} from "../utils/form";

interface ITextFieldsWithValidation<T extends string> {
  textFields: Record<T, ITextField>;
  isFormValid: boolean;
  isFormInitialized: boolean;
  onFieldValueChange: (
    event:
      | ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      | SyntheticEvent<Element, Event>,
    field: T,
    optionValue?: string | null
  ) => void;
  onFieldValueBlur: (
    field: T
  ) => (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onValidateAllFields: () => boolean;
}

const useTextFieldsWithValidation = <T extends string>(
  fieldsConfig: Record<T, ITextFieldConfig>
): ITextFieldsWithValidation<T> => {
  const [textFields, setTextFields] = useState<Record<T, ITextField>>(
    transformTextFieldConfigToFields<T>(fieldsConfig)
  );
  const [isFormInitialized, setIsFormInitialized] = useState<boolean>(false);
  const [isFormValid, setIsFormValid] = useState<boolean>(false);

  const validateField = useCallback(
    (value: string, field: T) => {
      const fieldValidity = getFieldValidity(
        fieldsConfig[field as T].validations || [],
        value,
        fieldsConfig[field as T].isRequired || false
      );
      setTextFields(prev => ({
        ...prev,
        [field]: {
          ...prev[field],
          value: value,
          message: fieldValidity.message,
          messageType: fieldValidity.messageType,
          isError: !fieldValidity.isValid,
        },
      }));
    },
    [fieldsConfig]
  );

  const onFieldValueChange = useCallback(
    (
      event:
        | ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
        | SyntheticEvent<Element, Event>,
      field: T,
      optionValue?: string | null
    ) => {
      setIsFormInitialized(true);
      if (fieldsConfig[field as T].options) {
        setTextFields(prev => ({
          ...prev,
          [field]: {
            ...prev[field],
            value: optionValue,
          },
        }));
      } else {
        if (
          isFieldValueLimited(
            fieldsConfig[field].limitations || [],
            (event as ChangeEvent<HTMLInputElement | HTMLTextAreaElement>)
              .target.value
          )
        ) {
          setTextFields(prev => ({
            ...prev,
            [field]: {
              ...prev[field],
              value: (
                event as ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
              ).target.value,
            },
          }));
          return;
        }
      }
    },
    [fieldsConfig]
  );

  const onFieldValueBlur = useCallback(
    (field: T) => {
      return (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const fieldValidity = getFieldValidity(
          fieldsConfig[field as T].validations || [],
          event.target.value,
          fieldsConfig[field as T].isRequired || false
        );
        setTextFields(prev => ({
          ...prev,
          [field]: {
            ...prev[field],
            value: event.target.value,
            message: fieldValidity.message,
            messageType: fieldValidity.messageType,
            isError: !fieldValidity.isValid,
          },
        }));
      };
    },
    [fieldsConfig]
  );

  const onValidateAllFields = useCallback(() => {
    let isValid = true;
    (Object.entries(textFields) as [T, ITextField][]).forEach(
      ([field, textField]) => {
        const fieldValidity = getFieldValidity(
          fieldsConfig[field as T].validations || [],
          textField.value,
          fieldsConfig[field as T].isRequired || false
        );
        setTextFields(prev => ({
          ...prev,
          [field]: {
            ...prev[field],
            value: textField.value,
            message: fieldValidity.message,
            messageType: fieldValidity.messageType,
            isError: !fieldValidity.isValid,
          },
        }));
        isValid = fieldValidity.isValid && isValid;
      }
    );
    return isValid;
  }, [fieldsConfig, textFields]);

  useEffect(() => {
    let isValid = true;
    (Object.values(textFields) as ITextField[]).forEach(textField => {
      isValid = !textField.isError && isValid;
    });
    setIsFormValid(isValid);
  }, [textFields]);

  return {
    textFields,
    isFormValid,
    isFormInitialized,
    onFieldValueChange,
    onFieldValueBlur,
    onValidateAllFields,
  };
};

export default useTextFieldsWithValidation;
