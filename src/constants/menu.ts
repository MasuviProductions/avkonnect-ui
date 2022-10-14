import { DeleteForever, Edit, Link } from "@mui/icons-material";
import { ICustomMenuItem } from "../components/CusomMenu/CustomMenuItem";

export const COMMENT_ACTIONS = ["delete", "edit"] as const;
export type ICommentActionType = typeof COMMENT_ACTIONS[number];
export const COMMENT_ACTIONS_MENU: ICustomMenuItem<ICommentActionType>[] = [
  {
    label: "Edit",
    icon: Edit,
    id: "edit",
  },
  {
    label: "Delete",
    icon: DeleteForever,
    id: "delete",
  },
];

export const POST_ACTIONS = ["copyLink"] as const;
export type IPostActionType = typeof POST_ACTIONS[number];
export const POST_ACTIONS_MENU: ICustomMenuItem<IPostActionType>[] = [
  {
    label: "Copy link to post",
    icon: Link,
    id: "copyLink",
  },
];

export const OWN_POST_ACTIONS = [...POST_ACTIONS, "delete", "edit"] as const;
export type IOwnPostActionType = typeof OWN_POST_ACTIONS[number];
export const OWN_POST_ACTIONS_MENU: ICustomMenuItem<IOwnPostActionType>[] = [
  ...POST_ACTIONS_MENU,
  {
    label: "Edit",
    icon: Edit,
    id: "edit",
  },
  {
    label: "Delete",
    icon: DeleteForever,
    id: "delete",
  },
];
