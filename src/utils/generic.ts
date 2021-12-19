import { GetServerSidePropsResult } from "next";
import { Session } from "next-auth";
import { getSession } from "next-auth/react";
import { URLSearchParams } from "url";

export const getQueryStringParams = (url: string): URLSearchParams => {
  const params = new URL(url).searchParams;
  return params;
};

export const handleServerSideAuthenticationRedirect = async <T>(
  context: any,
  getSSRProps: (session: Session) => Promise<GetServerSidePropsResult<T>>
): Promise<GetServerSidePropsResult<T>> => {
  const session = await getSession(context);

  if (!session)
    return {
      redirect: {
        destination: "/sign-in",
        permanent: false,
      },
    };
  return await getSSRProps(session);
};

export const getPublicUrlFromS3SignedUrl = (s3SignedUrl: string): string => {
  return s3SignedUrl.split("?")[0] as string;
};

export const usernameToColor = (string: string): string => {
  let hash = 0;
  for (let index = 0; index < string.length; index += 1) {
    hash = string.charCodeAt(index) + ((hash << 5) - hash);
  }
  let color = "#";
  for (let index = 0; index < 3; index += 1) {
    const value = (hash >> (index * 8)) & 0xff;
    color += `00${value.toString(16)}`.substr(-2);
  }
  return color;
};
