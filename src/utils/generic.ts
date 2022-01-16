import { GetServerSidePropsResult } from "next";
import { Session } from "next-auth";
import { getSession } from "next-auth/react";
import { URLSearchParams } from "url";
import { APP_ROUTES } from "../constants/app";

export const getQueryStringParams = (url: string): URLSearchParams => {
  const params = new URL(url).searchParams;
  return params;
};

export const handleServerSideAuthenticationRedirect = async <T>(
  context: any,
  getSSRPropsCallback: (
    session: Session
  ) => Promise<GetServerSidePropsResult<T>>
): Promise<GetServerSidePropsResult<T>> => {
  const session = await getSession(context);
  const encodedResolvedRedirectRoute = encodeURI(context.resolvedUrl);

  if (!session)
    return {
      redirect: {
        destination: `${APP_ROUTES.SIGN_IN.route}?encodedResolvedRedirectRoute=${encodedResolvedRedirectRoute}`,
        permanent: false,
      },
    };
  return await getSSRPropsCallback(session);
};

export const getPublicUrlFromS3SignedUrl = (s3SignedUrl: string): string => {
  return s3SignedUrl.split("?")[0] as string;
};

export const debounce = (
  fn: (...args: any[]) => void,
  delay: number | undefined = 300
) => {
  let timer: NodeJS.Timeout;
  return (...args: any) => {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => fn(...args), delay);
  };
};

export const usernameToColor = (string: string): string => {
  let hash = 0;
  for (let index = 0; index < string.length; index += 1) {
    hash = string.charCodeAt(index) + ((hash << 5) - hash);
  }
  let color = "#";
  for (let index = 0; index < 3; index += 1) {
    const value = (hash >> (index * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  return color;
};
