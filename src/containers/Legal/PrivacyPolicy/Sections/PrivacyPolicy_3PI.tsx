import { Box, SxProps, Theme, Typography } from "@mui/material";

const PrivacyPolicyPI: React.FC = () => {
  return (
    <Box mt={2}>
      <Typography sx={headingSx}>{`Personal Information`}</Typography>
      <Typography
        sx={bulletPointSx}
      >{`•	Personal /Sensitive personal data may be processed if such processing is necessary, for any function of Parliament or any State Legislature and/or for the exercise of any function of the State authorised by law for the provision of any service or benefit to the data principal from the State; or the issuance of any certification, license or permit for any action or activity of the data principal by the State.`}</Typography>
      <Typography
        sx={bulletPointSx}
      >{`•	Personal data/Sensitive personal data may be processed if such processing is (a) explicitly mandated under any law made by Parliament or any State Legislature; or (b) for compliance with any order or judgment of any Court or Tribunal in India.`}</Typography>
      <Typography
        sx={bulletPointSx}
      >{`•	Personal data/Sensitive personal data may be processed if such processing is necessary— (a) to respond to any medical emergency involving a threat to the life or a severe threat to the health of the data principal or any other individual; (b) to undertake any measure to provide medical treatment or health services to any individual during an epidemic, outbreak of disease or any other threat to public health; or (c) to undertake any measure to ensure safety of, or provide assistance or services to, any individual during any disaster or any breakdown of public order.`}</Typography>
      <Typography
        sx={bulletPointSx}
      >{`•	The reasonable purposes means and includes, prevention and detection of any unlawful activity including fraud; whistle blowing; mergers and acquisitions; network and information security; credit scoring; recovery of debt; processing of publicly available personal data. However Just Dial ensures the protection of the rights of data principals.`}</Typography>
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

export default PrivacyPolicyPI;
