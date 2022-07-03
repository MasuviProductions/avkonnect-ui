import { Grid, Skeleton } from "@mui/material";
import LayoutSection from "../../../components/LayoutSection";

const PrivacyPolicySkeleton: React.FC = () => {
  return (
    <>
      <Grid container spacing={2} mt={4}>
        <Grid item xs={12}>
          <LayoutSection>
            <Grid item xs={12} my={1}>
              <Skeleton variant="rectangular" width="100%" height="80px" />
            </Grid>
            <Grid container justifyContent="center" pb={2}>
              <Grid item xs={12} my={1}>
                <Skeleton variant="rectangular" width="25%" height="28px" />
              </Grid>
              <Grid item xs={12} my={1}>
                <Skeleton variant="rectangular" width="100%" height="80vh" />
              </Grid>
            </Grid>
          </LayoutSection>
        </Grid>
      </Grid>
    </>
  );
};

export default PrivacyPolicySkeleton;
