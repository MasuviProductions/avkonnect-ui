import { Dayjs } from "dayjs";
import { useCallback, useState } from "react";
import { IDateFieldConfig, IDateField } from "../interfaces/app";
import { transformDateFieldConfigToFields } from "../utils/form";

interface IDateFieldsWithValidation<T extends string> {
  dateFields: Record<T, IDateField>;
  onDateValueChange: (date: Dayjs | null, field: T) => void;
}

const useDateFieldsWithValidation = <T extends string>(
  fieldsConfig: Record<T, IDateFieldConfig>
): IDateFieldsWithValidation<T> => {
  const [dateFields, setDateFields] = useState<Record<T, IDateField>>(
    transformDateFieldConfigToFields<T>(fieldsConfig)
  );

  const onDateValueChange = useCallback((date: Dayjs | null, field: T) => {
    setDateFields((prev) => ({
      ...prev,
      [field]: {
        ...prev[field],
        value: date,
      },
    }));
  }, []);

  return { dateFields, onDateValueChange };
};

export default useDateFieldsWithValidation;
