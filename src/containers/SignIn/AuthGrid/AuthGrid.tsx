import { Box, Button, Theme, Typography } from "@mui/material";
import { SxProps } from "@mui/system";
import Image from "next/image";
import { LABELS } from "../../../constants/labels";
import { ReactFCWithSkeleton } from "../../../interfaces/app";
import AuthGridSkeleton from "./AuthGridSkeleton";

interface IAuthGridProps {
  handleSignIn: () => void;
}

const AuthGrid: ReactFCWithSkeleton<IAuthGridProps> = ({ handleSignIn }) => {
  return (
    <Box sx={stickyBoxSx}>
      <Box mt={7} sx={authGridSx} textAlign="center">
        <Box m={2}>
          <Typography variant="h6">
            JOIN THE FASTEST GROWING MEDIA NETWORK
          </Typography>
        </Box>
        <Box m={2}>
          <Typography variant="h6">Grow with us!</Typography>
        </Box>
        <Button
          onClick={handleSignIn}
          variant="contained"
          sx={{ textTransform: "none" }}
        >
          <Typography align="center" variant="h6">
            {LABELS.LOGIN_OR_REGISTER}
          </Typography>
        </Button>
      </Box>
    </Box>
  );
};
AuthGrid.Skeleton = AuthGridSkeleton;

const authGridSx: SxProps<Theme> = (theme: Theme) => ({
  backgroundColor: theme.palette.background.paper,
  padding: "16px",
  borderRadius: "12px",
  boxShadow: `0px 0px 10px ${theme.palette.text.secondary}`,
  height: "400px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
});

const stickyBoxSx: SxProps<Theme> = (theme: Theme) => ({
  position: "sticky",
  top: "140px",
});

export default AuthGrid;
