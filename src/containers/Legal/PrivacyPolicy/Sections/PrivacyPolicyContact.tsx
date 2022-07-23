import { Box, SxProps, Theme, Typography } from "@mui/material";
import { LABELS } from "../../../../constants/labels";

const PrivacyPolicyContact: React.FC = () => {
  return (
    <Box>
      <Typography
        sx={contactSx}
      >{`If you have a query, issue, concern, or complaint in relation to collection or usage of your personal information under this Privacy Policy, please contact us at  ${LABELS.COMPANY_EMAIL}`}</Typography>
    </Box>
  );
};

const contactSx: SxProps<Theme> = () => ({
  textAlign: "justify",
  fontStyle: "italic",
  fontWeight: "500",
  fontSize: "16px",
  marginTop: "20px",
});

export default PrivacyPolicyContact;
