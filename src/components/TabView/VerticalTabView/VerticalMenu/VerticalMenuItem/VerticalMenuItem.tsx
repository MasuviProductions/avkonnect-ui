import { Grid, Typography, Theme, useTheme } from "@mui/material";
import { SystemStyleObject } from "@mui/system";
import React from "react";
import { ITabMenuItemProps } from "../../../../../interfaces/app";

const VerticalMenuItem: React.FC<ITabMenuItemProps> = ({
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
      >
        <Grid item xs={2}>
          {panelItem.icon}
        </Grid>
        <Grid item xs={10}>
          <Typography variant="body1">{panelItem.title}</Typography>
        </Grid>
      </Grid>
    </>
  );
};

const panelItemHighlight = (theme: Theme): SystemStyleObject<Theme> => ({
  backgroundColor: theme.palette.background.highlighted,
  color: theme.palette.text.secondary,
});

const panelItemContainer = (theme: Theme): SystemStyleObject<Theme> => ({
  cursor: "pointer",
  padding: "10px 16px",
  color: theme.palette.text.primary,
  width: "auto",
  marginX: -2,

  "&:hover": panelItemHighlight(theme) as SystemStyleObject<Theme>,
});

export default VerticalMenuItem;
