import { IGender } from "../../constants/forms/user-info";
import { ISettingsUpdateDetail, IUserSettings } from "../../contexts/UserSettingsContext";

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

export type IUsersInfoApiResponse = IUserAvatarApiModel[];

export type IUserSettingsApiResponse = IUserSettings;

export type IPatchUserSettingsApiRequest = ISettingsUpdateDetail[];

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
  | "name"
  | "headline"
  | "displayPictureUrl"
  | "backgroundImageUrl"
  | "id"
  | "email"
>;

export interface INotificationsApiResponse {
  notifications: Array<INotificationsApiModel>;
  relatedSources: Array<IRelatedSource>;
}

export interface INotificationCountApiResponse {
  pendingNotificationCount: number;
}

export type IResourceTypes = "post" | "comment" | "reaction";

export type ISourceTypes = "user" | "company";

export const REACTIONS = ["like", "support", "love", "laugh", "sad"] as const;
export type IReactionTypes = typeof REACTIONS[number];

export interface IPostContentApiModel {
  text: string;
  createdAt: Date;
  mediaUrls: string[];
  stringifiedRawContent: string;
}

export interface ICreatePostApiRequest {
  content: Omit<IPostContentApiModel, "createdAt">;
  hashtags?: string[];
  visibleOnlyToConnections: boolean;
  commentsOnlyByConnections: boolean;
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

export interface IPostApiResponse {
  sourceId: string;
  sourceType: ISourceTypes;
  contents: IPostContentApiModel[];
  hashtags: string[];
  visibleOnlyToConnections: boolean;
  commentsOnlyByConnections: boolean;
  isDeleted: boolean;
  isBanned: boolean;
  createdAt: Date;
  updatedAt: Date;
  id: string;
  activity: IActivityApiModel;
  sourceActivity?: ISourceActivityApiModel;
  relatedSources: IRelatedUserInfoResponseModel[];
}

export interface IPatchPostApiRequest {
  content: Omit<IPostContentApiModel, "createdAt">;
  hashtags: string[];
}

export interface ICommentContentApiModel {
  text: string;
  mediaUrls: string[];
  createdAt: Date;
  stringifiedRawContent: string;
}

export interface ICreateCommentApiRequest {
  resourceId: string;
  resourceType: IResourceTypes;
  comment: Omit<ICommentContentApiModel, "createdAt">;
}

export interface ICommentApiModel {
  resourceId: string;
  resourceType: IResourceTypes;
  id: string;
  sourceId: string;
  sourceType: ISourceTypes;
  createdAt: Date;
  contents: ICommentContentApiModel[];
  isDeleted: boolean;
  isBanned: boolean;
  activity: IActivityApiModel;
  sourceActivity?: ISourceActivityApiModel;
  relatedSources: IRelatedUserInfoResponseModel[];
}

export interface IPatchCommentApiRequest {
  comment: Omit<ICommentContentApiModel, "createdAt">;
}

export interface IReactionApiModel {
  sourceType: ISourceTypes;
  resourceType: IResourceTypes;
  resourceId: string;
  reaction: IReactionTypes;
  createdAt: Date;
  id: string;
  sourceId: string;
}

export interface IGetPostCommentsApiResponse {
  comments: ICommentApiModel[];
  relatedSources: IRelatedUserInfoResponseModel[];
}

export interface IGetPostsInfoApiRequest {
  sourceId: string;
  sourceType: ISourceTypes;
  postIds: string[];
}

export type IReactionCountApiModel = Record<IReactionTypes, number>;

interface ISourceActivityApiModel {
  comments?: ICommentContentApiModel[];
  reaction?: IReactionTypes;
}

export type ICommentCountType = "comment" | "subComment";

export type ICommentCountApiModel = Record<ICommentCountType, number>;

export interface IGetPostInfoApiModel {
  postId: string;
  createdAt: Date;
  updatedAt: Date;
  sourceId: string;
  sourceType: ISourceTypes;
  contents: ICommentContentApiModel[];
  visibleOnlyToConnections: boolean;
  commentsOnlyByConnections: boolean;
  activity: IActivityApiModel;
  sourceActivity?: ISourceActivityApiModel;
  hashtags: string[];
  isBanned: boolean;
  isDeleted: boolean;
}

export interface IGetPostsInfoApiResponse {
  postsInfo: IGetPostInfoApiModel[];
  relatedSources: IRelatedUserInfoResponseModel[];
}

interface IReportSourcesModel {
  sourceId: string;
  sourceType: ISourceTypes;
  reportReason: string;
}

interface IReportInfoApiModel {
  sources: IReportSourcesModel[];
  reportCount: number;
}

export interface IActivityApiModel {
  commentsCount: ICommentCountApiModel;
  resourceType: IResourceTypes;
  resourceId: string;
  updatedAt: Date;
  createdAt: Date;
  id: string;
  reactionsCount: IReactionCountApiModel;
  reportInfo: IReportInfoApiModel;
}

export interface IGetCommentsCommentsApiResponse {
  comments: ICommentApiModel[];
  relatedSources: IRelatedUserInfoResponseModel[];
}

export interface IGetReactionsResponseApiModel {
  reactions: IReactionApiModel[];
  relatedSources: IRelatedUserInfoResponseModel[];
}

export interface ICreateReactionApiRequest {
  resourceId: string;
  resourceType: IResourceTypes;
  reaction: IReactionTypes;
}

export interface IReactionApiResponse {
  id: string;
  sourceId: string;
  sourceType: ISourceTypes;
  resourceId: string;
  resourceType: IResourceTypes;
  reaction: IReactionTypes;
  createdAt: Date;
  relatedSource: IRelatedUserInfoResponseModel;
}

export interface IFeedSourceApiModel {
  sourceId: string;
  resourceId: string;
  sourceType: ISourceTypes;
  resourceType: IResourceTypes;
}

export interface IUserFeedApiModel {
  postId: string;
  createdAt: Date;
  updatedAt: Date;
  sourceId: string;
  sourceType: ISourceTypes;
  contents: IPostContentApiModel[];
  visibleOnlyToConnections: boolean;
  commentsOnlyByConnections: boolean;
  activity: IActivityApiModel;
  sourceActivity?: ISourceActivityApiModel;
  hashtags: string[];
  isBanned: boolean;
  isDeleted: boolean;
  feedId: string;
  feedSources: IFeedSourceApiModel[];
}

export interface IGetUserFeedsApiResponse {
  feeds: IUserFeedApiModel[];
  relatedSources: IRelatedUserInfoResponseModel[];
}

export interface IGetUserPostsApiResponse {
  postsInfo: IGetPostInfoApiModel[];
  relatedSources: IRelatedUserInfoResponseModel[];
}

export interface IGetRootPostInfoForComment {
  postId: string;
}
