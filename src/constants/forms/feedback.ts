import { ITextFieldConfig } from "../../interfaces/app";
import { LABELS } from "../labels";

type IFeedbackTextFields = "feedbackType" | "subject" | "description";

export const FEEDBACK_TYPE_FIELDS = [
  "Bug Report",
  "Feature Request",
  "Technical Feedback",
];

const FEEDBACK_TEXT_FIELDS_CONFIG: Record<
  IFeedbackTextFields,
  ITextFieldConfig
> = {
  feedbackType: {
    label: LABELS.FEEDBACK_TYPE,
    id: "feedbackType",
    limitations: [{ maxCharacters: 30 }],
    options: FEEDBACK_TYPE_FIELDS,
    isRequired: true,
  },
  description: {
    label: LABELS.FEEDBACK_DESCRIPTION,
    id: "description",
    limitations: [{ maxCharacters: 1000 }],
    isRequired: true,
  },
  subject: {
    label: LABELS.FEEDBACK_SUBJECT,
    id: "subject",
    limitations: [{ maxCharacters: 15 }],
    isRequired: true,
  },
};

export type { IFeedbackTextFields };
export { FEEDBACK_TEXT_FIELDS_CONFIG };
