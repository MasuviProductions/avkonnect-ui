import dayjs from "dayjs";
import {
  IDateFieldConfig,
  ITextFieldConfig,
  IDateRangeType,
} from "../../interfaces/app";
import { LABELS } from "../labels";

type IUserInfoTextFields = "name" | "headline" | "gender" | "location";

const GENDER_FIELDS = ["Male", "Female", "Others"];

const USER_INFO_TEXT_FIELDS_CONFIG: Record<
  IUserInfoTextFields,
  ITextFieldConfig
> = {
  name: {
    label: LABELS.USER_INFO_NAME,
    id: "name",
    limitations: [{ regex: /^.{0,25}$/ }],
  },
  gender: {
    label: LABELS.USER_INFO_GENDER,
    id: "gender",
    limitations: [{ regex: /^.{0,25}$/ }],
    options: GENDER_FIELDS,
  },
  location: {
    label: LABELS.USER_INFO_LOCATION,
    id: "location",
    limitations: [{ regex: /^.{0,100}$/ }],
  },
  headline: {
    label: LABELS.USER_INFO_HEADLINE,
    id: "headline",
    limitations: [{ regex: /^.{0,25}$/ }],
  },
};

type IUserInfoDateFields = "dateOfBirth";

const USER_INFO_DATE_FIELDS_CONFIG: Record<
  IUserInfoDateFields,
  IDateFieldConfig
> = {
  dateOfBirth: {
    id: "dob",
    value: null,
    views: ["day", "month", "year"],
    label: LABELS.USER_INFO_DOB,
    minDate: dayjs(new Date(0)),
    maxDate: dayjs(new Date(Date.now())),
  },
};

export type { IUserInfoTextFields, IUserInfoDateFields };
export { USER_INFO_TEXT_FIELDS_CONFIG, USER_INFO_DATE_FIELDS_CONFIG };