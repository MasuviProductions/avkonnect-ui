import { IUserProfileApiModel } from "../interfaces/api/external";

export const transformUsersListToUserIdUserMap = (
  users: Array<Partial<IUserProfileApiModel>>
): Record<string, Partial<IUserProfileApiModel>> => {
  const userIdUsersMap: Record<string, Partial<IUserProfileApiModel>> = {};
  users.forEach((user) => {
    userIdUsersMap[user.id as string] = user;
  });
  return userIdUsersMap;
};
