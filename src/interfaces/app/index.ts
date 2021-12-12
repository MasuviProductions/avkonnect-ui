import { NextPage } from "next";
import { Session } from "next-auth";
import React from "react";

export interface IComponentSkeleton {
  Skeleton: React.FC;
}

export type ReactFCWithSkeleton<T = undefined> = React.FC<T> &
  IComponentSkeleton;

export type NextPageWithSkeleton<T = undefined> = NextPage<T> &
  IComponentSkeleton;

export interface SessionProps {
  session: Session;
}

type IPageErrorCodes = "unavailable" | "unknown";

export interface IPageError {
  errorCode: IPageErrorCodes;
}

export interface IProtectedPageProps<T = any> extends SessionProps {
  data?: T | null;
  error?: IPageError | null;
}
