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

export interface IUserProfileApiResponse {
  aboutUser: string;
  followeeCount: number;
  displayPictureUrl: string;
  backgroundImageUrl: string;
  followerCount: number;
  connectionCount: number;
  createdAt: number;
  email: string;
  name: string;
  updatedAt: string;
  currentPosition: string;
  headline: string;
  dateOfBirth: number;
  skillsRefId: string;
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

export interface IUserSkillEndorserApiModel {
  rating: number;
  relationWithUser: string;
  endorserId: string;
  name?: string;
  displayPictureUrl?: string;
  headline?: string;
}
export interface IUserSkillSetApiModel {
  name: string;
  endorsers: IUserSkillEndorserApiModel[];
}
export interface IUserSkillsApiResponse {
  createdAt: Date;
  id: string;
  skillSets: IUserSkillSetApiModel[];
  updatedAt: Date;
}
