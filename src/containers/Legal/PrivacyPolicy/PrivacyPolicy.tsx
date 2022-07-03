import {
  Box,
  Container,
  Grid,
  SxProps,
  Theme,
  Typography,
} from "@mui/material";
import { LABELS } from "../../../constants/labels";
import { ReactFCWithSkeleton } from "../../../interfaces/app";
import PrivacyPolicySkeleton from "./PrivacyPolicy.Skeleton";
import {
  PrivacyPolicyIntro,
  PrivacyPolicyIoU,
  PrivacyPolicyPI,
  PrivacyPolicyToUPR,
  PrivacyPolicyContact,
} from "./Sections";

const PrivacyPolicy: ReactFCWithSkeleton = () => {
  return (
    <Container maxWidth="lg">
      <Grid container sx={ppGridSx} my={4} pb={1}>
        <Grid item sx={ppHeadingSx} textAlign="center">
          <Box p={3}>
            <Typography variant="h4">{LABELS.PRIVACY_POLICY_TITLE}</Typography>
          </Box>
        </Grid>
        <Grid item my={2} py={1} px={2}>
          <Typography fontStyle="italic" fontWeight="600">
            {LABELS.PRIVACY_POLICY_LAST_UPDATED}
          </Typography>
        </Grid>
        <Grid item px={2}>
          <PrivacyPolicyIntro />
          <PrivacyPolicyIoU />
          <PrivacyPolicyPI />
          <PrivacyPolicyToUPR />
          <PrivacyPolicyContact />
        </Grid>
      </Grid>
    </Container>
  );
};
PrivacyPolicy.Skeleton = PrivacyPolicySkeleton;

const ppGridSx: SxProps<Theme> = (theme: Theme) => ({
  backgroundColor: theme.palette.secondary.main,
  borderRadius: "6px",
});

const ppHeadingSx: SxProps<Theme> = (theme: Theme) => ({
  width: "100%",
  backgroundColor: theme.palette.secondary.dark,
  borderBottom: `2px solid ${theme.palette.primary.dark}`,
  borderRadius: "6px 6px 0px 0px ",
});

export default PrivacyPolicy;
