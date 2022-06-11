import ENV from "./env";

const AVCONNECT_URL = {
  BASE: ENV.AVCONNECT_CORE_URL,
  NOTIFICATIONS_BASE: ENV.AVCONNECT_NOTIFICATIONS_URL,
  AUTH: (): string => `${AVCONNECT_URL.BASE}/api/v1/auth`,
  USERS: (): string => `${AVCONNECT_URL.BASE}/api/v1/users`,
  NOTIFICATIONS: (): string =>
    `${AVCONNECT_URL.NOTIFICATIONS_BASE}/api/v1/notifications`,
};

const API_ENDPOINTS = {
  AUTH_USER: {
    key: "auth-user",
    url: `${AVCONNECT_URL.AUTH()}/user`,
  },
  COGNITO_TOKEN: {
    key: "auth-cognito-token",
    url: `https://${ENV.COGNITO_CLIENT_DOMAIN}/oauth2/token`,
  },
  USER_PROFILE: {
    key: "user-profile",
    url: (userId: string): string => `${AVCONNECT_URL.USERS()}/${userId}`,
  },
  USER_SIGNED_URL: {
    key: "user-signed-url",
    url: (userId: string): string =>
      `${AVCONNECT_URL.USERS()}/${userId}/signedURL`,
  },
  USER_SKILLS: {
    key: "user-skills",
    url: (userId: string): string =>
      `${AVCONNECT_URL.USERS()}/${userId}/skills`,
  },
  USER_PROJECTS: {
    key: "user-projects",
    url: (userId: string): string =>
      `${AVCONNECT_URL.USERS()}/${userId}/projects`,
  },
  USER_EXPERIENCES: {
    key: "user-experiences",
    url: (userId: string): string =>
      `${AVCONNECT_URL.USERS()}/${userId}/experiences`,
  },
  USER_CERTIFICATIONS: {
    key: "user-certifications",
    url: (userId: string): string =>
      `${AVCONNECT_URL.USERS()}/${userId}/certifications`,
  },
  USER_FEEDBACK: {
    key: "user-feedback",
    url: (userId: string): string =>
      `${AVCONNECT_URL.USERS()}/${userId}/feedback`,
  },
  USERS_SEARCH: {
    key: "users-search",
    url: (queryString: string): string =>
      `${AVCONNECT_URL.USERS()}${queryString}`,
  },
  USER_CONNECTION: {
    key: "user-connection",
    url: (userId: string, connecteeId: string): string =>
      `${AVCONNECT_URL.USERS()}/${userId}/connections/${connecteeId}`,
  },
  USER_CONNECTIONS: {
    key: "user-connections",
    url: (userId: string, queryString: string): string =>
      `${AVCONNECT_URL.USERS()}/${userId}/connections${queryString}`,
  },
  USER_NOTIFICATIONS: {
    key: "user-notifications",
    url: (userId: string, queryString: string) =>
      `${AVCONNECT_URL.NOTIFICATIONS()}/users/${userId}${queryString}`,
  },
  USER_NOTIFICATIONS_COUNT: {
    key: "user-notifications-count",
    url: (userId: string) =>
      `${AVCONNECT_URL.NOTIFICATIONS()}/users/${userId}/unseen`,
  },
};

export enum API_QUERY_KEYS {
  AUTH,
}

export default API_ENDPOINTS;
