import { ITextFieldConfig } from "../../interfaces/app";
import { LABELS } from "../labels";

type ISkillEndorseTextFields = "relationship";

export const SKILL_ENDORSE_RELATION_TYPE_FIELDS = [
  "Worked together",
  "Supervised",
  "Worked under",
  "Heard from someone",
];

const SKILL_ENDORSE_TEXT_FIELDS_CONFIG: Record<
  ISkillEndorseTextFields,
  ITextFieldConfig
> = {
  relationship: {
    label: LABELS.ENDORSEMENT_RELATIONSHIP,
    id: "feedbackType",
    limitations: [{ regex: /.*/, maxCharacters: 30 }],
    options: SKILL_ENDORSE_RELATION_TYPE_FIELDS,
  },
};

const SKILL_ENDORSE_RATING_LABEL: { [index: number]: string } = {
  0: "Basic!",
  1: "Average!",
  2: "Decent!",
  3: "Good!",
  4: "Excellent!",
  5: "Outstanding!",
};

export type { ISkillEndorseTextFields };
export { SKILL_ENDORSE_TEXT_FIELDS_CONFIG, SKILL_ENDORSE_RATING_LABEL };
