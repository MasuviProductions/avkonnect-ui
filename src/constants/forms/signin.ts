import { ITextFieldConfig } from "../../interfaces/app";
import { LABELS } from "../labels";

type ISignInTextFields = "emailId" | "password";

const SIGN_IN_FIELDS_CONFIG: Record<ISignInTextFields, ITextFieldConfig> = {
  emailId: {
    label: LABELS.EMAIL_ID,
    id: "emailId",
    limitations: [{ maxCharacters: 75 }],
  },
  password: {
    label: LABELS.PASSWORD,
    id: "password",
    limitations: [{ maxCharacters: 20 }],
  },
};

export type { ISignInTextFields };
export { SIGN_IN_FIELDS_CONFIG };
