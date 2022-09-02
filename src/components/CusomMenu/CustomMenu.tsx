import { Box, List, Theme } from "@mui/material";
import { SystemStyleObject } from "@mui/system";

import LayoutCard from "../LayoutCard";
import CustomMenuItem, { ICustomMenuItem } from "./CustomMenuItem";

interface ICustomMenuProps {
  menuItems: ICustomMenuItem[];
  onClickMenuItem: (id: string) => void;
}

const CustomMenu: React.FC<ICustomMenuProps> = ({
  menuItems,
  onClickMenuItem,
}) => {
  const handleMenuItemClick = (id: string) => {
    onClickMenuItem(id);
  };

  return (
    <>
      <LayoutCard withBorder withBoxShadow>
        <Box sx={menuContainerSx}>
          <List disablePadding>
            {menuItems.map((item) => (
              <CustomMenuItem
                key={item.id}
                id={item.id}
                icon={item.icon}
                label={item.label}
                onClick={handleMenuItemClick}
              />
            ))}
          </List>
        </Box>
      </LayoutCard>
    </>
  );
};

const menuContainerSx = (theme: Theme): SystemStyleObject<Theme> => ({
  minWidth: "150px",
});

export default CustomMenu;
