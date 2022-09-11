import { IResourceTypes } from "../interfaces/api/external";
import ENV from "./env";

const AVKONNECT_URL = {
  BASE: ENV.AVKONNECT_CORE_URL,
  NOTIFICATIONS_BASE: ENV.AVKONNECT_NOTIFICATIONS_URL,
  POSTS_BASE: ENV.AVKONNECT_POSTS_URL,
  FEEDS_BASE: ENV.AVKONNECT_FEEDS_URL,
  AUTH: (): string => `${AVKONNECT_URL.BASE}/api/v1/auth`,
  USERS: (): string => `${AVKONNECT_URL.BASE}/api/v1/users`,
  NOTIFICATIONS: (): string =>
    `${AVKONNECT_URL.NOTIFICATIONS_BASE}/api/notifications/v1`,
  POSTS: (): string => `${AVKONNECT_URL.POSTS_BASE}/api/posts/v1`,
  FEEDS: (): string => `${AVKONNECT_URL.FEEDS_BASE}/api/feeds/v1`,
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
  CREATE_POST: {
    key: "create-post",
    url: () => `${AVKONNECT_URL.POSTS()}/posts`,
  },
  GET_POST: {
    key: "get-post",
    url: (postId: string) => `${AVKONNECT_URL.POSTS()}/posts/${postId}`,
  },
  PATCH_POST: {
    key: "patch-post",
    url: (postId: string) => `${AVKONNECT_URL.POSTS()}/posts/${postId}`,
  },
  DELETE_POST: {
    key: "delete-post",
    url: (postId: string) => `${AVKONNECT_URL.POSTS()}/posts/${postId}`,
  },
  CREATE_COMMENT: {
    key: "create-comment",
    url: () => `${AVKONNECT_URL.POSTS()}/comments`,
  },
  GET_COMMENT: {
    key: "get-comment",
    url: (commentId: string) =>
      `${AVKONNECT_URL.POSTS()}/comments/${commentId}`,
  },
  PATCH_COMMENT: {
    key: "patch-comment",
    url: (commentId: string) =>
      `${AVKONNECT_URL.POSTS()}/comments/${commentId}`,
  },
  DELETE_COMMENT: {
    key: "delete-comment",
    url: (commentId: string) =>
      `${AVKONNECT_URL.POSTS()}/comments/${commentId}`,
  },
  GET_POST_REACTIONS: {
    key: "get-post-reactions",
    url: (postId: string) =>
      `${AVKONNECT_URL.POSTS()}/posts/${postId}/reactions`,
  },
  GET_POST_COMMENTS: {
    key: "get-post-comments",
    url: (postId: string, queryString: string) =>
      `${AVKONNECT_URL.POSTS()}/posts/${postId}/comments${queryString}`,
  },
  GET_POSTS_INFO: {
    key: "get-posts-info",
    url: () => `${AVKONNECT_URL.POSTS()}/posts/getPostsInfo`,
  },
  GET_POST_ACTIVITY: {
    key: "get-post-activity",
    url: (postId: string) =>
      `${AVKONNECT_URL.POSTS()}/posts/${postId}/activity`,
  },
  GET_COMMENTS_COMMENTS: {
    key: "get-comments-comments",
    url: (commentId: string, queryString: string) =>
      `${AVKONNECT_URL.POSTS()}/comments/${commentId}/comments${queryString}`,
  },
  GET_COMMENT_ACTIVITY: {
    key: "get-comment-activity",
    url: (commentId: string) =>
      `${AVKONNECT_URL.POSTS()}/comments/${commentId}/activity`,
  },
  CREATE_REACTION: {
    key: "create-reaction",
    url: () => `${AVKONNECT_URL.POSTS()}/reactions`,
  },
  GET_REACTION: {
    key: "get-reaction",
    url: (reactionId: string) =>
      `${AVKONNECT_URL.POSTS()}/reactionns/${reactionId}`,
  },
  DELETE_REACTION: {
    key: "delete-reaction",
    url: (resourceType: IResourceTypes, resourceId: string) =>
      `${AVKONNECT_URL.POSTS()}/reactions/${resourceType}/${resourceId}`,
  },
  GET_USER_FEEDS: {
    key: "get-user-feeds",
    url: (userId: string, queryString: string) =>
      `${AVKONNECT_URL.FEEDS()}/users/${userId}/feeds${queryString}`,
  },
  GET_USER_POSTS: {
    key: "get-user-posts",
    url: (userId: string, queryString: string) =>
      `${AVKONNECT_URL.POSTS()}/users/${userId}/posts${queryString}`,
  },
};

export enum API_QUERY_KEYS {
  AUTH,
}

export default API_ENDPOINTS;
