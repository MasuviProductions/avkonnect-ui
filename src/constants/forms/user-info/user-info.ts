import dayjs from "dayjs";
import { IDateFieldConfig, ITextFieldConfig } from "../../../interfaces/app";
import { LABELS } from "../../labels";
import { CITIES } from "./indian-cities";

type IUserInfoTextFields = "name" | "headline" | "gender" | "location";

export type IGender = "Male" | "Female" | "Others";

const GENDER_FIELDS: IGender[] = ["Male", "Female", "Others"];

const CITY_FIELDS = CITIES;

const USER_INFO_TEXT_FIELDS_CONFIG: Record<
  IUserInfoTextFields,
  ITextFieldConfig
> = {
  name: {
    label: LABELS.USER_INFO_NAME,
    id: "name",
    limitations: [{ regex: /^.{0,50}$/ }],
    isRequired: true,
  },
  gender: {
    label: LABELS.USER_INFO_GENDER,
    id: "gender",
    limitations: [{ regex: /^.{0,25}$/ }],
    options: GENDER_FIELDS,
    isRequired: true,
  },
  location: {
    label: LABELS.USER_INFO_LOCATION,
    id: "location",
    limitations: [{ regex: /^.{0,100}$/ }],
    options: CITY_FIELDS,
  },
  headline: {
    label: LABELS.USER_INFO_HEADLINE,
    id: "headline",
    limitations: [{ regex: /^.{0,50}$/ }],
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
    minDate: dayjs("01-01-1910"),
    maxDate: dayjs(new Date(Date.now())),
  },
};

export type { IUserInfoTextFields, IUserInfoDateFields };
export { USER_INFO_TEXT_FIELDS_CONFIG, USER_INFO_DATE_FIELDS_CONFIG };
