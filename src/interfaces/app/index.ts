import { NextPage } from "next";
import { Session } from "next-auth";
import React from "react";
import { Dayjs } from "dayjs";
import { CalendarPickerView } from "@mui/lab";

export interface IComponentSkeleton {
  Skeleton: React.FC;
}

export type ReactFCWithSkeleton<T = unknown> = React.FC<T> & IComponentSkeleton;

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

export interface IImageSelectorAttrib {
  aspectRatio: number;
  label: string;
  fitType: "horizontal-cover" | "vertical-cover";
}

// Text Field Interfaces

export interface ITextFieldPattern {
  regex: RegExp;
  message?: string;
  messageType?: "warning" | "error";
}

export interface ITextFieldConfig {
  label: string;
  id: string;
  validations?: ITextFieldPattern[];
  limitations?: ITextFieldPattern[];
  options?: Readonly<string[]>;
  intialValue?: string;
}

export interface ITextField {
  label: string;
  value: string;
  message?: string;
  messageType?: string;
  options?: Readonly<string[]>;
}

export interface ITextFieldValidity {
  message: string;
  messageType: string;
  isValid: boolean;
}

// Date Range Field Interfaces
export interface IDateFieldConfig {
  id: string;
  label: string;
  value: Dayjs | null;
  minDate: Dayjs | null;
  maxDate: Dayjs | null;
  views: Readonly<CalendarPickerView[]>;
}

export type IDateRangeType = "from" | "to";

export interface IDateField {
  id: string;
  value: Dayjs | null;
  views: Readonly<CalendarPickerView[]>;
  label: string;
  minDate: Dayjs | null;
  maxDate: Dayjs | null;
}

export type IDateRange = Record<IDateRangeType, IDateField>;

export interface ITabMenuItem {
  id: string;
  title: string;
  icon: JSX.Element;
}

export interface ITabMenuItemProps {
  panelItem: ITabMenuItem;
  isActive: boolean;
  onItemSelect: (id: string) => void;
}

export interface IApiResponseState<T = unknown> {
  data?: T;
  loading: boolean;
  error?: unknown;
}
