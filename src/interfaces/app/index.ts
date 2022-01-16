import { NextPage } from "next";
import { Session } from "next-auth";
import React from "react";
import { Dayjs } from "dayjs";
import { DatePickerView } from "@mui/lab/DatePicker/shared";

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

export interface ITextFieldOption {
  label: string;
  value: string;
}
export interface ITextFieldConfig {
  label: string;
  id: string;
  validations?: ITextFieldPattern[];
  limitations?: ITextFieldPattern[];
  options?: Readonly<ITextFieldOption[]>;
  intialValue?: string | ITextFieldOption;
}

export interface ITextField {
  label: string;
  value: string | ITextFieldOption;
  message?: string;
  messageType?: string;
  options?: Readonly<ITextFieldOption[]>;
}

export interface ITextFieldValidity {
  message: string;
  messageType: string;
  isValid: boolean;
}

// Date Range Field Interfaces
export interface IDateRangeFieldConfig {
  id: string;
  label: string;
  value: Dayjs | null;
  minDate: Dayjs | null;
  maxDate: Dayjs | null;
  views: Readonly<DatePickerView[]>;
}

export type IDateRangeType = "from" | "to";

export interface IDateField {
  id: string;
  value: Dayjs | null;
  views: Readonly<DatePickerView[]>;
  label: string;
  minDate: Dayjs | null;
  maxDate: Dayjs | null;
}

export type IDateRange = Record<IDateRangeType, IDateField>;
