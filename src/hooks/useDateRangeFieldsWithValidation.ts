import dayjs, { Dayjs } from "dayjs";
import cloneDeep from "lodash.clonedeep";
import { useCallback, useState } from "react";
import {
  IDateRange,
  IDateRangeFieldConfig,
  IDateRangeType,
} from "../interfaces/app";

const useDateRangeFieldsWithValidation = (
  dateConfig: Record<IDateRangeType, IDateRangeFieldConfig>
) => {
  const [dateValues, setDateValues] = useState<IDateRange>({
    from: {
      id: dateConfig.from.id,
      value: dateConfig.from.value,
      views: dateConfig.from.views,
      label: dateConfig.from.label,
      minDate: dayjs(new Date(0)),
      maxDate: dayjs(new Date(Date.now())),
    },
    to: {
      id: dateConfig.to.id,
      value: dateConfig.to.value,
      views: dateConfig.to.views,
      label: dateConfig.to.label,
      minDate: dayjs(new Date(0)),
      maxDate: dayjs(new Date(Date.now())),
    },
  });

  const onDateValueChange = useCallback(
    (date: Dayjs | null, dateType: IDateRangeType) => {
      setDateValues((prev) => {
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

  return { dateValues, onDateValueChange };
};

export default useDateRangeFieldsWithValidation;
