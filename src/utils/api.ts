import {
  AVConnectApiResponse,
  IAuthUserApiResponse,
  IUserProfileApiResponse,
} from "../interfaces/api/external";
import API_ENDPOINTS from "../constants/api";
import axios from "axios";

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
