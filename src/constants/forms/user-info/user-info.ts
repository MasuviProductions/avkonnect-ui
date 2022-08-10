import dayjs from "dayjs";
import { IDateFieldConfig, ITextFieldConfig } from "../../../interfaces/app";
import { LABELS } from "../../labels";
import { MIN_CALENDAR_DATE } from "../generic";
import { CITIES } from "./indian-cities";

type IUserInfoTextFields = "name" | "headline" | "gender" | "location";

type IGender = "Male" | "Female" | "Others";

const GENDER_FIELDS: IGender[] = ["Male", "Female", "Others"];

const CITY_FIELDS = CITIES;

const USER_INFO_TEXT_FIELDS_CONFIG: Record<
  IUserInfoTextFields,
  ITextFieldConfig
> = {
  name: {
    label: LABELS.USER_INFO_NAME,
    id: "name",
    limitations: [{ maxCharacters: 100 }],
    isRequired: true,
  },
  gender: {
    label: LABELS.USER_INFO_GENDER,
    id: "gender",
    limitations: [{ maxCharacters: 25 }],
    options: GENDER_FIELDS,
    isRequired: true,
  },
  location: {
    label: LABELS.USER_INFO_LOCATION,
    id: "location",
    limitations: [{ maxCharacters: 200 }],
    options: CITY_FIELDS,
  },
  headline: {
    label: LABELS.USER_INFO_HEADLINE,
    id: "headline",
    limitations: [{ maxCharacters: 400 }],
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
    minDate: dayjs(MIN_CALENDAR_DATE),
    maxDate: dayjs(new Date(Date.now())),
  },
};

export type { IUserInfoTextFields, IUserInfoDateFields, IGender };
export { USER_INFO_TEXT_FIELDS_CONFIG, USER_INFO_DATE_FIELDS_CONFIG };
