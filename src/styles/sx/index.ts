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
    lineHeight: "0px",
    textDecoration: "none",
    ":hover": {
      textDecoration: "underline",
    },
  });

export const coloredLinkSx =
  (fontSize?: number) =>
  (theme: Theme): SystemStyleObject<Theme> => ({
    ...simpleLinkSx(fontSize)(theme),
    color: theme.palette.text.link,
  });

export const fadedLinkSx =
  (fontSize?: number) =>
  (theme: Theme): SystemStyleObject<Theme> => ({
    ...simpleLinkSx(fontSize)(theme),
    color: theme.palette.text.secondary,
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
    "&:hover": {
      cursor: "pointer",
    },
  });
};

export const userAvatarHeadlineSx = (
  theme: Theme
): SystemStyleObject<Theme> => ({
  cursor: "pointer",
  fontSize: 12,
  color: theme.palette.text.secondary,
});

export const reactionTextSx =
  (reaction?: IReactionTypes, fontSize?: number) =>
  (theme: Theme): SystemStyleObject<Theme> => ({
    ...simpleLinkSx(fontSize || 10)(theme),
    padding: 0,
    color: reaction
      ? theme.palette.reactions[reaction]
      : theme.palette.text.primary,
  });
