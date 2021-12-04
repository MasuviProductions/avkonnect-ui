import { ISampleUserApiResponse } from "../pages/api/sampleUser";
import { HttpResponse, IAuthUserApiResponse } from "../interfaces/api/external";
import API_ENDPOINTS from "../constants/api";

export const fetchSampleUser = async (): Promise<ISampleUserApiResponse> => {
  const res = await fetch(`/api/sampleUser`);
  return res.json();
};

export const fetchAuthUser = async (
  accessToken: string
): Promise<HttpResponse<IAuthUserApiResponse>> => {
  const res = await fetch(API_ENDPOINTS.AUTH_USER.url, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return res.json();
};
