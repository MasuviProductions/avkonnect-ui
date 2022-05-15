import { Grid, Typography, Theme, useTheme } from "@mui/material";
import { SystemStyleObject } from "@mui/system";
import React from "react";
import { ITabMenuItemProps } from "../../../../../interfaces/app";

const HorizontalMenuItem: React.FC<ITabMenuItemProps> = ({
  panelItem,
  isActive,
  onItemSelect,
}) => {
  const theme = useTheme();

  const handleItemSelect = () => {
    onItemSelect(panelItem.id);
  };

  return (
    <>
      <Grid
        container
        sx={
          isActive
            ? ({
                ...panelItemContainer(theme),
                ...panelItemHighlight(theme),
              } as SystemStyleObject<Theme>)
            : panelItemContainer(theme)
        }
        onClick={handleItemSelect}
        justifyContent="center"
        spacing={1}
      >
        <Grid item>{panelItem.icon}</Grid>
        <Grid item>
          <Typography textAlign="center" variant="body2">
            {panelItem.title}
          </Typography>
        </Grid>
      </Grid>
    </>
  );
};

const panelItemHighlight = (theme: Theme): SystemStyleObject<Theme> => ({
  backgroundColor: theme.palette.grey[800],
  color: theme.palette.text.secondary,
});

const panelItemContainer = (theme: Theme): SystemStyleObject<Theme> => ({
  cursor: "pointer",
  padding: 1,
  color: theme.palette.text.primary,
  width: "auto",

  "&:hover": panelItemHighlight(theme) as SystemStyleObject<Theme>,
});

export default HorizontalMenuItem;
