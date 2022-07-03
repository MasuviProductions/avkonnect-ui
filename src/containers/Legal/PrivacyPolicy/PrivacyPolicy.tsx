import { Box, Typography } from "@mui/material";
import { ReactFCWithSkeleton } from "../../../interfaces/app";
import PrivacyPolicySkeleton from "./PrivacyPolicy.Skeleton";

const PrivacyPolicy: ReactFCWithSkeleton = () => {
  return (
    <Box>
      <Typography>Privacy Policy</Typography>
    </Box>
  );
};
PrivacyPolicy.Skeleton = PrivacyPolicySkeleton;

export default PrivacyPolicy;
