import { IGender } from "../../constants/forms/user-info";

export interface AVKonnectApiResponseError {
  message: string;
  code: string;
}

export interface AVKonnectApiResponseDDBPagination {
  nextSearchStartFromKey?: Record<string, unknown>;
  count: number;
}

export interface AVKonnectApiResponsePagination {
  totalCount: number;
  totalPages: number;
  page: number;
  count: number;
}

export interface AVKonnectApiResponse<T = undefined> {
  success: boolean;
  data?: T;
  error?: AVKonnectApiResponseError;
  dDBPagination?: AVKonnectApiResponseDDBPagination;
  pagination?: AVKonnectApiResponsePagination;
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

export interface IUserProfileApiModel {
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

export type IUserProfileApiResponse = IUserProfileApiModel;

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

export type INotificationSourceType = "user" | "company";

export type INotificationResourceType =
  | "post"
  | "comment"
  | "connection"
  | "broadcast";

export type INotificationConnectionActivity =
  | "connectionRequest"
  | "connectionConfirmation";
export type INotificationPostActivity =
  | "postReaction"
  | "postComment"
  | "postCreation";
export type INotificationCommentActivity =
  | "commentReaction"
  | "commentComment"
  | "commentCreation";

export type INotificationResourceActivity =
  | INotificationConnectionActivity
  | INotificationPostActivity
  | INotificationCommentActivity;

export interface INotificationsApiModel {
  id: string;
  userId: string;
  createdAt: Date;
  read: boolean;
  resourceId: string;
  resourceActivity: INotificationResourceActivity;
  resourceType: INotificationResourceType;
  aggregatorCount: number;
  expiresAt: Date;
  sourceId: string;
  sourceType: INotificationSourceType;
}

export type IRelatedSource = Pick<
  IUserProfileApiModel,
  "name" | "headline" | "displayPictureUrl"
>;

export interface INotificationsApiResponse {
  notifications: Array<INotificationsApiModel>;
  relatedSources: Array<IRelatedSource>;
}

export interface INotificationCountApiResponse {
  pendingNotificationCount: number;
}

type IUserResourceTypes = "post" | "comment";

type IUserSourceTypes = "user" | "company";

interface IUserPostRequestContentApiModel {
  text: string;
  mediaUrls?: string[];
}

export interface IUserPostPostApiRequest {
  content: IUserPostRequestContentApiModel;
  hashtags?: string[];
  visibleOnlyToConnections: boolean;
  commentsOnlyByConnections: boolean;
}

interface IUserPostResponseContentModel {
  text: string;
  createdAt: Date;
  mediaUrls: string[];
}

interface IRelatedUserInfoResponseModel {
  id: string;
  backgroundImageUrl: string;
  displayPictureUrl: string;
  email: string;
  headline: string;
  name: string;
  gender: IGender;
  location: string;
}

export interface IUserPostApiResponse {
  sourceId: string;
  sourceType: IUserSourceTypes;
  contents: IUserPostResponseContentModel[];
  hashtags: string[];
  visibleOnlyToConnections: boolean;
  commentsOnlyByConnections: boolean;
  createdAt: Date;
  updatedAt: Date;
  id: string;
  relatedSources: IRelatedUserInfoResponseModel[];
}

export interface IUserPatchPostApiRequest {
  content: IUserPostRequestContentApiModel;
  hashtags: string[];
}

interface IUserCommentApiModel {
  text: string;
  mediaUrls: string[];
}

export interface IUserPostCommentApiRequest {
  resourceId: string;
  resourceType: IUserResourceTypes;
  comment: IUserCommentApiModel;
}

export interface IUserPostCommentApiResponse {
  resourceId: string;
  resourceType: IUserResourceTypes;
  id: string;
  sourceId: string;
  sourceType: IUserSourceTypes;
  createdAt: Date;
  contents: IUserCommentApiModel[];
}

export interface IUserGetCommentApiResponse {
  resourceType: IUserResourceTypes;
  resourceId: string;
  contents: IUserCommentApiModel[];
  createdAt: Date;
  sourceType: IUserSourceTypes;
  sourceId: string;
  id: string;
}

export interface IUserPatchCommentApiRequest {
  comment: IUserCommentApiModel;
}

export interface IUserPatchCommentApiResponse {
  resourceType: IUserResourceTypes;
  resourceId: string;
  contents: IUserCommentApiModel[];
  createdAt: Date;
  sourceType: IUserSourceTypes;
  sourceId: string;
  id: string;
}
