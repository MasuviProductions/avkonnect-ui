import { ITextFieldConfig } from "../../interfaces/app";
import { LABELS } from "../labels";

type ISignUpTextFields = "emailId" | "fname" | "lname" | "password";

const SIGN_UP_FIELDS_CONFIG: Record<ISignUpTextFields, ITextFieldConfig> = {
  emailId: {
    label: LABELS.EMAIL_ID,
    id: "emailId",
    limitations: [{ maxCharacters: 75 }],
  },
  fname: {
    label: LABELS.FNAME,
    id: "fname",
    limitations: [{ maxCharacters: 50 }],
  },
  lname: {
    label: LABELS.LNAME,
    id: "lname",
    limitations: [{ maxCharacters: 50 }],
  },
  password: {
    label: LABELS.PASSWORD,
    id: "password",
    limitations: [{ maxCharacters: 20 }],
  },
};

export type { ISignUpTextFields };
export { SIGN_UP_FIELDS_CONFIG };
