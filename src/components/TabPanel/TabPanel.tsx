import { Box } from "@mui/material";
import React from "react";

export interface ITabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const TabPanel: React.FC<ITabPanelProps> = ({ children, index, value }) => {
  return (
    <Box hidden={value !== index} id={`tabpanel-${index}`}>
      {value === index && <Box>{children}</Box>}
    </Box>
  );
};

export default TabPanel;
