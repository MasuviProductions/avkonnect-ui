import dayjs from "dayjs";
import {
  IDateFieldConfig,
  ITextFieldConfig,
  IDateRangeType,
} from "../../interfaces/app";
import { LABELS } from "../labels";
import { MIN_CALENDAR_DATE } from "./generic";

type IProjectTextFields =
  | "companyName"
  | "description"
  | "employmentType"
  | "industry"
  | "name"
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

const PROJECT_TEXT_FIELDS_CONFIG: Record<IProjectTextFields, ITextFieldConfig> =
  {
    companyName: {
      label: LABELS.PROJECT_COMPANY_NAME,
      id: "companyName",
      limitations: [{ regex: /.*/, maxCharacters: 50 }],
      isRequired: true,
    },
    description: {
      label: LABELS.PROJECT_DESCRIPTION,
      id: "description",
      limitations: [{ regex: /.*/, maxCharacters: 1000 }],
      isRequired: true,
    },
    employmentType: {
      label: LABELS.PROJECT_EMPLOYMENT_TYPE,
      id: "employmentType",
      limitations: [{ regex: /.*/, maxCharacters: 30 }],
      options: EMPLOYMENT_TYPE_FIELDS,
      isRequired: true,
    },
    industry: {
      label: LABELS.PROJECT_INDUSTRY,
      id: "industry",
      limitations: [{ regex: /.*/, maxCharacters: 30 }],
      options: INDUSTRY_FIELDS,
      isRequired: true,
    },
    name: {
      label: LABELS.PROJECT_NAME,
      id: "name",
      limitations: [{ regex: /.*/, maxCharacters: 100 }],
      isRequired: true,
    },
    role: {
      label: LABELS.PROJECT_ROLE,
      id: "role",
      limitations: [{ regex: /.*/, maxCharacters: 50 }],
      isRequired: true,
    },
  };

const PROJECT_DATE_RANGE_FIELDS_CONFIG: Record<
  IDateRangeType,
  IDateFieldConfig
> = {
  from: {
    id: "",
    value: null,
    views: ["year", "month"],
    label: LABELS.PROJECT_START_DATE,
    minDate: dayjs(MIN_CALENDAR_DATE),
    maxDate: dayjs(new Date(Date.now())),
  },
  to: {
    id: "",
    value: null,
    views: ["year", "month"],
    label: LABELS.PROJECT_END_DATE,
    minDate: dayjs(MIN_CALENDAR_DATE),
    maxDate: dayjs(new Date(Date.now())),
  },
};

export type { IProjectTextFields };
export { PROJECT_TEXT_FIELDS_CONFIG, PROJECT_DATE_RANGE_FIELDS_CONFIG };
