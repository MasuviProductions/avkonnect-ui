import {
  AVConnectApiResponse,
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
} from "../interfaces/api/external";
import API_ENDPOINTS from "../constants/api";
import axios, { AxiosResponse } from "axios";

export const fetchAuthUser = async (
  accessToken: string
): Promise<IUserProfileApiResponse> => {
  const userProfileResponse = await axios
    .get<AVConnectApiResponse<IUserProfileApiResponse>>(
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
): Promise<AVConnectApiResponse<IUserProfileApiResponse>> => {
  const userProfileResponse = await axios
    .get<AVConnectApiResponse<IUserProfileApiResponse>>(
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
): Promise<AVConnectApiResponse<IUserProfileApiResponse>> => {
  const userProfileResponse = await axios
    .patch<
      IUserProfilePatchApiRequest,
      AxiosResponse<AVConnectApiResponse<IUserProfileApiResponse>>
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
): Promise<AVConnectApiResponse<IUserUploadSignedUrlApiResponse>> => {
  const userProfileResponse = await axios
    .get<AVConnectApiResponse<IUserUploadSignedUrlApiResponse>>(
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
): Promise<AVConnectApiResponse<IUserSkillsApiResponse>> => {
  const userSkillsResponse = await axios
    .get<AVConnectApiResponse<IUserSkillsApiResponse>>(
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
): Promise<AVConnectApiResponse<IUserSkillsApiResponse>> => {
  const userSkillsResponse = await axios
    .put<
      IUserSkillSetApiModel[],
      AxiosResponse<AVConnectApiResponse<IUserSkillsApiResponse>>
    >(API_ENDPOINTS.USER_SKILLS.url(userId), skills, {
      headers: { authorization: `Bearer ${accessToken}` },
    })
    .then(res => res.data);
  return userSkillsResponse;
};

export const getUserProjects = async (
  accessToken: string,
  userId: string
): Promise<AVConnectApiResponse<IUserProjectsApiResponse>> => {
  const userProjectsResponse = await axios
    .get<AVConnectApiResponse<IUserProjectsApiResponse>>(
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
): Promise<AVConnectApiResponse<IUserProjectsApiResponse>> => {
  const userProjectsResponse = await axios
    .put<
      IUserProjectApiModel[],
      AxiosResponse<AVConnectApiResponse<IUserProjectsApiResponse>>
    >(API_ENDPOINTS.USER_PROJECTS.url(userId), projects, {
      headers: { authorization: `Bearer ${accessToken}` },
    })
    .then(res => res.data);
  return userProjectsResponse;
};

export const getUserExperiences = async (
  accessToken: string,
  userId: string
): Promise<AVConnectApiResponse<IUserExperiencesApiResponse>> => {
  const userExperiencesResponse = await axios
    .get<AVConnectApiResponse<IUserExperiencesApiResponse>>(
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
): Promise<AVConnectApiResponse<IUserExperiencesApiResponse>> => {
  const userExperiencesResponse = await axios
    .put<
      IUserProjectApiModel[],
      AxiosResponse<AVConnectApiResponse<IUserExperiencesApiResponse>>
    >(API_ENDPOINTS.USER_EXPERIENCES.url(userId), experiences, {
      headers: { authorization: `Bearer ${accessToken}` },
    })
    .then(res => res.data);
  return userExperiencesResponse;
};

export const getUserCertifications = async (
  accessToken: string,
  userId: string
): Promise<AVConnectApiResponse<IUserCertificationsApiResponse>> => {
  const userCertificationsResponse = await axios
    .get<AVConnectApiResponse<IUserCertificationsApiResponse>>(
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
): Promise<AVConnectApiResponse<IUserCertificationsApiResponse>> => {
  const userCertificationsResponse = await axios
    .put<
      IUserProjectApiModel[],
      AxiosResponse<AVConnectApiResponse<IUserCertificationsApiResponse>>
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
): Promise<AVConnectApiResponse<IUserFeedbackApiResponse>> => {
  const userFeedbackResponse = await axios
    .post<
      IUserFeedbackApiResponse,
      AxiosResponse<AVConnectApiResponse<IUserFeedbackApiResponse>>
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
): Promise<AVConnectApiResponse<IUsersSearchApiResponse[]>> => {
  const queryString = `?search=${searchString}&limit=${limit}&page=${
    page || 0
  }`;
  const usersSearchResponse = await axios
    .get<AVConnectApiResponse<IUsersSearchApiResponse[]>>(
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
): Promise<AVConnectApiResponse<IUserConnectionsApiResponse>> => {
  const queryString = `?connectionType=${connectionType}&limit=${limit}&nextSearchStartFromKey=${
    nextSearchStartFromKey || ""
  }`;
  const userConnections = await axios
    .get<AVConnectApiResponse<IUserConnectionsApiResponse>>(
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
): Promise<AVConnectApiResponse<IUserConnectionApiResponse>> => {
  const userConnection = await axios
    .get<AVConnectApiResponse<IUserConnectionApiResponse>>(
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
): Promise<AVConnectApiResponse<IUserConnectionApiResponse>> => {
  const userConnection = await axios
    .post<AVConnectApiResponse<IUserConnectionApiResponse>>(
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
): Promise<AVConnectApiResponse<IUserConnectionApiResponse>> => {
  const userConnection = await axios
    .patch<AVConnectApiResponse<IUserConnectionApiResponse>>(
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
): Promise<AVConnectApiResponse> => {
  const userConnection = await axios
    .delete<AVConnectApiResponse>(
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
): Promise<AVConnectApiResponse<IUserNotificationsApiResponse>> => {
  const queryString = `?limit=${limit}&nextSearchStartFromKey=${
    nextSearchStartFromKey || ""
  }`;
  const userNotifications = await axios
    .get<AVConnectApiResponse<IUserNotificationsApiResponse>>(
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
): Promise<AVConnectApiResponse<IUserNotificationCountApiResponse>> => {
  const userNotifications = await axios
    .get<AVConnectApiResponse<IUserNotificationCountApiResponse>>(
      API_ENDPOINTS.USER_NOTIFICATIONS_COUNT.url(userId),
      { headers: { authorization: `Bearer ${accessToken}` } }
    )
    .then(res => res.data);
  return userNotifications;
};

export const deleteUserNotificationsUnseenCount = async (
  accessToken: string,
  userId: string
): Promise<AVConnectApiResponse<IUserNotificationCountApiResponse>> => {
  const userNotificationCount = await axios
    .delete<AVConnectApiResponse<IUserNotificationCountApiResponse>>(
      API_ENDPOINTS.USER_NOTIFICATIONS_COUNT.url(userId),
      { headers: { authorization: `Bearer ${accessToken}` } }
    )
    .then(res => res.data);
  return userNotificationCount;
};
