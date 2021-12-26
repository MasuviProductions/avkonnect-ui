import {
  AVConnectApiResponse,
  IAuthUserApiResponse,
  IUserUploadSignedUrlApiResponse,
  IUserImageType,
  IUserProfileApiResponse,
  IUserProfilePatchApiRequest,
  IUserSkillsApiResponse,
  IUserSkillSetApiModel,
} from "../interfaces/api/external";
import API_ENDPOINTS from "../constants/api";
import axios, { AxiosResponse } from "axios";

export const fetchAuthUser = async (
  accessToken: string
): Promise<IAuthUserApiResponse> => {
  const userProfileResponse = await axios
    .get<AVConnectApiResponse<IAuthUserApiResponse>>(
      API_ENDPOINTS.AUTH_USER.url,
      {
        headers: { authorization: `Bearer ${accessToken}` },
      }
    )
    .then((res) => res.data?.data as IAuthUserApiResponse);
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
    .then((res) => res.data);
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
    .then((res) => res.data);
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
    .then((res) => res.data);
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
    .then((res) => res.data);
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
    .then((res) => res.data);
  return userSkillsResponse;
};

export const patchUserSkills = async (
  accessToken: string,
  userId: string,
  skills: IUserSkillSetApiModel[]
): Promise<AVConnectApiResponse<IUserSkillsApiResponse>> => {
  const userSkillsResponse = await axios
    .patch<
      IUserSkillSetApiModel[],
      AxiosResponse<AVConnectApiResponse<IUserSkillsApiResponse>>
    >(API_ENDPOINTS.USER_SKILLS.url(userId), skills, {
      headers: { authorization: `Bearer ${accessToken}` },
    })
    .then((res) => res.data);
  return userSkillsResponse;
};
