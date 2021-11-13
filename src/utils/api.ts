import { IUserApiResponse } from "../../pages/api/user";

export const fetchUser = async (): Promise<IUserApiResponse> => {
  const res = await fetch(`/api/user`);
  return res.json();
};
