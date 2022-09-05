import { useState, MouseEvent } from "react";
import { IconButton, Box, Theme } from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { SystemStyleObject } from "@mui/system";

import CustomPopper from "../../../../components/CustomPopper/CustomPopper";
import { useResourceContext } from "../../../../contexts/ResourceContext";
import { LABELS } from "../../../../constants/labels";
import CustomMenu from "../../../../components/CusomMenu/CustomMenu";
import {
  POST_ACTIONS_MENU,
  ICommentActionType,
} from "../../../../constants/menu";

interface IPostActionsProps {}

const PostActions: React.FC<IPostActionsProps> = ({}) => {
  const resourceContext = useResourceContext();
  if (!resourceContext) {
    throw Error(LABELS.RESOURCE_CONTEXT_UNINITIALIZED);
  }

  const { id, deleteResource, updateIsBeingEdited } = resourceContext;

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handlePostActionsOpen = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePostActionsClose = () => {
    setAnchorEl(null);
  };

  const handlePostDelete = () => {
    deleteResource();
  };

  const handleMenuItemClick = (id: string) => {
    const menuItemId = id as ICommentActionType;
    switch (menuItemId) {
      case "delete": {
        handlePostDelete();
        handlePostActionsClose();
        return;
      }

      case "edit": {
        updateIsBeingEdited(true);
        handlePostActionsClose();
        return;
      }
    }
  };

  return (
    <>
      <Box>
        <IconButton sx={postActionsIconSx} onClick={handlePostActionsOpen}>
          <MoreHorizIcon />
        </IconButton>
      </Box>

      <CustomPopper
        id={id}
        anchorElement={anchorEl}
        onClosePopper={handlePostActionsClose}
        placement="bottom-end"
      >
        <CustomMenu
          menuItems={POST_ACTIONS_MENU}
          onClickMenuItem={handleMenuItemClick}
        />
      </CustomPopper>
    </>
  );
};

const postActionsIconSx = (theme: Theme): SystemStyleObject<Theme> => ({
  color: theme.palette.text.primary,
  padding: 0,
});

export default PostActions;
