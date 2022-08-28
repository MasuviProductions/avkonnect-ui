import { Theme } from "@mui/material";
import { SxProps } from "@mui/system";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
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
  INotificationResourceActivity,
  IReactionTypes,
  IRelatedSource,
} from "../interfaces/api/external";
import { ITextFieldMessageType } from "../interfaces/app";

dayjs.extend(relativeTime);

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

export const getMUIEllipsedSx = (
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
  notificationActivity: INotificationResourceActivity,
  relatedSource: IRelatedSource
) => {
  switch (notificationActivity) {
    case "connectionRequest":
      return LABELS.NOTIFICATION_CONNECTION_REQUEST(
        relatedSource.name as string
      );
    case "connectionConfirmation":
      return LABELS.NOTIFICATION_CONNECTION_CONFIRMATION(
        relatedSource.name as string
      );
    default:
      return LABELS.NOTIFICATION_DEFAULT_MESSAGE;
  }
};

export const getTimeAgo = (unixTime: Date): string => {
  return dayjs(unixTime).fromNow();
};

export const getCurrentYear = (): number => {
  return new Date().getFullYear();
};

export const getTextFieldColorBasedOnMessageType = (
  messageType: ITextFieldMessageType | undefined
): ITextFieldMessageType | undefined => {
  return messageType === "warning" ? "warning" : undefined;
};

export const getNotificationTypeBasedLink = (
  notificationActivity: INotificationResourceActivity
): string => {
  switch (notificationActivity) {
    case "connectionRequest":
      return `${APP_ROUTES.MY_NETWORK.route}`;
    case "connectionConfirmation":
      return `${APP_ROUTES.MY_NETWORK.route}`;
    default:
      return `${APP_ROUTES.MY_NETWORK.route}`;
  }
};
