import dayjs, { Dayjs } from "dayjs";
import cloneDeep from "lodash.clonedeep";
import { useCallback, useEffect, useState } from "react";
import {
  IDateRange,
  IDateFieldConfig,
  IDateRangeType,
} from "../interfaces/app";
import { getDateRangeValidity } from "../utils/form";

const useDateRangeFieldsWithValidation = (
  dateConfig: Record<IDateRangeType, IDateFieldConfig>
) => {
  const [dateValues, setDateValues] = useState<IDateRange>({
    from: {
      id: dateConfig.from.id,
      value: dateConfig.from.value,
      views: dateConfig.from.views,
      label: dateConfig.from.label,
      minDate: dayjs(new Date("01-01-1910")),
      maxDate: dayjs(new Date(Date.now())),
    },
    to: {
      id: dateConfig.to.id,
      value: dateConfig.to.value,
      views: dateConfig.to.views,
      label: dateConfig.to.label,
      minDate: dayjs(new Date("01-01-1910")),
      maxDate: dayjs(new Date(Date.now())),
    },
  });
  const [isDateRangeValid, setIsDateRangeValid] = useState<boolean>(false);

  const onDateValueChange = useCallback(
    (date: Dayjs | null, dateType: IDateRangeType) => {
      setDateValues(prev => {
        const newDateValues = cloneDeep(prev);

        newDateValues[dateType].value = date;
        if (dateType === "to") {
          newDateValues.from.maxDate = date;
        }
        if (dateType === "from") {
          newDateValues.to.minDate = date;
        }
        return newDateValues;
      });
    },
    []
  );

  useEffect(() => {
    setIsDateRangeValid(
      getDateRangeValidity(dateValues.from.value, dateValues.to.value)
    );
  }, [dateValues.from.value, dateValues.to.value]);

  return { dateValues, isDateRangeValid, onDateValueChange };
};

export default useDateRangeFieldsWithValidation;
