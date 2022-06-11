import { Theme } from "@mui/material";
import { SxProps } from "@mui/system";
import moment from "moment";
import { GetServerSidePropsResult } from "next";
import { Session } from "next-auth";
import { getSession } from "next-auth/react";
import { URLSearchParams } from "url";
import { APP_ROUTES } from "../constants/app";
import {
  URL_MATCH_REGEX_WITH_PROTOCOL,
  URL_MATCH_REGEX_WITHOUT_PROTOCOL,
} from "../constants/app";
import { LABELS } from "../constants/labels";
import {
  IUserNotificationRelatedUsersType,
  IUserNotificationResourceType,
} from "../interfaces/api/external";

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

  if (!session || session.error)
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

export const getEllipsedText = (text: string, len: number): string => {
  if (text.length <= len) {
    return text;
  }
  return `${text.substring(0, len)}...`;
};

export const getMUIElipsedSx = (
  lines?: number,
  fixedHeight?: number
): SxProps<Theme> => {
  return (_theme: Theme) => ({
    overflow: "hidden",
    textOverflow: "ellipsis",
    display: "-webkit-box",
    WebkitLineClamp: lines,
    WebkitBoxOrient: "vertical",
    height: fixedHeight,
  });
};

export const getURLFormattedMessage = (message: string): string => {
  const urlFormattedMessage = message.replaceAll(
    URL_MATCH_REGEX_WITHOUT_PROTOCOL,
    `https://$&`
  );
  return urlFormattedMessage;
};

export const getLinkedTextIfURLIsPresent = (para: string) => {
  return para.replaceAll(
    URL_MATCH_REGEX_WITH_PROTOCOL,
    `<a href="$&"
        target="_blank"
        rel="noopener"
        style="text-decoration: underline">
        <strong>
          $&
        </strong>
    </a>`
  );
};

export const generateNotificationMessage = (
  resourceType: string,
  relatedUsers: IUserNotificationRelatedUsersType[]
) => {
  switch (resourceType) {
    case "connectionRequest":
      return LABELS.NOTIFICATION_CONNECTION_REQUEST(relatedUsers[0].name);
    case "connectionConfirmation":
      return LABELS.NOTIFICATION_CONNECTION_CONFIRMATION(relatedUsers[0].name);
    default:
      return LABELS.NOTIFICATION_DEFAULT_MESSAGE;
  }
};

export const getTimeAgo = (unixTime: number): string => {
  return moment(unixTime).fromNow();
};

export const getNotificationTypeBasedLink = (
  notificationType: IUserNotificationResourceType
): string => {
  switch (notificationType) {
    case "connectionRequest":
      return `${APP_ROUTES.MY_NETWORK.route}`;
    case "connectionConfirmation":
      return `${APP_ROUTES.MY_NETWORK.route}`;
    default:
      return `${APP_ROUTES.MY_NETWORK.route}`;
  }
};
