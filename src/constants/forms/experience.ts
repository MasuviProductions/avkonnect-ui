import dayjs from "dayjs";
import {
  IDateFieldConfig,
  ITextFieldConfig,
  IDateRangeType,
} from "../../interfaces/app";
import { LABELS } from "../labels";
import { MIN_CALENDAR_DATE } from "./generic";

type IExperienceTextFields =
  | "companyName"
  | "description"
  | "employmentType"
  | "industry"
  | "role";

export const INDUSTRY_FIELDS = [
  "Film",
  "Music",
  "News",
  "eSports",
  "Event",
  "Marketing and Influential",
  "Public Relations",
];

export const EMPLOYMENT_TYPE_FIELDS = [
  "Full-time",
  "Part-time",
  "Self-employed",
  "Freelance",
  "Internship",
  "Trainee",
];

const EXPERIENCE_TEXT_FIELDS_CONFIG: Record<
  IExperienceTextFields,
  ITextFieldConfig
> = {
  companyName: {
    label: LABELS.EXPERIENCE_COMPANY_NAME,
    id: "companyName",
    limitations: [{ maxCharacters: 100 }],
    isRequired: true,
  },
  description: {
    label: LABELS.EXPERIENCE_DESCRIPTION,
    id: "description",
    limitations: [{ maxCharacters: 1000 }],
    isRequired: true,
  },
  employmentType: {
    label: LABELS.EXPERIENCE_EMPLOYMENT_TYPE,
    id: "employmentType",
    limitations: [{ maxCharacters: 30 }],
    options: EMPLOYMENT_TYPE_FIELDS,
    isRequired: true,
  },
  industry: {
    label: LABELS.EXPERIENCE_INDUSTRY,
    id: "industry",
    limitations: [{ maxCharacters: 30 }],
    options: INDUSTRY_FIELDS,
    isRequired: true,
  },
  role: {
    label: LABELS.EXPERIENCE_ROLE,
    id: "role",
    limitations: [{ maxCharacters: 50 }],
    isRequired: true,
  },
};

const EXPERIENCE_DATE_RANGE_FIELDS_CONFIG: Record<
  IDateRangeType,
  IDateFieldConfig
> = {
  from: {
    id: "",
    value: null,
    views: ["year", "month"],
    label: LABELS.EXPERIENCE_START_DATE,
    minDate: dayjs(MIN_CALENDAR_DATE),
    maxDate: dayjs(new Date(Date.now())),
  },
  to: {
    id: "",
    value: null,
    views: ["year", "month"],
    label: LABELS.EXPERIENCE_END_DATE,
    minDate: dayjs(MIN_CALENDAR_DATE),
    maxDate: dayjs(new Date(Date.now())),
  },
};

export type { IExperienceTextFields };
export { EXPERIENCE_TEXT_FIELDS_CONFIG, EXPERIENCE_DATE_RANGE_FIELDS_CONFIG };
