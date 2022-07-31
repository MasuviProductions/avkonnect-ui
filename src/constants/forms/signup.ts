import { ITextFieldConfig } from "../../interfaces/app";
import { LABELS } from "../labels";

type ISignUpTextFields = "emailId" | "fname" | "lname" | "password";

const SIGN_UP_FIELDS_CONFIG: Record<ISignUpTextFields, ITextFieldConfig> = {
  emailId: {
    label: LABELS.EMAIL_ID,
    id: "emailId",
    limitations: [{ regex: /.*/, maxCharacters: 75 }],
  },
  fname: {
    label: LABELS.FNAME,
    id: "fname",
    limitations: [{ regex: /.*/, maxCharacters: 50 }],
  },
  lname: {
    label: LABELS.LNAME,
    id: "lname",
    limitations: [{ regex: /.*/, maxCharacters: 50 }],
  },
  password: {
    label: LABELS.PASSWORD,
    id: "password",
    limitations: [{ regex: /.*/, maxCharacters: 20 }],
  },
};

export type { ISignUpTextFields };
export { SIGN_UP_FIELDS_CONFIG };
