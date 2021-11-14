import { IUserApiResponse } from "../pages/api/user";
import ENV from "../constants/env";

export const fetchUser = async (): Promise<IUserApiResponse> => {
  const res = await fetch(`/api/user`);
  return res.json();
};
