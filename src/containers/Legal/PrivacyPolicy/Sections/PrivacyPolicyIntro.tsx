import { Box, SxProps, Theme, Typography } from "@mui/material";

const PrivacyPolicyIntro: React.FC = () => {
  return (
    <Box>
      <Typography sx={headingSx}>{`Introduction`}</Typography>
      <Typography sx={privacyPolicyInfoSx}>
        {`We respect your privacy rights and recognize the importance of
            secure transactions and information privacy. This Privacy Policy
            describes how Masuvi Productions Private Limited. and its affiliates
            collect, use, share or otherwise process your personal information
            through Masuvi Productions Private Limited. website
            www.avkonnect.com, its mobile application, and m-site (hereinafter
            referred to as the “Platform”).`}
      </Typography>
      <Typography sx={privacyPolicyInfoSx}>
        {`This Privacy Policy is an electronic agreement formed under the
            Information Technology Act, 2000 and the rules and regulations made
            there under (as amended till date) including the Information
            Technology (Reasonable security practices and procedures and
            sensitive personal data or information) Rules, 2011 & the
            Information Technology (Intermediary Guidelines and Digital Media
            Ethics Code) Rules, 2021. It does not require any physical or
            digital signatures to make the terms of this policy binding. This
            privacy policy is a legally binding document. The terms of this
            privacy policy will be effective upon your use of our Platform
            /service. Please read this policy carefully, together with our Terms
            of Services (Link …….. ).`}
      </Typography>
      <Typography sx={privacyPolicyInfoSx}>
        {`By visiting our Platform, providing your information or availing
            our product/service, you expressly agree to be bound by the terms of
            this Privacy Policy and the applicable Terms of service. While
            accessing or using our platform/services, you have given explicit
            consent to collect, use, share or otherwise process your information
            in accordance with this Privacy Policy. If you do not agree, please
            do not access or use our Platform or service.`}
      </Typography>
      <Typography sx={privacyPolicyInfoSx}>
        {`You acknowledge that you are disclosing Personal Information
            voluntarily. Prior to the completion of any registration process on
            our platform or prior to availing of any services offered on our
            platform if you wish not to disclose any Personal Information you
            may refrain from doing so; however if you don't provide information
            that is requested, it is possible that the registration process
            would be incomplete and/or you would not be able to avail of the our
            services.`}
      </Typography>
      <Typography sx={privacyPolicyInfoSx}>
        {`AVKonnect required to collect & use certain information about
            individuals, i.e., customers, suppliers/vendors, business contacts,
            employees, and the third parties with whom AVKonnect has a business
            relationship or may need to contact. This policy describes, how
            AVKonnect collects, receives, possesses, stores, deals or handle
            personal information including sensitive personal information about
            you and ensure that the same are available for review by you. The
            personal information must be collected, handled and stored to meet
            the data protection standards as well as legislative requirements.
            This policy ensures to comply with data protection law and follows
            the good practice and protects the rights of employees, customers,
            suppliers/vendors, business contacts, employees, and the third
            parties and how to stores and processes data and protects from the
            risks of data breach.`}
      </Typography>
      <Typography sx={privacyPolicyInfoSx}>
        {`We collect Personal Information from you in a variety of ways when
            you interact with us through our services, such as, installing,
            accessing, or using our Services; Create an account on our services;
            Request customer service or contact us; Conduct a transaction where
            we collect personal information, including when required by law and
            regulations; Submit a testimonial, rating or review, or other
            user-generated content that may be posted; Otherwise submit personal
            information to us along with any related content of the
            communication.`}
      </Typography>
      <Typography sx={privacyPolicyInfoSx}>
        {`AVKonnect does not collect sensitive personal data or information.
            It only collects the sensitive personal data or information which is
            considered necessary to provide the service or to fulfil the purpose
            and for a lawful purpose connected with a function or activity of
            Just dial. User can continue to browse / search on AVKonnect
            platform without giving any information; however,`}
      </Typography>
      <Typography sx={privacyPolicyInfoSx}>
        {`AVKonnect does not collect emails, addresses or other contact
            information from your mobile address book or contact lists other
            than name and mobile phone numbers. AVKonnect does not store
            historical location information in any form or manner at its end,
            except for last known location from which AVKonnect software was
            accessed in case of non-availability of current location data.
            AVKonnect App integrates with face-book SDK and may send aggregate
            usage statistics to social media from time to time. Usage of
            information sent to google analytics is governed by google data
            usage policies.`}
      </Typography>
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

export default PrivacyPolicyIntro;
