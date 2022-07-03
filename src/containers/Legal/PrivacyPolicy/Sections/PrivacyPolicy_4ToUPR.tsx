import { Box, SxProps, Theme, Typography } from "@mui/material";

const PrivacyPolicyToUPR: React.FC = () => {
  return (
    <Box mt={2}>
      <Typography
        sx={headingSx}
      >{`Terms of Use, Policy & Revisions`}</Typography>
      <Typography
        sx={bulletPointSx}
      >{`•  If you choose to use AVKonnect Services, your use and any dispute over privacy is to this policy and our Terms of Use, including limitations on damages, resolution of disputes, and application of the prevailing law in India. If you have any concern about privacy at AVKonnect, please contact us with a thorough description, and we will try to resolve it. Our business changes constantly and our Privacy policy will change also. You should check our websites frequently to see recent changes.`}</Typography>
      <Typography
        sx={bulletPointSx}
      >{`•	Current Privacy Policy applies to all information that we have about you and your account. We assure that will never materially change our policies and practices to make them less protective of your information collected in the past without your consent.`}</Typography>
      <Typography
        sx={bulletPointSx}
      >{`•	In accordance with Information Technology Act 2000 and rules & regulations made there under, the name and contact details of the Grievance Officer are provided below.`}</Typography>
    </Box>
  );
};

const headingSx: SxProps<Theme> = () => ({
  fontSize: "20px",
  fontWeight: "500",
});

const bulletPointSx: SxProps<Theme> = () => ({
  textAlign: "justify",
  fontSize: "16px",
  marginTop: "16px",
});

export default PrivacyPolicyToUPR;
