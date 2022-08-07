import ENV from "./env";

const AVKONNECT_URL = {
  BASE: ENV.AVKONNECT_CORE_URL,
  NOTIFICATIONS_BASE: ENV.AVKONNECT_NOTIFICATIONS_URL,
  POSTS_BASE: ENV.AVKONNECT_POSTS_URL,
  AUTH: (): string => `${AVKONNECT_URL.BASE}/api/v1/auth`,
  USERS: (): string => `${AVKONNECT_URL.BASE}/api/v1/users`,
  NOTIFICATIONS: (): string =>
    `${AVKONNECT_URL.NOTIFICATIONS_BASE}/api/notifications/v1`,
  POSTS: (): string => `${AVKONNECT_URL.BASE}/api/posts/v1`,
};

const API_ENDPOINTS = {
  AUTH_USER: {
    key: "auth-user",
    url: `${AVKONNECT_URL.AUTH()}/user`,
  },
  COGNITO_TOKEN: {
    key: "auth-cognito-token",
    url: `https://${ENV.COGNITO_CLIENT_DOMAIN}/oauth2/token`,
  },
  USER_PROFILE: {
    key: "user-profile",
    url: (userId: string): string => `${AVKONNECT_URL.USERS()}/${userId}`,
  },
  USER_SIGNED_URL: {
    key: "user-signed-url",
    url: (userId: string): string =>
      `${AVKONNECT_URL.USERS()}/${userId}/signedURL`,
  },
  USER_SKILLS: {
    key: "user-skills",
    url: (userId: string): string =>
      `${AVKONNECT_URL.USERS()}/${userId}/skills`,
  },
  USER_PROJECTS: {
    key: "user-projects",
    url: (userId: string): string =>
      `${AVKONNECT_URL.USERS()}/${userId}/projects`,
  },
  USER_EXPERIENCES: {
    key: "user-experiences",
    url: (userId: string): string =>
      `${AVKONNECT_URL.USERS()}/${userId}/experiences`,
  },
  USER_CERTIFICATIONS: {
    key: "user-certifications",
    url: (userId: string): string =>
      `${AVKONNECT_URL.USERS()}/${userId}/certifications`,
  },
  USER_FEEDBACK: {
    key: "user-feedback",
    url: (userId: string): string =>
      `${AVKONNECT_URL.USERS()}/${userId}/feedback`,
  },
  USERS_SEARCH: {
    key: "users-search",
    url: (queryString: string): string =>
      `${AVKONNECT_URL.USERS()}${queryString}`,
  },
  USER_CONNECTION: {
    key: "user-connection",
    url: (userId: string, connecteeId: string): string =>
      `${AVKONNECT_URL.USERS()}/${userId}/connections/${connecteeId}`,
  },
  USER_CONNECTIONS: {
    key: "user-connections",
    url: (userId: string, queryString: string): string =>
      `${AVKONNECT_URL.USERS()}/${userId}/connections${queryString}`,
  },
  USER_NOTIFICATIONS: {
    key: "user-notifications",
    url: (userId: string, queryString: string) =>
      `${AVKONNECT_URL.NOTIFICATIONS()}/users/${userId}/notifications${queryString}`,
  },
  USER_NOTIFICATIONS_COUNT: {
    key: "user-notifications-count",
    url: (userId: string) =>
      `${AVKONNECT_URL.NOTIFICATIONS()}/users/${userId}/notifications/unseen`,
  },
  USER_NOTIFICATION_READ: {
    key: "user-notification-read",
    url: (userId: string, notificationId: string) =>
      `${AVKONNECT_URL.NOTIFICATIONS()}/users/${userId}/notifications/${notificationId}/read`,
  },
  USER_POST: {
    key: "user-post",
    url: () => `${AVKONNECT_URL.POSTS()}/posts`,
  },
  USER_POST_ID: {
    key: "user-post",
    url: (postId: string) => `${AVKONNECT_URL.POSTS()}/posts/${postId}`,
  },
  USER_COMMENT: {
    key: "user-comment",
    url: () => `${AVKONNECT_URL.POSTS()}/comments`,
  },
  USER_COMMENT_ID: {
    key: "user-comment-id",
    url: (commentId: string) =>
      `${AVKONNECT_URL.POSTS()}/comments/${commentId}`,
  },
};

export enum API_QUERY_KEYS {
  AUTH,
}

export default API_ENDPOINTS;
