import type { NextApiRequest, NextApiResponse } from "next";

export interface ISampleUserApiResponse {
  name: string;
  title: string;
}

const sampleUserHandler = async (
  _req: NextApiRequest,
  res: NextApiResponse<ISampleUserApiResponse>
) => {
  const userRes = await new Promise<ISampleUserApiResponse>((resolve) => {
    setTimeout(
      () =>
        resolve({
          name: "John Doe",
          title: `Actor ${Math.floor(Math.random() * 10)}`,
        }),
      2000
    );
  });

  res.status(200).json(userRes);
};

export default sampleUserHandler;
