export interface AVConnectApiResponseError {
  message: string;
  code: string;
}

export interface AVConnectApiResponseDDBPagination {
  nextSearchStartFromKey?: Record<string, unknown>;
  count: number;
}

export interface AVConnectApiResponsePagination {
  totalCount: number;
  totalPages: number;
  page: number;
  count: number;
}

export interface AVConnectApiResponse<T = undefined> {
  success: boolean;
  data?: T;
  error?: AVConnectApiResponseError;
  dDBPagination?: AVConnectApiResponseDDBPagination;
  pagination?: AVConnectApiResponsePagination;
}

export interface ISignInUserApiModel {
  emailId: string;
  password: string;
}

export interface ISignUpUserApiModel {
  fname: string;
  lname: string;
  emailId: string;
  password: string;
}

export interface IAuthUserApiResponse {
  id: string;
  email: string;
  name: string;
  headline: string;
  displayPictureUrl: string;
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
  dateOfBirth?: number;
  skillsRefId: string;
  projectsRefId: string;
  id: string;
  phone: string;
  gender: string;
  location: string;
}
export type IUserProfilePatchApiRequest = Partial<
  Omit<
    IUserProfileApiResponse,
    | "id"
    | "followeeCount"
    | "followerCount"
    | "connectionCount"
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

export interface IUserAvatarApiModel {
  email: string;
  headline: string;
  displayPictureUrl: string;
  id: string;
  name: string;
}

export interface IUserProjectApiModel {
  companyName: string;
  collaboratorsRefs: string[];
  collaborators?: IUserAvatarApiModel[];
  description: string;
  employmentType: string;
  endDate: number;
  industry: string;
  name: string;
  role: string;
  startDate: number;
}
export interface IUserProjectsApiResponse {
  createdAt: Date;
  id: string;
  projects: IUserProjectApiModel[];
  updatedAt: Date;
}

export interface IUserExperienceApiModel {
  companyName: string;
  description: string;
  employmentType: string;
  endDate: number;
  industry: string;
  role: string;
  startDate: number;
}
export interface IUserExperiencesApiResponse {
  createdAt: Date;
  id: string;
  experiences: IUserExperienceApiModel[];
  updatedAt: Date;
}

export interface IUserCertificationApiModel {
  name: string;
  issuerName: string;
  description: string;
  issuedAt: number;
  expiresAt: number;
  industry: string;
  photoUrl: string;
  link: string;
}
export interface IUserCertificationsApiResponse {
  createdAt: Date;
  id: string;
  certifications: IUserCertificationApiModel[];
  updatedAt: Date;
}

export interface IUserFeedbackApiResponse {
  id?: string;
  userId?: string;
  subject: string;
  description: string;
  feedbackType: string;
}

export type IUsersSearchApiResponse = IUserAvatarApiModel;

interface IUserConnectionApiModel {
  id: string;
  connectorId: string;
  connecteeId: string;
  isConnected: boolean;
  connectedAt?: number;
  connectionInitiatedBy: string;
  connecteeInfo?: Partial<IUserProfileApiResponse>;
}

export type IUserConnectionApiResponse = IUserConnectionApiModel;

export type IUserConnectionsApiResponse = IUserConnectionApiModel[];

export type IUserNotificationResourceType =
  | "connectionRequest"
  | "connectionConfirmation";

type IUserNotificationRelastedUsersApiResponse = Pick<
  IUserProfileApiResponse,
  "name" | "backgroundImageUrl" | "displayPictureUrl" | "id" | "currentPosition"
>;

interface IUserNotificationsApiModel {
  resourceId: string;
  relatedUsersInfo: IUserNotificationRelastedUsersApiResponse[];
  createdAt: number;
  id: string;
  read: boolean;
  expiresAt: number;
  resourceType: IUserNotificationResourceType;
}

export type IUserNotificationsApiResponse = IUserNotificationsApiModel[];

export interface IUserNotificationCountApiResponse {
  unreadNotificationCount: number;
}
