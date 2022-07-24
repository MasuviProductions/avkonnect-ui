import { Box, Skeleton } from "@mui/material";

const AboutUsSkeleton: React.FC = () => {
  return (
    <Box my={2}>
      <Skeleton variant="rectangular" width="100%" height={500} />
    </Box>
  );
};

export default AboutUsSkeleton;
