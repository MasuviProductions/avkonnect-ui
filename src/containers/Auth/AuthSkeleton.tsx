import { Box, Skeleton } from "@mui/material";

const AuthSkeleton: React.FC = () => {
  return (
    <Box mt={5} display="flex" alignItems="center" justifyContent="center">
      <Skeleton variant="rectangular" width={500} height={500} />
    </Box>
  );
};

export default AuthSkeleton;
