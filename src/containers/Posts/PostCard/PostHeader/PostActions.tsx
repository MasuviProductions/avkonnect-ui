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
  IOwnPostActionType,
  OWN_POST_ACTIONS_MENU,
} from "../../../../constants/menu";
import { useAuthContext } from "../../../../contexts/AuthContext";
import { useSnackbarContext } from "../../../../contexts/SnackbarContext";
import { copyTextToClipboard, getLinkToPost } from "../../../../utils/generic";

const PostActions: React.FC = () => {
  const resourceContext = useResourceContext();
  const { authUser } = useAuthContext();
  
  if (!resourceContext) {
    throw Error(LABELS.RESOURCE_CONTEXT_UNINITIALIZED);
  }

  const { id, deleteResource, updateIsBeingEdited, sourceId } = resourceContext;

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const { setSnackbar } = useSnackbarContext();

  const handleCopyLink = () => {
    const URL = getLinkToPost(id);

    copyTextToClipboard(URL)
      .then(() => {
        setSnackbar?.(() => ({
          message: LABELS.LINK_COPY_SUCCESSFULL,
          messageType: "success",
        }));
      })
      .catch((err) => {
        setSnackbar?.(() => ({
          message: LABELS.LINK_COPY_FAILED,
          messageType: "error",
        }));
        console.log(err);
      });
  }

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
    const menuItemId = id as IOwnPostActionType;
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
      
      case "copyLink": {
        handleCopyLink();
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
          menuItems={authUser?.id === sourceId ? OWN_POST_ACTIONS_MENU : POST_ACTIONS_MENU}
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
