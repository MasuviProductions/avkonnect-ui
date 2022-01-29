import { ChangeEvent, SyntheticEvent, useCallback, useState } from "react";
import { ITextField, ITextFieldConfig } from "../interfaces/app";
import {
  getFieldValidity,
  isFieldValueLimited,
  transformTextFieldConfigToFields,
} from "../utils/form";

interface ITextFieldsWithValidation<T extends string> {
  textFields: Record<T, ITextField>;
  onFieldValueChange: (
    event:
      | ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      | SyntheticEvent<Element, Event>,
    field: T,
    optionValue?: string | null
  ) => void;
  onFieldValueBlur: (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    field: T
  ) => void;
}

const useTextFieldsWithValidation = <T extends string>(
  fieldsConfig: Record<T, ITextFieldConfig>
): ITextFieldsWithValidation<T> => {
  const [textFields, setTextFields] = useState<Record<T, ITextField>>(
    transformTextFieldConfigToFields<T>(fieldsConfig)
  );

  const onFieldValueChange = useCallback(
    (
      event:
        | ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
        | SyntheticEvent<Element, Event>,
      field: T,
      optionValue?: string | null
    ) => {
      if (fieldsConfig[field as T].options) {
        setTextFields((prev) => ({
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
          setTextFields((prev) => ({
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
    (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, field: T) => {
      const fieldValidity = getFieldValidity(
        fieldsConfig[field as T].validations || [],
        event.target.value
      );
      setTextFields((prev) => ({
        ...prev,
        [field]: {
          ...prev[field],
          value: event.target.value,
          message: fieldValidity.message,
          messageType: fieldValidity.messageType,
        },
      }));
    },
    [fieldsConfig]
  );

  return { textFields, onFieldValueChange, onFieldValueBlur };
};

export default useTextFieldsWithValidation;
