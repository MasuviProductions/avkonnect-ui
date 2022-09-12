import { useState, MouseEvent } from "react";
import { IconButton, Box, Theme } from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { SystemStyleObject } from "@mui/system";

import CustomPopper from "../../../../components/CustomPopper/CustomPopper";
import { useResourceContext } from "../../../../contexts/ResourceContext";
import { LABELS } from "../../../../constants/labels";
import CustomMenu from "../../../../components/CusomMenu/CustomMenu";
import {
  COMMENT_ACTIONS_MENU,
  ICommentActionType,
} from "../../../../constants/menu";

interface ICommentActionsProps {}

const CommentActions: React.FC<ICommentActionsProps> = ({}) => {
  const resourceContext = useResourceContext();
  if (!resourceContext) {
    throw Error(LABELS.RESOURCE_CONTEXT_UNINITIALIZED);
  }

  const { id, deleteResource, updateIsBeingEdited } = resourceContext;

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleCommentActionsOpen = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCommentActionsClose = () => {
    setAnchorEl(null);
  };

  const handleCommentDelete = () => {
    deleteResource();
  };

  const handleMenuItemClick = (id: string) => {
    const menuItemId = id as ICommentActionType;
    switch (menuItemId) {
      case "delete": {
        handleCommentDelete();
        handleCommentActionsClose();
        return;
      }

      case "edit": {
        updateIsBeingEdited(true);
        handleCommentActionsClose();
        return;
      }
    }
  };

  return (
    <>
      <Box>
        <IconButton
          sx={commentsActionIconSx}
          onClick={handleCommentActionsOpen}
        >
          <MoreHorizIcon />
        </IconButton>
      </Box>

      <CustomPopper
        id={id}
        anchorElement={anchorEl}
        onClosePopper={handleCommentActionsClose}
        placement="bottom-end"
      >
        <CustomMenu
          menuItems={COMMENT_ACTIONS_MENU}
          onClickMenuItem={handleMenuItemClick}
        />
      </CustomPopper>
    </>
  );
};

const commentsActionIconSx = (theme: Theme): SystemStyleObject<Theme> => ({
  color: theme.palette.text.primary,
  padding: 0,
});

export default CommentActions;
