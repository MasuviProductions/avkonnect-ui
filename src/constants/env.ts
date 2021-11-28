const ENV = {
  AVCONNECT_BACKEND_URL: process.env
    .NEXT_PUBLIC_AVCONNECT_BACKEND_URL as string,
  COGNITO_CLIENT_ID: process.env.COGNITO_CLIENT_ID as string,
  COGNITO_CLIENT_SECRET: process.env.COGNITO_CLIENT_SECRET as string,
  COGNITO_CLIENT_DOMAIN: process.env.COGNITO_CLIENT_DOMAIN as string,
  COGNITO_ISSUER: process.env.COGNITO_ISSUER as string,
};

export default ENV;
