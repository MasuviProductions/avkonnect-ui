import { DeleteForever } from "@mui/icons-material";
import { ICustomMenuItem } from "../components/CusomMenu/CustomMenuItem";

export const COMMENT_ACTIONS = ["delete", "edit"] as const;
export type ICommentActionType = typeof COMMENT_ACTIONS[number];
export const COMMENT_ACTIONS_MENU: ICustomMenuItem<ICommentActionType>[] = [
  {
    label: "Delete",
    icon: DeleteForever,
    id: "delete",
  },
];
