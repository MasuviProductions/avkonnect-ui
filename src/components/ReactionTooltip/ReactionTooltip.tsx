import { Fragment } from "react";
import {
  Box,
  Tooltip,
  TooltipProps,
  tooltipClasses,
  styled,
  Fade,
} from "@mui/material";
import ReactionsPopper from "./ReactionsPopper";

const StyledTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip
    classes={{ popper: className }}
    enterDelay={500}
    leaveDelay={1000}
    TransitionComponent={Fade}
    TransitionProps={{ timeout: 200 }}
    {...props}
  />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: `0px 0px 10px ${theme.palette.text.secondary}77`,
  },
}));

interface IReactionTooltipProps {}

const ReactionTooltip: React.FC<IReactionTooltipProps> = ({ children }) => {
  return (
    <StyledTooltip
      placement="top"
      title={
        <Fragment>
          <ReactionsPopper />
        </Fragment>
      }
    >
      <Box>{children}</Box>
    </StyledTooltip>
  );
};

export default ReactionTooltip;
