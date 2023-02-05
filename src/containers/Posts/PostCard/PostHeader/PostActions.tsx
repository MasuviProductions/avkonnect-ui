import { Link, Share } from "@mui/icons-material";
import { useState, MouseEvent, useMemo, useEffect } from "react";
import { IconButton, Box, Theme } from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { SystemStyleObject } from "@mui/system";
import _ from "lodash";

import CustomPopper from "../../../../components/CustomPopper/CustomPopper";
import { useResourceContext } from "../../../../contexts/ResourceContext";
import { LABELS } from "../../../../constants/labels";
import CustomMenu from "../../../../components/CusomMenu/CustomMenu";
import {
  POST_ACTIONS_MENU,
  IUserPostActionType,
  USER_POST_ACTIONS_MENU,
} from "../../../../constants/menu";
import { useAuthContext } from "../../../../contexts/AuthContext";
import { useSnackbarContext } from "../../../../contexts/SnackbarContext";
import { copyTextToClipboard, getLinkToPost } from "../../../../utils/generic";

interface INavigatorShareObj {
  title: string;
  url: string;
}

const PostActions: React.FC = () => {
  const resourceContext = useResourceContext();
  const { authUser } = useAuthContext();

  if (!resourceContext) {
    throw Error(LABELS.RESOURCE_CONTEXT_UNINITIALIZED);
  }

  const { id, deleteResource, updateIsBeingEdited, sourceId } = resourceContext;

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const { setSnackbar } = useSnackbarContext();

  const shareUrl = getLinkToPost(id);

  const navigatorShareObj: INavigatorShareObj = useMemo(
    () => ({
      title: LABELS.SHARE_POST,
      url: shareUrl,
    }),
    [shareUrl]
  );

  const isShareAPIAvailable = !!(navigator as any).canShare(navigatorShareObj);

  const postActionsMenu = useMemo(() => {
    const actionsMenu = _.cloneDeep(
      authUser?.id === sourceId ? USER_POST_ACTIONS_MENU : POST_ACTIONS_MENU
    );
    actionsMenu.forEach((menuItem) => {
      if (menuItem.id === "copyLink") {
        menuItem.label = isShareAPIAvailable
          ? LABELS.SHARE_VIA
          : LABELS.COPY_LINK_TO_POST;
        menuItem.icon = isShareAPIAvailable ? Share : Link;
      }
    });

    return actionsMenu;
  }, [authUser?.id, sourceId, isShareAPIAvailable]);

  const handleShareClick = () => {
    navigator.share(navigatorShareObj);
  };

  const handleCopyClick = () => {
    copyTextToClipboard(shareUrl)
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
  };

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
    const menuItemId = id as IUserPostActionType;
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
        isShareAPIAvailable ? handleShareClick() : handleCopyClick();
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
          menuItems={postActionsMenu}
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
