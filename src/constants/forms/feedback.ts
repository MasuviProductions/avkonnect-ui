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
    limitations: [{ regex: /.{0,25}/ }],
    options: FEEDBACK_TYPE_FIELDS,
  },
  description: {
    label: LABELS.FEEDBACK_DESCRIPTION,
    id: "description",
    limitations: [{ regex: /.{0,1000}/ }],
  },
  subject: {
    label: LABELS.FEEDBACK_SUBJECT,
    id: "subject",
    limitations: [{ regex: /.{0,15}/ }],
  },
};

export type { IFeedbackTextFields };
export { FEEDBACK_TEXT_FIELDS_CONFIG };
