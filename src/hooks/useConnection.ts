import { useCallback, useEffect, useState } from "react";
import { useQuery } from "react-query";
import API_ENDPOINTS from "../constants/api";
import { LABELS } from "../constants/labels";
import { useAuthContext } from "../contexts/AuthContext";
import { useSnackbarContext } from "../contexts/SnackbarContext";
import { IUserConnectionApiResponse } from "../interfaces/api/external";
import { IApiResponseState } from "../interfaces/app";
import {
  deleteUserConnection,
  getUserConnection,
  patchUserConnection,
  postUserConnection,
} from "../utils/api";
import useRemountKey from "./useRemountKey";

export type IConnectionActionType = "fetch" | "create" | "delete" | "accept";

const useConnection = (
  connecteeId: string,
  sharedHook: boolean | undefined = true
): {
  userConnectionState: IApiResponseState<IUserConnectionApiResponse>;
  lastActionAt: Date;
  lastAction?: IConnectionActionType;
  fetchUserConnection: () => void;
  createUserConnection: () => void;
  acceptUserConnection: () => void;
  rejectUserConnection: () => void;
} => {
  const { authUser, accessToken, triggerAuthUserAPI } = useAuthContext();
  const { setSnackbar } = useSnackbarContext();
  const [userConnectionState, setUserConnectionState] = useState<
    IApiResponseState<IUserConnectionApiResponse>
  >({ loading: false });
  const [lastAction, setLastAction] = useState<IConnectionActionType>();
  const [lastActionAt, setLastActionAt] = useState<Date>(new Date(0));

  const { remountKey } = useRemountKey(5);

  const {
    data: getUserConnectionData,
    status: getUserConnectionStatus,
    refetch: triggerGetUserConnectionApi,
    dataUpdatedAt: getUserConnectionDataUpdatedAt,
  } = useQuery(
    `GET- ${API_ENDPOINTS.USER_CONNECTION.key}:${authUser?.id}:${remountKey}`,
    () =>
      getUserConnection(
        accessToken as string,
        authUser?.id as string,
        connecteeId
      ),
    {
      retry: false,
      enabled: false,
    }
  );

  const {
    data: postUserConnectionData,
    status: postUserConnectionStatus,
    refetch: triggerPostUserConnectionApi,
    dataUpdatedAt: postUserConnectionDataUpdatedAt,
  } = useQuery(
    `POST- ${API_ENDPOINTS.USER_CONNECTION.key}:${authUser?.id}`,
    () =>
      postUserConnection(
        accessToken as string,
        authUser?.id as string,
        connecteeId
      ),
    {
      enabled: false,
    }
  );

  const {
    data: patchUserConnectionData,
    status: patchUserConnectionStatus,
    refetch: triggerPatchUserConnectionApi,
    dataUpdatedAt: patchUserConnectionDataUpdatedAt,
  } = useQuery(
    `PATCH- ${API_ENDPOINTS.USER_CONNECTION.key}:${authUser?.id}`,
    () =>
      patchUserConnection(
        accessToken as string,
        authUser?.id as string,
        connecteeId
      ),
    { enabled: false }
  );

  const {
    data: deleteUserConnectionData,
    status: deleteUserConnectionStatus,
    refetch: triggerDeleteUserConnectionApi,
    dataUpdatedAt: deleteUserConnectionDataUpdatedAt,
  } = useQuery(
    `DELETE- ${API_ENDPOINTS.USER_CONNECTION.key}:${authUser?.id}`,
    () =>
      deleteUserConnection(
        accessToken as string,
        authUser?.id as string,
        connecteeId
      ),
    { enabled: false }
  );

  const fetchUserConnection = useCallback(() => {
    triggerGetUserConnectionApi();
  }, [triggerGetUserConnectionApi]);

  const createUserConnection = useCallback(() => {
    triggerPostUserConnectionApi();
  }, [triggerPostUserConnectionApi]);

  const acceptUserConnection = useCallback(() => {
    triggerPatchUserConnectionApi();
  }, [triggerPatchUserConnectionApi]);

  const rejectUserConnection = useCallback(() => {
    triggerDeleteUserConnectionApi();
  }, [triggerDeleteUserConnectionApi]);

  const handleErrorConnection = useCallback(() => {
    setSnackbar?.({ message: LABELS.CONNECTION_FAILED, messageType: "error" });
  }, [setSnackbar]);

  useEffect(() => {
    if (getUserConnectionData) {
      setLastAction("fetch");
      setUserConnectionState((prev) => ({
        ...prev,
        data: getUserConnectionData?.data,
      }));
    }
  }, [getUserConnectionData, getUserConnectionDataUpdatedAt]);

  useEffect(() => {
    if (postUserConnectionData) {
      setLastAction("create");
      setUserConnectionState((prev) => ({
        ...prev,
        data: postUserConnectionData.data,
      }));
    }
  }, [postUserConnectionData, postUserConnectionDataUpdatedAt]);

  useEffect(() => {
    if (patchUserConnectionData) {
      setLastAction("accept");
      setUserConnectionState((prev) => ({
        ...prev,
        data: patchUserConnectionData.data,
      }));
      triggerAuthUserAPI?.();
    }
  }, [
    patchUserConnectionData,
    patchUserConnectionDataUpdatedAt,
    triggerAuthUserAPI,
  ]);

  useEffect(() => {
    if (deleteUserConnectionData) {
      setLastAction("delete");
      setUserConnectionState((prev) => {
        if (prev.data?.isConnected) {
          triggerAuthUserAPI?.();
        }
        return {
          ...prev,
          data: undefined,
        };
      });
    }
  }, [
    deleteUserConnectionData,
    deleteUserConnectionDataUpdatedAt,
    triggerAuthUserAPI,
  ]);

  useEffect(() => {
    setUserConnectionState((prev) => ({
      ...prev,
      loading: getUserConnectionStatus === "loading",
    }));
  }, [getUserConnectionStatus]);

  useEffect(() => {
    if (postUserConnectionStatus === "error") {
      handleErrorConnection();
    }
  }, [handleErrorConnection, postUserConnectionStatus]);

  useEffect(() => {
    if (patchUserConnectionStatus === "error") {
      handleErrorConnection();
    }
  }, [handleErrorConnection, patchUserConnectionStatus]);

  useEffect(() => {
    if (deleteUserConnectionStatus === "error") {
      handleErrorConnection();
    }
  }, [handleErrorConnection, deleteUserConnectionStatus]);

  useEffect(() => {
    if (getUserConnectionStatus === "error") {
      setLastAction("fetch");
      setUserConnectionState((prev) => ({
        ...prev,
        data: undefined,
      }));
    }
  }, [handleErrorConnection, getUserConnectionStatus]);

  useEffect(() => {
    var dates = [
      getUserConnectionDataUpdatedAt,
      postUserConnectionDataUpdatedAt,
      patchUserConnectionDataUpdatedAt,
      deleteUserConnectionDataUpdatedAt,
    ];
    var maxDate = new Date(Math.max.apply(null, dates));
    setLastActionAt(maxDate);
  }, [
    getUserConnectionDataUpdatedAt,
    postUserConnectionDataUpdatedAt,
    patchUserConnectionDataUpdatedAt,
    deleteUserConnectionDataUpdatedAt,
  ]);

  return {
    userConnectionState,
    lastAction,
    lastActionAt,
    fetchUserConnection,
    createUserConnection,
    acceptUserConnection,
    rejectUserConnection,
  };
};

export default useConnection;
