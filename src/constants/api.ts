import ENV from "./env";

const AVCONNECT_URL = {
  BASE: ENV.AVCONNECT_BACKEND_URL,
  AUTH: (): string => `${AVCONNECT_URL.BASE}/api/v1/auth`,
  USERS: (): string => `${AVCONNECT_URL.BASE}/api/v1/users`,
};

const API_ENDPOINTS = {
  AUTH_USER: {
    key: "auth/users",
    url: `${AVCONNECT_URL.AUTH()}/user`,
  },
  COGNITO_TOKEN: {
    key: "",
    url: `https://${ENV.COGNITO_CLIENT_DOMAIN}/oauth2/token`,
  },
  USER_PROFILE: {
    key: "",
    url: (userId: string): string => `${AVCONNECT_URL.USERS()}/${userId}`,
  },
  USER_DISPLAY_PICTURE: {
    key: "display-picture",
    url: (userId: string): string =>
      `${AVCONNECT_URL.USERS()}/${userId}/displayPicture`,
  },
  USER_BACKGROUND_PICTURE: {
    key: "background-picture",
    url: (userId: string): string =>
      `${AVCONNECT_URL.USERS()}/${userId}/backgroundPicture`,
  },
};

export enum API_QUERY_KEYS {
  AUTH,
}

export default API_ENDPOINTS;
