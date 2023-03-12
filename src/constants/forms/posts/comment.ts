import { ITextFieldConfig } from "../../../interfaces/app";
import { LABELS } from "../../labels";

type ICommentTextField = "comment";

const COMMENT_TEXT_FIELD_CONFIG: Record<ICommentTextField, ITextFieldConfig> = {
  comment: {
    label: LABELS.CERTIFICATION_NAME,
    id: "comment",
    limitations: [{ maxCharacters: 500 }],
    isRequired: true,
  },
};

export type { ICommentTextField };

export { COMMENT_TEXT_FIELD_CONFIG };
