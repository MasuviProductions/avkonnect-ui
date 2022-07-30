import dayjs from "dayjs";
import {
  IDateFieldConfig,
  ITextFieldConfig,
  IDateRangeType,
} from "../../interfaces/app";
import { LABELS } from "../labels";

type ICertificationTextFields =
  | "name"
  | "issuerName"
  | "description"
  | "industry"
  | "link";

export const INDUSTRY_FIELDS = [
  "Film",
  "Music",
  "News",
  "eSports",
  "Event",
  "Marketing and Influential",
  "Public Relations",
];

const CERTIFICATION_TEXT_FIELDS_CONFIG: Record<
  ICertificationTextFields,
  ITextFieldConfig
> = {
  name: {
    label: LABELS.CERTIFICATION_NAME,
    id: "name",
    limitations: [{ regex: /^.{0,100}$/ }],
    isRequired: true,
  },
  description: {
    label: LABELS.CERTIFICATION_DESCRIPTION,
    id: "description",
    limitations: [{ regex: /.{0,1000}/ }],
    isRequired: true,
  },
  industry: {
    label: LABELS.CERTIFICATION_INDUSTRY,
    id: "industry",
    limitations: [{ regex: /.{0,25}/ }],
    options: INDUSTRY_FIELDS,
    isRequired: true,
  },
  issuerName: {
    label: LABELS.CERTIFICATION_ISSUER_NAME,
    id: "issuer",
    limitations: [{ regex: /.{0,50}/ }],
    isRequired: true,
  },
  link: {
    label: LABELS.CERTIFICATION_LINK,
    id: "link",
    limitations: [{ regex: /.{0,100}/ }],
    isRequired: false,
  },
};

const CERTIFICATION_DATE_RANGE_FIELDS_CONFIG: Record<
  IDateRangeType,
  IDateFieldConfig
> = {
  from: {
    id: "",
    value: null,
    views: ["year", "month"],
    label: LABELS.CERTIFICATION_ISSUE_DATE,
    minDate: dayjs("01-01-1910"),
    maxDate: dayjs(new Date(Date.now())),
  },
  to: {
    id: "",
    value: null,
    views: ["year", "month"],
    label: LABELS.CERTIFICATION_EXPIRY_DATE,
    minDate: dayjs("01-01-1910"),
    maxDate: dayjs(new Date(Date.now())),
  },
};

export type { ICertificationTextFields };
export {
  CERTIFICATION_TEXT_FIELDS_CONFIG,
  CERTIFICATION_DATE_RANGE_FIELDS_CONFIG,
};
