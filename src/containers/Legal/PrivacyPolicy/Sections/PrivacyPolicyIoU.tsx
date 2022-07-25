import { Box, SxProps, Theme, Typography } from "@mui/material";

const PrivacyPolicyIoU: React.FC = () => {
  return (
    <Box mt={2}>
      <Typography sx={headingSx}>{`Information of Usage`}</Typography>
      <Typography
        sx={privacyPolicyInfoSx}
      >{`Personal Information will be kept confidential and will be used for our research, marketing, and strategic client analysis objectives and other internal business purposes only. We do not sell Personal Information. If you are a customer of our services, your Information shall be shared with our subscribers/advertisers and you shall be given consent to the same. Further, the subscribers / advertisers who are listed with us, may call you, based on the query or enquiry that you make with in our site, enquiring about any connect / Service or Connect / Service of any subscriber / advertiser. If you are a vendor/user/business entity availing our services, your information shall be shared with our users, customers, callers, subscribers/advertisers who are seeking our services. You are hereby giving us the consent to share the details.`}</Typography>
      <Typography
        sx={privacyPolicyInfoSx}
      >{`We use your personal information to assist vendors, service providers, and business partners in handling and fulfilling orders, enhancing customer experience, resolve disputes, troubleshoot problems, help promote a safe service, measure consumer interest in our products/services, inform you about offers, products, services, and updates, customize and enhance your experience, detect and protect us against error, fraud and other criminal activity  enforce our terms and conditions  and as otherwise described to you at the time of collection of information.`}</Typography>
      <Typography
        sx={privacyPolicyInfoSx}
      >{`In our efforts to continually improve our product and service offerings, we and our affiliates collect and analyse demographic and profile data about our users' activity on our Platform. We identify and use your IP address to help diagnose problems with our server, and to administer our Platform. Your IP address is also used to help identify you and to gather broad demographic information.`}</Typography>
      <Typography
        sx={privacyPolicyInfoSx}
      >{`We work  with other companies and individuals to perform functions for examples include analysing data, providing marketing assistance, providing search results and links (including paid listings and links), processing credit card payments and providing customer service etc. They have access to personal information needed to perform their functions, but may not use it for other purposes. Further, they must process the personal information in accordance with this Privacy Policy and as permitted by applicable law. In certain cases, we collect and use your personal information to comply with laws. For instance, we may collect from vendors/seller’s information regarding place of establishment and bank account information for identity verification and other purposes.`}</Typography>
      <Typography
        sx={privacyPolicyInfoSx}
      >{`When you submit Personally Identifiable Information to us through the AVKonnect platform we use your personal information to operate, maintain, and provide to you the features and functionality of the AVKonnect platform and Service. In particular, your mobile phone number is essential to your use of our Service and will be retained. Your name (as it is saved in other user's mobile phone address book or contact list) may be displayed to other users if they tag your mobile number and access your ratings in the App.`}</Typography>
      <Typography
        sx={privacyPolicyInfoSx}
      >{`We do not use your mobile phone number or other Personally Identifiable Information to send commercial or marketing messages without your consent or except as part of a specific program or feature for which you will have the ability to opt-in or opt-out. We may use cookies and log file information to (a) remember information so that you will not have to re-enter it during your re-visit on our platform; (b) provide custom, personalized content and information; (c) monitoring or pages viewed, etc.; and (d) track your entries, submissions, views etc.,.`}</Typography>
    </Box>
  );
};

const headingSx: SxProps<Theme> = (theme: Theme) => ({
  fontSize: "28px",
  fontWeight: "500",
  borderBottom: `1px solid ${theme.palette.text.primary}`,
});

const privacyPolicyInfoSx: SxProps<Theme> = () => ({
  textAlign: "justify",
  fontSize: "16px",
  marginTop: "16px",
});

export default PrivacyPolicyIoU;
