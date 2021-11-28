export interface IAuthUserApiResponse {
  id: string;
  connectionIds: string[];
  dateOfBirth: string;
  email: string;
  followerIds: string[];
  followingIds: string[];
  name: string;
  preferences?: unknown;
}
