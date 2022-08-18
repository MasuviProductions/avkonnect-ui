import { Theme } from "@mui/material";
import { SystemStyleObject } from "@mui/system";
import { IReactionTypes } from "../../interfaces/api/external";

export const simpleLinkSx =
  (fontSize?: number) =>
  (theme: Theme): SystemStyleObject<Theme> => ({
    cursor: "pointer",
    fontWeight: 500,
    fontSize: fontSize || 14,
    color: theme.palette.text.primary,
    display: "inline",
    textDecoration: "none",
    ":hover": {
      textDecoration: "underline",
    },
  });

export const decoratedLinkSx =
  (fontSize?: number) =>
  (theme: Theme): SystemStyleObject<Theme> => ({
    ...simpleLinkSx(fontSize)(theme),
    color: theme.palette.text.link,
  });

export const userAvatarSx: (
  color: string,
  size?: number
) => (theme: Theme) => SystemStyleObject<Theme> = (color, size) => {
  return (theme) => ({
    width: size || 40,
    height: size || 40,
    fontSize: "1rem",
    border: `1px solid ${theme.palette.background.default}`,
    backgroundColor: color,
    color: theme.palette.getContrastText(color),
  });
};

export const reactionButtonSx: (
  reaction?: IReactionTypes
) => (theme: Theme) => SystemStyleObject<Theme> = (reaction) => {
  return (theme) => ({
    fontSize: 10,
    minWidth: 40,
    textTransform: "initial",
    padding: 0,
    color: reaction
      ? theme.palette.reactions[reaction]
      : theme.palette.text.primary,
  });
};
