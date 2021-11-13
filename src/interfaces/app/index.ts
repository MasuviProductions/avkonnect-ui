import React from "react";

export interface IComponentSkeleton {
  Skeleton?: React.FC;
}

export type ReactFCWithSkeleton<T> = React.FC<T> & IComponentSkeleton;
