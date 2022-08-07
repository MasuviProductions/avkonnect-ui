import {
  AVKonnectApiResponse,
  IUserUploadSignedUrlApiResponse,
  IUserImageType,
  IUserProfileApiResponse,
  IUserProfilePatchApiRequest,
  IUserSkillsApiResponse,
  IUserSkillSetApiModel,
  IUsersSearchApiResponse,
  IUserProjectsApiResponse,
  IUserProjectApiModel,
  IUserExperiencesApiResponse,
  IUserExperienceApiModel,
  IUserCertificationsApiResponse,
  IUserCertificationApiModel,
  IUserFeedbackApiResponse,
  IUserConnectionsApiResponse,
  IUserConnectionApiResponse,
  IUserNotificationsApiResponse,
  IUserNotificationCountApiResponse,
  IUserPatchPostApiRequest,
  IUserPostPostApiRequest,
  IUserPostCommentApiRequest,
  IUserPostCommentApiResponse,
  IUserGetCommentApiResponse,
  IUserPatchCommentApiRequest,
  IUserPatchCommentApiResponse,
  IUserPostApiResponse,
} from "../interfaces/api/external";
import API_ENDPOINTS from "../constants/api";
import axios, { Axios, AxiosResponse } from "axios";

export const fetchAuthUser = async (
  accessToken: string
): Promise<IUserProfileApiResponse> => {
  const userProfileResponse = await axios
    .get<AVKonnectApiResponse<IUserProfileApiResponse>>(
      API_ENDPOINTS.AUTH_USER.url,
      {
        headers: { authorization: `Bearer ${accessToken}` },
      }
    )
    .then(res => res.data?.data as IUserProfileApiResponse);
  return userProfileResponse;
};

export const fetchUserProfile = async (
  accessToken: string,
  userId: string
): Promise<AVKonnectApiResponse<IUserProfileApiResponse>> => {
  const userProfileResponse = await axios
    .get<AVKonnectApiResponse<IUserProfileApiResponse>>(
      API_ENDPOINTS.USER_PROFILE.url(userId),
      {
        headers: { authorization: `Bearer ${accessToken}` },
      }
    )
    .then(res => res.data);
  return userProfileResponse;
};

export const patchUserProfile = async (
  accessToken: string,
  userId: string,
  reqBody: IUserProfilePatchApiRequest
): Promise<AVKonnectApiResponse<IUserProfileApiResponse>> => {
  const userProfileResponse = await axios
    .patch<
      IUserProfilePatchApiRequest,
      AxiosResponse<AVKonnectApiResponse<IUserProfileApiResponse>>
    >(API_ENDPOINTS.USER_PROFILE.url(userId), reqBody, {
      headers: { authorization: `Bearer ${accessToken}` },
    })
    .then(res => res.data);
  return userProfileResponse;
};

export const fetchUserImageSignedUrl = async (
  accessToken: string,
  userId: string,
  imageType: IUserImageType
): Promise<AVKonnectApiResponse<IUserUploadSignedUrlApiResponse>> => {
  const userProfileResponse = await axios
    .get<AVKonnectApiResponse<IUserUploadSignedUrlApiResponse>>(
      `${API_ENDPOINTS.USER_SIGNED_URL.url(userId)}?imageType=${imageType}`,
      {
        headers: { authorization: `Bearer ${accessToken}` },
      }
    )
    .then(res => res.data);
  return userProfileResponse;
};

export const putUserImageToS3 = async (
  signedUrl: string,
  file: Blob
): Promise<any> => {
  const userProfileResponse = await axios
    .put<any, AxiosResponse<any>>(signedUrl, file, {
      headers: { "Content-Type": "multipart/form-data" },
    })
    .then(res => res.data);
  return userProfileResponse;
};

export const getUserSkills = async (
  accessToken: string,
  userId: string
): Promise<AVKonnectApiResponse<IUserSkillsApiResponse>> => {
  const userSkillsResponse = await axios
    .get<AVKonnectApiResponse<IUserSkillsApiResponse>>(
      API_ENDPOINTS.USER_SKILLS.url(userId),
      {
        headers: { authorization: `Bearer ${accessToken}` },
      }
    )
    .then(res => res.data);
  return userSkillsResponse;
};

export const putUserSkills = async (
  accessToken: string,
  userId: string,
  skills: IUserSkillSetApiModel[]
): Promise<AVKonnectApiResponse<IUserSkillsApiResponse>> => {
  const userSkillsResponse = await axios
    .put<
      IUserSkillSetApiModel[],
      AxiosResponse<AVKonnectApiResponse<IUserSkillsApiResponse>>
    >(API_ENDPOINTS.USER_SKILLS.url(userId), skills, {
      headers: { authorization: `Bearer ${accessToken}` },
    })
    .then(res => res.data);
  return userSkillsResponse;
};

export const getUserProjects = async (
  accessToken: string,
  userId: string
): Promise<AVKonnectApiResponse<IUserProjectsApiResponse>> => {
  const userProjectsResponse = await axios
    .get<AVKonnectApiResponse<IUserProjectsApiResponse>>(
      API_ENDPOINTS.USER_PROJECTS.url(userId),
      {
        headers: { authorization: `Bearer ${accessToken}` },
      }
    )
    .then(res => res.data);
  return userProjectsResponse;
};

export const putUserProjects = async (
  accessToken: string,
  userId: string,
  projects: IUserProjectApiModel[]
): Promise<AVKonnectApiResponse<IUserProjectsApiResponse>> => {
  const userProjectsResponse = await axios
    .put<
      IUserProjectApiModel[],
      AxiosResponse<AVKonnectApiResponse<IUserProjectsApiResponse>>
    >(API_ENDPOINTS.USER_PROJECTS.url(userId), projects, {
      headers: { authorization: `Bearer ${accessToken}` },
    })
    .then(res => res.data);
  return userProjectsResponse;
};

export const getUserExperiences = async (
  accessToken: string,
  userId: string
): Promise<AVKonnectApiResponse<IUserExperiencesApiResponse>> => {
  const userExperiencesResponse = await axios
    .get<AVKonnectApiResponse<IUserExperiencesApiResponse>>(
      API_ENDPOINTS.USER_EXPERIENCES.url(userId),
      {
        headers: { authorization: `Bearer ${accessToken}` },
      }
    )
    .then(res => res.data);
  return userExperiencesResponse;
};

export const putUserExperiences = async (
  accessToken: string,
  userId: string,
  experiences: IUserExperienceApiModel[]
): Promise<AVKonnectApiResponse<IUserExperiencesApiResponse>> => {
  const userExperiencesResponse = await axios
    .put<
      IUserProjectApiModel[],
      AxiosResponse<AVKonnectApiResponse<IUserExperiencesApiResponse>>
    >(API_ENDPOINTS.USER_EXPERIENCES.url(userId), experiences, {
      headers: { authorization: `Bearer ${accessToken}` },
    })
    .then(res => res.data);
  return userExperiencesResponse;
};

export const getUserCertifications = async (
  accessToken: string,
  userId: string
): Promise<AVKonnectApiResponse<IUserCertificationsApiResponse>> => {
  const userCertificationsResponse = await axios
    .get<AVKonnectApiResponse<IUserCertificationsApiResponse>>(
      API_ENDPOINTS.USER_CERTIFICATIONS.url(userId),
      {
        headers: { authorization: `Bearer ${accessToken}` },
      }
    )
    .then(res => res.data);
  return userCertificationsResponse;
};

export const putUserCertifications = async (
  accessToken: string,
  userId: string,
  certifications: IUserCertificationApiModel[]
): Promise<AVKonnectApiResponse<IUserCertificationsApiResponse>> => {
  const userCertificationsResponse = await axios
    .put<
      IUserProjectApiModel[],
      AxiosResponse<AVKonnectApiResponse<IUserCertificationsApiResponse>>
    >(API_ENDPOINTS.USER_CERTIFICATIONS.url(userId), certifications, {
      headers: { authorization: `Bearer ${accessToken}` },
    })
    .then(res => res.data);
  return userCertificationsResponse;
};

export const postUserFeedback = async (
  accessToken: string,
  userId: string,
  feedback: IUserFeedbackApiResponse
): Promise<AVKonnectApiResponse<IUserFeedbackApiResponse>> => {
  const userFeedbackResponse = await axios
    .post<
      IUserFeedbackApiResponse,
      AxiosResponse<AVKonnectApiResponse<IUserFeedbackApiResponse>>
    >(API_ENDPOINTS.USER_FEEDBACK.url(userId), feedback, {
      headers: { authorization: `Bearer ${accessToken}` },
    })
    .then(res => res.data);
  return userFeedbackResponse;
};

export const getUsersSearch = async (
  accessToken: string,
  searchString: string,
  page: number,
  limit: number
): Promise<AVKonnectApiResponse<IUsersSearchApiResponse[]>> => {
  const queryString = `?search=${searchString}&limit=${limit}&page=${
    page || 0
  }`;
  const usersSearchResponse = await axios
    .get<AVKonnectApiResponse<IUsersSearchApiResponse[]>>(
      API_ENDPOINTS.USERS_SEARCH.url(queryString),
      {
        headers: { authorization: `Bearer ${accessToken}` },
      }
    )
    .then(res => res.data);
  return usersSearchResponse;
};

export const getUserConnections = async (
  accessToken: string,
  userId: string,
  connectionType: "all" | "connected" | "pending" | "sent",
  limit: number,
  nextSearchStartFromKey?: string
): Promise<AVKonnectApiResponse<IUserConnectionsApiResponse>> => {
  const queryString = `?connectionType=${connectionType}&limit=${limit}&nextSearchStartFromKey=${
    nextSearchStartFromKey || ""
  }`;
  const userConnections = await axios
    .get<AVKonnectApiResponse<IUserConnectionsApiResponse>>(
      API_ENDPOINTS.USER_CONNECTIONS.url(userId, queryString),
      {
        headers: { authorization: `Bearer ${accessToken}` },
      }
    )
    .then(res => res.data);
  return userConnections;
};

export const getUserConnection = async (
  accessToken: string,
  userId: string,
  connecteeId: string
): Promise<AVKonnectApiResponse<IUserConnectionApiResponse>> => {
  const userConnection = await axios
    .get<AVKonnectApiResponse<IUserConnectionApiResponse>>(
      API_ENDPOINTS.USER_CONNECTION.url(userId, connecteeId),
      {
        headers: { authorization: `Bearer ${accessToken}` },
      }
    )
    .then(res => res.data);
  return userConnection;
};

export const postUserConnection = async (
  accessToken: string,
  userId: string,
  connecteeId: string
): Promise<AVKonnectApiResponse<IUserConnectionApiResponse>> => {
  const userConnection = await axios
    .post<AVKonnectApiResponse<IUserConnectionApiResponse>>(
      API_ENDPOINTS.USER_CONNECTION.url(userId, connecteeId),
      undefined,
      {
        headers: { authorization: `Bearer ${accessToken}` },
      }
    )
    .then(res => res.data);
  return userConnection;
};

export const patchUserConnection = async (
  accessToken: string,
  userId: string,
  connecteeId: string
): Promise<AVKonnectApiResponse<IUserConnectionApiResponse>> => {
  const userConnection = await axios
    .patch<AVKonnectApiResponse<IUserConnectionApiResponse>>(
      API_ENDPOINTS.USER_CONNECTION.url(userId, connecteeId),
      undefined,
      {
        headers: { authorization: `Bearer ${accessToken}` },
      }
    )
    .then(res => res.data);
  return userConnection;
};

export const deleteUserConnection = async (
  accessToken: string,
  userId: string,
  connecteeId: string
): Promise<AVKonnectApiResponse> => {
  const userConnection = await axios
    .delete<AVKonnectApiResponse>(
      API_ENDPOINTS.USER_CONNECTION.url(userId, connecteeId),
      {
        headers: { authorization: `Bearer ${accessToken}` },
      }
    )
    .then(res => res.data);
  return userConnection;
};

export const getUserNotifications = async (
  accessToken: string,
  userId: string,
  limit: number,
  nextSearchStartFromKey?: string
): Promise<AVKonnectApiResponse<IUserNotificationsApiResponse>> => {
  const queryString = `?limit=${limit}&nextSearchStartFromKey=${
    nextSearchStartFromKey || ""
  }`;
  const userNotifications = await axios
    .get<AVKonnectApiResponse<IUserNotificationsApiResponse>>(
      API_ENDPOINTS.USER_NOTIFICATIONS.url(userId, queryString),
      {
        headers: { authorization: `Bearer ${accessToken}` },
      }
    )
    .then(res => res.data);
  return userNotifications;
};

export const getUserNotificationsUnseenCount = async (
  accessToken: string,
  userId: string
): Promise<AVKonnectApiResponse<IUserNotificationCountApiResponse>> => {
  const userNotifications = await axios
    .get<AVKonnectApiResponse<IUserNotificationCountApiResponse>>(
      API_ENDPOINTS.USER_NOTIFICATIONS_COUNT.url(userId),
      { headers: { authorization: `Bearer ${accessToken}` } }
    )
    .then(res => res.data);
  return userNotifications;
};

export const deleteUserNotificationsUnseenCount = async (
  accessToken: string,
  userId: string
): Promise<AVKonnectApiResponse<IUserNotificationCountApiResponse>> => {
  const userNotificationCount = await axios
    .delete<AVKonnectApiResponse<IUserNotificationCountApiResponse>>(
      API_ENDPOINTS.USER_NOTIFICATIONS_COUNT.url(userId),
      { headers: { authorization: `Bearer ${accessToken}` } }
    )
    .then(res => res.data);
  return userNotificationCount;
};

export const patchReadUserNotification = async (
  accessToken: string,
  userId: string,
  notificationId: string
): Promise<AVKonnectApiResponse> => {
  const updatedUserNotificationAsRead = await axios
    .patch<AVKonnectApiResponse>(
      API_ENDPOINTS.USER_NOTIFICATION_READ.url(userId, notificationId),
      undefined,
      {
        headers: { authorization: `Bearer ${accessToken}` },
      }
    )
    .then(res => res.data);
  return updatedUserNotificationAsRead;
};

export const postUserPost = async (
  accessToken: string,
  postUserPostContent: IUserPostPostApiRequest
): Promise<AVKonnectApiResponse<IUserPostApiResponse>> => {
  const postUserPostResponse = await axios
    .post<
      IUserPostPostApiRequest,
      AxiosResponse<AVKonnectApiResponse<IUserPostApiResponse>>
    >(API_ENDPOINTS.USER_POST.url(), postUserPostContent, {
      headers: { authorization: `Bearer ${accessToken}` },
    })
    .then(res => res.data);
  return postUserPostResponse;
};

export const getUserPost = async (
  accessToken: string,
  postId: string
): Promise<AVKonnectApiResponse<IUserPostApiResponse>> => {
  const userPostResponse = await axios
    .get<AVKonnectApiResponse<IUserPostApiResponse>>(
      API_ENDPOINTS.USER_POST_ID.url(postId),
      {
        headers: { authorization: `Bearer ${accessToken}` },
      }
    )
    .then(res => res.data);
  return userPostResponse;
};

export const patchUserPost = async (
  accessToken: string,
  postId: string,
  patchUserPostContent: IUserPatchPostApiRequest
): Promise<AVKonnectApiResponse<IUserPostApiResponse>> => {
  const patchUserPostResponse = await axios
    .patch<
      IUserPatchPostApiRequest,
      AxiosResponse<AVKonnectApiResponse<IUserPostApiResponse>>
    >(API_ENDPOINTS.USER_POST_ID.url(postId), patchUserPostContent, {
      headers: { authorization: `Bearer ${accessToken}` },
    })
    .then(res => res.data);
  return patchUserPostResponse;
};

export const deleteUserPost = async (
  accessToken: string,
  postId: string
): Promise<AVKonnectApiResponse> => {
  const deleteUserPostResponse = await axios
    .delete<AVKonnectApiResponse>(API_ENDPOINTS.USER_POST_ID.url(postId), {
      headers: { authorization: `Bearer ${accessToken}` },
    })
    .then(res => res.data);
  return deleteUserPostResponse;
};

export const postUserComment = async (
  accessToken: string,
  postUserCommentContent: IUserPostCommentApiRequest
): Promise<AVKonnectApiResponse<IUserPostCommentApiResponse>> => {
  const postUserCommentResponse = await axios
    .post<
      IUserPostCommentApiResponse,
      AxiosResponse<AVKonnectApiResponse<IUserPostCommentApiResponse>>
    >(API_ENDPOINTS.USER_COMMENT.url(), postUserCommentContent, {
      headers: { authorization: `Bearer ${accessToken}` },
    })
    .then(res => res.data);
  return postUserCommentResponse;
};

export const getUserComment = async (
  accessToken: string,
  commentId: string
): Promise<AVKonnectApiResponse<IUserGetCommentApiResponse>> => {
  const getUserCommentResponse = await axios
    .get<AVKonnectApiResponse<IUserGetCommentApiResponse>>(
      API_ENDPOINTS.USER_COMMENT_ID.url(commentId),
      {
        headers: { authorization: `Bearer ${accessToken}` },
      }
    )
    .then(res => res.data);
  return getUserCommentResponse;
};

export const patchUserComment = async (
  accessToken: string,
  commentId: string,
  patchUserCommentContent: IUserPatchCommentApiRequest
): Promise<AVKonnectApiResponse<IUserPatchCommentApiResponse>> => {
  const patchUserCommentResponse = await axios
    .patch<
      IUserPatchCommentApiRequest,
      AxiosResponse<AVKonnectApiResponse<IUserPatchCommentApiResponse>>
    >(API_ENDPOINTS.USER_POST_ID.url(commentId), patchUserCommentContent, {
      headers: { authorization: `Bearer ${accessToken}` },
    })
    .then(res => res.data);
  return patchUserCommentResponse;
};

export const deleteUserComment = async (
  accessToken: string,
  commentId: string
): Promise<AVKonnectApiResponse> => {
  const deleteUserCommentResponse = await axios
    .delete<AVKonnectApiResponse>(API_ENDPOINTS.USER_POST_ID.url(commentId), {
      headers: { authorization: `Bearer ${accessToken}` },
    })
    .then(res => res.data);
  return deleteUserCommentResponse;
};
