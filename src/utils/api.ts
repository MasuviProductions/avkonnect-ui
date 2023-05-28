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
  INotificationsApiResponse,
  INotificationCountApiResponse,
  IPostApiResponse,
  ICreatePostApiRequest,
  IPatchPostApiRequest,
  ICreateCommentApiRequest,
  IPatchCommentApiRequest,
  ICommentApiModel,
  IGetReactionsResponseApiModel,
  IGetPostCommentsApiResponse,
  IGetPostsInfoApiRequest,
  IGetPostsInfoApiResponse,
  IGetCommentsCommentsApiResponse,
  ICreateReactionApiRequest,
  IReactionApiResponse,
  IActivityApiModel,
  IGetUserFeedsApiResponse,
  IResourceTypes,
  IGetUserPostsApiResponse,
  IGetRootPostInfoForComment,
  IMediaContent,
  IMediaType,
  IMediaStatus,
  IUpdateMediaStatusBody,
} from "../interfaces/api/external";
import API_ENDPOINTS from "../constants/api";
import axios, { AxiosResponse } from "axios";

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
    .then((res) => res.data?.data as IUserProfileApiResponse);
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
    .then((res) => res.data);
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
    .then((res) => res.data);
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
    .then((res) => res.data);
  return userProfileResponse;
};

export const postMediaEntry = async (
  accessToken: string,
  mediaEntry: IMediaContent
): Promise<AVKonnectApiResponse<IMediaContent>> => {
  const userFeedbackResponse = await axios
    .post<IMediaContent, AxiosResponse<AVKonnectApiResponse<IMediaContent>>>(
      API_ENDPOINTS.CREATE_MEDIA_ENTRY.url(),
      mediaEntry,
      {
        headers: { authorization: `Bearer ${accessToken}` },
      }
    )
    .then((res) => res.data);
  return userFeedbackResponse;
};

export const updateMediaStatus = async (
  accessToken: string,
  resourceType: string,
  fileName: string,
  patchBody: IUpdateMediaStatusBody
): Promise<AVKonnectApiResponse<IUpdateMediaStatusBody>> => {
  const userFeedbackResponse = await axios
    .patch<IUpdateMediaStatusBody, AxiosResponse<AVKonnectApiResponse<IUpdateMediaStatusBody>>>(
      API_ENDPOINTS.UPDATE_MEDIA_STATUS.url(resourceType, fileName),
      patchBody,
      {
        headers: { authorization: `Bearer ${accessToken}` },
      }
    )
    .then((res) => res.data);
  return userFeedbackResponse;
};

export const putUserImageToS3 = async (
  signedUrl: string,
  file: Blob
): Promise<any> => {
  const userProfileResponse = await axios
    .put<any, AxiosResponse<any>>(signedUrl, file, {
      headers: { "Content-Type": "multipart/form-data" },
    })
    .then((res) => res.data);
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
    .then((res) => res.data);
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
    .then((res) => res.data);
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
    .then((res) => res.data);
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
    .then((res) => res.data);
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
    .then((res) => res.data);
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
    .then((res) => res.data);
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
    .then((res) => res.data);
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
    .then((res) => res.data);
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
    .then((res) => res.data);
  return userFeedbackResponse;
};

export const getUsersSearch = async (
  accessToken: string,
  searchString: string,
  limit: number,
  page?: number
): Promise<AVKonnectApiResponse<IUsersSearchApiResponse[]>> => {
  const queryString = `?search=${searchString}&limit=${limit}&page=${
    page || 1
  }`;
  const usersSearchResponse = await axios
    .get<AVKonnectApiResponse<IUsersSearchApiResponse[]>>(
      API_ENDPOINTS.USERS_SEARCH.url(queryString),
      {
        headers: { authorization: `Bearer ${accessToken}` },
      }
    )
    .then((res) => res.data);
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
    .then((res) => res.data);
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
    .then((res) => res.data);
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
    .then((res) => res.data);
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
    .then((res) => res.data);
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
    .then((res) => res.data);
  return userConnection;
};

export const getUserNotifications = async (
  accessToken: string,
  userId: string,
  limit: number,
  nextSearchStartFromKey?: string
): Promise<AVKonnectApiResponse<INotificationsApiResponse>> => {
  const queryString = `?limit=${limit}&nextSearchStartFromKey=${
    nextSearchStartFromKey || ""
  }`;
  const userNotifications = await axios
    .get<AVKonnectApiResponse<INotificationsApiResponse>>(
      API_ENDPOINTS.USER_NOTIFICATIONS.url(userId, queryString),
      {
        headers: { authorization: `Bearer ${accessToken}` },
      }
    )
    .then((res) => res.data);
  return userNotifications;
};

export const getUserNotificationsUnseenCount = async (
  accessToken: string,
  userId: string
): Promise<AVKonnectApiResponse<INotificationCountApiResponse>> => {
  const userNotifications = await axios
    .get<AVKonnectApiResponse<INotificationCountApiResponse>>(
      API_ENDPOINTS.USER_NOTIFICATIONS_COUNT.url(userId),
      { headers: { authorization: `Bearer ${accessToken}` } }
    )
    .then((res) => res.data);
  return userNotifications;
};

export const deleteUserNotificationsUnseenCount = async (
  accessToken: string,
  userId: string
): Promise<AVKonnectApiResponse<INotificationCountApiResponse>> => {
  const userNotificationCount = await axios
    .delete<AVKonnectApiResponse<INotificationCountApiResponse>>(
      API_ENDPOINTS.USER_NOTIFICATIONS_COUNT.url(userId),
      { headers: { authorization: `Bearer ${accessToken}` } }
    )
    .then((res) => res.data);
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
    .then((res) => res.data);
  return updatedUserNotificationAsRead;
};

export const createPost = async (
  accessToken: string,
  createPostContent: ICreatePostApiRequest
): Promise<AVKonnectApiResponse<IPostApiResponse>> => {
  const createPostResponse = await axios
    .post<
      ICreatePostApiRequest,
      AxiosResponse<AVKonnectApiResponse<IPostApiResponse>>
    >(API_ENDPOINTS.CREATE_POST.url(), createPostContent, {
      headers: { authorization: `Bearer ${accessToken}` },
    })
    .then((res) => res.data);
  return createPostResponse;
};

export const getPost = async (
  accessToken: string,
  postId: string
): Promise<AVKonnectApiResponse<IPostApiResponse>> => {
  const getPostResponse = await axios
    .get<AVKonnectApiResponse<IPostApiResponse>>(
      API_ENDPOINTS.GET_POST.url(postId),
      {
        headers: { authorization: `Bearer ${accessToken}` },
      }
    )
    .then((res) => res.data);
  return getPostResponse;
};

export const patchPost = async (
  accessToken: string,
  postId: string,
  patchPostContent: IPatchPostApiRequest
): Promise<AVKonnectApiResponse<IPostApiResponse>> => {
  const patchPostResponse = await axios
    .patch<
      IPatchPostApiRequest,
      AxiosResponse<AVKonnectApiResponse<IPostApiResponse>>
    >(API_ENDPOINTS.PATCH_POST.url(postId), patchPostContent, {
      headers: { authorization: `Bearer ${accessToken}` },
    })
    .then((res) => res.data);
  return patchPostResponse;
};

export const deletePost = async (
  accessToken: string,
  postId: string
): Promise<AVKonnectApiResponse<IPostApiResponse>> => {
  const deletePostResponse = await axios
    .delete<AVKonnectApiResponse<IPostApiResponse>>(
      API_ENDPOINTS.DELETE_POST.url(postId),
      {
        headers: { authorization: `Bearer ${accessToken}` },
      }
    )
    .then((res) => res.data);
  return deletePostResponse;
};

export const createComment = async (
  accessToken: string,
  postUserCommentContent: ICreateCommentApiRequest
): Promise<AVKonnectApiResponse<ICommentApiModel>> => {
  const createCommentResponse = await axios
    .post<
      ICreateCommentApiRequest,
      AxiosResponse<AVKonnectApiResponse<ICommentApiModel>>
    >(API_ENDPOINTS.CREATE_COMMENT.url(), postUserCommentContent, {
      headers: { authorization: `Bearer ${accessToken}` },
    })
    .then((res) => res.data);
  return createCommentResponse;
};

export const getComment = async (
  accessToken: string,
  commentId: string
): Promise<AVKonnectApiResponse<ICommentApiModel>> => {
  const getCommentResponse = await axios
    .get<AVKonnectApiResponse<ICommentApiModel>>(
      API_ENDPOINTS.GET_COMMENT.url(commentId),
      {
        headers: { authorization: `Bearer ${accessToken}` },
      }
    )
    .then((res) => res.data);
  return getCommentResponse;
};

export const patchComment = async (
  accessToken: string,
  commentId: string,
  patchCommentContent: IPatchCommentApiRequest
): Promise<AVKonnectApiResponse<ICommentApiModel>> => {
  const patchCommentResponse = await axios
    .patch<
      IPatchCommentApiRequest,
      AxiosResponse<AVKonnectApiResponse<ICommentApiModel>>
    >(API_ENDPOINTS.PATCH_COMMENT.url(commentId), patchCommentContent, {
      headers: { authorization: `Bearer ${accessToken}` },
    })
    .then((res) => res.data);
  return patchCommentResponse;
};

export const deleteComment = async (
  accessToken: string,
  commentId: string
): Promise<AVKonnectApiResponse<ICommentApiModel>> => {
  const deleteCommentResponse = await axios
    .delete<AVKonnectApiResponse<ICommentApiModel>>(
      API_ENDPOINTS.DELETE_COMMENT.url(commentId),
      {
        headers: { authorization: `Bearer ${accessToken}` },
      }
    )
    .then((res) => res.data);
  return deleteCommentResponse;
};

export const getPostReactions = async (
  accessToken: string,
  postId: string,
  limit: number,
  reactionType?: string,
  nextSearchStartFromKey?: string
): Promise<AVKonnectApiResponse<IGetReactionsResponseApiModel>> => {
  const queryString = `?limit=${limit}&reaction=${
    reactionType || ""
  }&nextSearchStartFromKey=${nextSearchStartFromKey || ""}`;
  const getPostReactionsResponse = await axios
    .get<AVKonnectApiResponse<IGetReactionsResponseApiModel>>(
      API_ENDPOINTS.GET_POST_REACTIONS.url(postId, queryString),
      {
        headers: {
          authorization: `Bearer ${accessToken}`,
        },
      }
    )
    .then((res) => res.data);
  return getPostReactionsResponse;
};

export const getPostComments = async (
  accessToken: string,
  postId: string,
  limit: number,
  nextSearchStartFromKey?: string
): Promise<AVKonnectApiResponse<IGetPostCommentsApiResponse>> => {
  const queryString = `?limit=${limit}&nextSearchStartFromKey=${
    nextSearchStartFromKey || ""
  }`;

  const getPostCommentsResponse = await axios
    .get<AVKonnectApiResponse<IGetPostCommentsApiResponse>>(
      API_ENDPOINTS.GET_POST_COMMENTS.url(postId, queryString),
      {
        headers: {
          authorization: `Bearer ${accessToken}`,
        },
      }
    )
    .then((res) => res.data);
  return getPostCommentsResponse;
};

export const getPostsInfo = async (
  accessToken: string,
  getPostsInfoContent: IGetPostsInfoApiRequest
): Promise<AVKonnectApiResponse<IGetPostsInfoApiResponse>> => {
  const getPostsInfoResponse = await axios
    .post<
      IGetPostsInfoApiRequest,
      AxiosResponse<AVKonnectApiResponse<IGetPostsInfoApiResponse>>
    >(API_ENDPOINTS.GET_POSTS_INFO.url(), getPostsInfoContent, {
      headers: { authorization: `Bearer ${accessToken}` },
    })
    .then((res) => res.data);

  return getPostsInfoResponse;
};

export const getPostActivity = async (
  accessToken: string,
  postId: string
): Promise<AVKonnectApiResponse<IActivityApiModel>> => {
  const getPostActivityResponse = await axios
    .get<AVKonnectApiResponse<IActivityApiModel>>(
      API_ENDPOINTS.GET_POST_ACTIVITY.url(postId),
      {
        headers: { authorization: `Bearer ${accessToken}` },
      }
    )
    .then((res) => res.data);

  return getPostActivityResponse;
};

export const getCommentsComments = async (
  accessToken: string,
  commentId: string,
  limit: number,
  nextSearchStartFromKey?: string
): Promise<AVKonnectApiResponse<IGetCommentsCommentsApiResponse>> => {
  const queryString = `?limit=${limit}&nextSearchStartFromKey=${
    nextSearchStartFromKey || ""
  }`;

  const getCommentsComments = await axios
    .get<AVKonnectApiResponse<IGetCommentsCommentsApiResponse>>(
      API_ENDPOINTS.GET_COMMENTS_COMMENTS.url(commentId, queryString),
      {
        headers: {
          authorization: `Bearer ${accessToken}`,
        },
      }
    )
    .then((res) => res.data);

  return getCommentsComments;
};

export const getCommentReactions = async (
  accessToken: string,
  commentId: string,
  limit: number,
  reactionType?: string,
  nextSearchStartFromKey?: string
): Promise<AVKonnectApiResponse<IGetReactionsResponseApiModel>> => {
  const queryString = `?limit=${limit}&reaction=${
    reactionType || ""
  }&nextSearchStartFromKey=${nextSearchStartFromKey || ""}`;
  const getCommentReactionsResponse = await axios
    .get<AVKonnectApiResponse<IGetReactionsResponseApiModel>>(
      API_ENDPOINTS.GET_COMMENT_REACTIONS.url(commentId, queryString),
      {
        headers: {
          authorization: `Bearer ${accessToken}`,
        },
      }
    )
    .then((res) => res.data);
  return getCommentReactionsResponse;
};

export const getCommentActivity = async (
  accessToken: string,
  commentId: string
): Promise<AVKonnectApiResponse<IActivityApiModel>> => {
  const getCommentActivityResponse = await axios
    .get<AVKonnectApiResponse<IActivityApiModel>>(
      API_ENDPOINTS.GET_COMMENT_ACTIVITY.url(commentId),
      {
        headers: {
          authorization: `Bearer ${accessToken}`,
        },
      }
    )
    .then((res) => res.data);

  return getCommentActivityResponse;
};

export const createReaction = async (
  accessToken: string,
  createReactionBody: ICreateReactionApiRequest
): Promise<AVKonnectApiResponse<IReactionApiResponse>> => {
  const createReactionResponse = await axios
    .post<
      ICreateReactionApiRequest,
      AxiosResponse<AVKonnectApiResponse<IReactionApiResponse>>
    >(API_ENDPOINTS.CREATE_REACTION.url(), createReactionBody, {
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
    })
    .then((res) => res.data);

  return createReactionResponse;
};

export const getReaction = async (
  accessToken: string,
  reactionId: string
): Promise<AVKonnectApiResponse<IReactionApiResponse>> => {
  const getReactionResponse = await axios
    .get<AVKonnectApiResponse<IReactionApiResponse>>(
      API_ENDPOINTS.GET_REACTION.url(reactionId),
      {
        headers: {
          authorization: `Bearer ${accessToken}`,
        },
      }
    )
    .then((res) => res.data);

  return getReactionResponse;
};

export const deleteReaction = async (
  accessToken: string,
  resourceType: IResourceTypes,
  resourceId: string
): Promise<AVKonnectApiResponse> => {
  const deleteReactionResponse = await axios
    .delete<AVKonnectApiResponse>(
      API_ENDPOINTS.DELETE_REACTION.url(resourceType, resourceId),
      {
        headers: {
          authorization: `Bearer ${accessToken}`,
        },
      }
    )
    .then((res) => res.data);

  return deleteReactionResponse;
};

export const getUserFeeds = async (
  accessToken: string,
  userId: string,
  limit: number,
  nextSearchStartFromKey?: string
): Promise<AVKonnectApiResponse<IGetUserFeedsApiResponse>> => {
  const queryString = `?limit=${limit}&nextSearchStartFromKey=${
    nextSearchStartFromKey || ""
  }`;
  const getUserFeedsResponse = await axios
    .get<AVKonnectApiResponse<IGetUserFeedsApiResponse>>(
      API_ENDPOINTS.GET_USER_FEEDS.url(userId, queryString),
      {
        headers: {
          authorization: `Bearer ${accessToken}`,
        },
      }
    )
    .then((res) => res.data);

  return getUserFeedsResponse;
};

export const getUserPosts = async (
  accessToken: string,
  userId: string,
  limit: number,
  page?: number
): Promise<AVKonnectApiResponse<IGetUserPostsApiResponse>> => {
  const queryString = `?limit=${limit}&page=${page || 1}`;
  const getUserFeedsResponse = await axios
    .get<AVKonnectApiResponse<IGetUserPostsApiResponse>>(
      API_ENDPOINTS.GET_USER_POSTS.url(userId, queryString),
      {
        headers: {
          authorization: `Bearer ${accessToken}`,
        },
      }
    )
    .then((res) => res.data);

  return getUserFeedsResponse;
};

export const getRootPostInfoForComment = async (
  accessToken: string,
  commentId: string
): Promise<AVKonnectApiResponse<IGetRootPostInfoForComment>> => {
  const getRootPostInfoForCommentRes = await axios
    .get<AVKonnectApiResponse<IGetRootPostInfoForComment>>(
      API_ENDPOINTS.GET_ROOT_POST_INFO_FOR_COMMENT.url(commentId),
      {
        headers: {
          authorization: `Bearer ${accessToken}`,
        },
      }
    )
    .then((res) => res.data);

  return getRootPostInfoForCommentRes;
};
