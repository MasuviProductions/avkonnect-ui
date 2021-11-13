// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

export interface IUserApiResponse {
  name: string;
  title: string;
}

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<IUserApiResponse>
) => {
  const userRes = await new Promise<IUserApiResponse>((resolve) => {
    setTimeout(() => resolve({ name: "John Doe", title: "Actor" }), 2000);
  });

  res.status(200).json(userRes);
};

export default handler;
