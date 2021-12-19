export interface AVConnectApiResponseError {
  message: string;
  code: string;
}
export interface AVConnectApiResponse<T> {
  success: boolean;
  data?: T;
  error?: AVConnectApiResponseError;
}

export interface IAuthUserApiResponse {
  id: string;
  email: string;
  name: string;
}

export interface IUserProfileConnectionApiModel {
  isConnected: boolean;
  isInitiatedByUser: boolean;
  id: string;
}

export interface IUserProfileApiResponse {
  aboutUser: string;
  following: string[];
  displayPictureUrl: string;
  backgroundImageUrl: string;
  followers: string[];
  connections: IUserProfileConnectionApiModel[];
  createdAt: number;
  email: string;
  name: string;
  updatedAt: string;
  currentPosition: string;
  headline: string;
  dateOfBirth: number;
  skills: [];
  id: string;
  phone: string;
}

export type IUserProfilePatchApiRequest = Partial<
  Omit<
    IUserProfileApiResponse,
    | "id"
    | "following"
    | "followers"
    | "connections"
    | "createdAt"
    | "email"
    | "updatedAt"
  >
>;

export type IUserImageType = "background_image" | "display_picture";

export type IUserUploadSignedUrlApiResponse = string;
