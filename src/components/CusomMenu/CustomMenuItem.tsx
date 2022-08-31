import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  SvgIconTypeMap,
  Typography,
  Theme,
} from "@mui/material";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import { SystemStyleObject } from "@mui/system";

export interface ICustomMenuItem<T extends string = string> {
  icon?: OverridableComponent<SvgIconTypeMap<{}, "svg">> & {
    muiName: string;
  };
  label: string;
  id: T;
}

interface ICustomMenuItemProps extends ICustomMenuItem {
  onClick: (id: string) => void;
}

const CustomMenuItem: React.FC<ICustomMenuItemProps> = ({
  icon,
  id,
  label,
  onClick,
}) => {
  const handleMenuItemClick = (id: string) => () => {
    onClick(id);
  };

  const MenuIcon = icon;
  return (
    <ListItem key={id} disablePadding>
      <ListItemButton onClick={handleMenuItemClick(id)}>
        {MenuIcon && (
          <ListItemIcon sx={menuIconSx}>
            <MenuIcon fontSize="small" />
          </ListItemIcon>
        )}
        <ListItemText>
          <Typography sx={menuTextSx}>{label}</Typography>
        </ListItemText>
      </ListItemButton>
    </ListItem>
  );
};

const menuIconSx = (theme: Theme): SystemStyleObject<Theme> => ({
  minWidth: 36,
  color: theme.palette.text.primary,
});

const menuTextSx = (theme: Theme): SystemStyleObject<Theme> => ({
  fontSize: 14,
  color: theme.palette.text.primary,
});

export default CustomMenuItem;
