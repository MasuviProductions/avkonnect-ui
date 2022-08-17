const ENV = {
  AVKONNECT_CORE_URL: process.env.NEXT_PUBLIC_AVKONNECT_CORE_URL as string,
  AVKONNECT_NOTIFICATIONS_URL: process.env
    .NEXT_PUBLIC_AVKONNECT_NOTIFICATIONS_URL as string,
  AVKONNECT_POSTS_URL: process.env.NEXT_PUBLIC_AVKONNECT_POSTS_URL as string,
  AVKONNECT_FEEDS_URL: process.env.NEXT_PUBLIC_AVKONNECT_FEEDS_URL as string,
  COGNITO_CLIENT_ID: process.env.COGNITO_CLIENT_ID as string,
  COGNITO_CLIENT_SECRET: process.env.COGNITO_CLIENT_SECRET as string,
  COGNITO_CLIENT_DOMAIN: process.env.COGNITO_CLIENT_DOMAIN as string,
  COGNITO_ISSUER: process.env.COGNITO_ISSUER as string,
  NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
  S3_DOMAIN: process.env.S3_DOMAIN,
};

export default ENV;
