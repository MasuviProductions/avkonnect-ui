import {
  ClickAwayListener,
  Popper,
  PopperPlacementType,
  Theme,
} from "@mui/material";
import { SystemStyleObject } from "@mui/system";
import React from "react";

type ICustomPopperAnchorElementTypes = HTMLElement | HTMLButtonElement | null;

export interface ICustomPopperProps {
  id: string;
  onClosePopper: () => void;
  anchorElement: ICustomPopperAnchorElementTypes;
  placement?: PopperPlacementType;
}

const CustomPopper: React.FC<ICustomPopperProps> = ({
  id,
  onClosePopper,
  anchorElement,
  children,
  placement = "auto",
}) => {
  const showPopper = !!anchorElement;
  return (
    <>
      {showPopper && (
        <ClickAwayListener onClickAway={onClosePopper}>
          <Popper
            sx={popperSx}
            id={id}
            open={showPopper}
            anchorEl={anchorElement}
            placement={placement}
          >
            {children}
          </Popper>
        </ClickAwayListener>
      )}
    </>
  );
};

const popperSx = (theme: Theme): SystemStyleObject<Theme> => ({
  zIndex: 1300,
});

export default CustomPopper;
