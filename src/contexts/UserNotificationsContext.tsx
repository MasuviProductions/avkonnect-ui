import {
  createContext,
  Dispatch,
  SetStateAction,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { useQuery } from "react-query";
import API_ENDPOINTS from "../constants/api";
import { LABELS } from "../constants/labels";
import {
  deleteUserNotificationsUnseenCount,
  getUserNotificationsUnseenCount,
} from "../utils/api";
import { useAuthContext } from "./AuthContext";
import { useSnackbarContext } from "./SnackbarContext";

interface IUserNotificationsProps {
  userNotificationsCount?: number;
  setUserNotificationsCount?: Dispatch<SetStateAction<number | undefined>>;
  triggerGetUserNotificationCountApi?: () => void;
  triggerDeleteUserNotificationCountApi?: () => void;
}

const UserNotificationsContext = createContext<IUserNotificationsProps>({});

const useUserNotificationsContext = (): IUserNotificationsProps => {
  return useContext(UserNotificationsContext);
};

const UserNotificationsContextProvider: React.FC<IUserNotificationsProps> = ({
  children,
}) => {
  const { authUser, accessToken } = useAuthContext();
  const { setSnackbar } = useSnackbarContext();

  const [userNotificationsCount, setUserNotificationsCount] =
    useState<number>();

  const {
    data: getUserNotificationCountData,
    error: getUserNotificationCountError,
    refetch: triggerGetUserNotificationCountApi,
  } = useQuery(
    `GET:${API_ENDPOINTS.USER_NOTIFICATIONS_COUNT.key}:${authUser?.id}`,
    () =>
      getUserNotificationsUnseenCount(
        accessToken as string,
        authUser?.id as string
      ),
    {
      enabled: !!authUser?.id,
      refetchInterval: 30000,
    }
  );

  const {
    data: deleteUserNotificationCountData,
    error: deleteUserNotificationCountError,
    refetch: triggerDeleteUserNotificationCountApi,
  } = useQuery(
    `DELETE:${API_ENDPOINTS.USER_NOTIFICATIONS_COUNT.key}:${authUser?.id}`,
    () =>
      deleteUserNotificationsUnseenCount(
        accessToken as string,
        authUser?.id as string
      ),
    {
      enabled: false,
      cacheTime: 0,
    }
  );

  useEffect(() => {
    if (getUserNotificationCountError) {
      setSnackbar?.(() => ({
        message: LABELS.NOTIFICATION_COUNT_LOAD_FAIL,
        messageType: "error",
      }));
    }
  }, [getUserNotificationCountError, setSnackbar]);

  useEffect(() => {
    if (deleteUserNotificationCountError) {
      setSnackbar?.(() => ({
        message: LABELS.NOTIFICATION_COUNT_DELETE_FAIL,
        messageType: "error",
      }));
    }
  }, [deleteUserNotificationCountError, setSnackbar]);

  useEffect(() => {
    if (getUserNotificationCountData?.data) {
      setUserNotificationsCount(
        getUserNotificationCountData?.data?.pendingNotificationCount
      );
    }
  }, [getUserNotificationCountData?.data]);

  useEffect(() => {
    if (deleteUserNotificationCountData?.data) {
      setUserNotificationsCount(
        deleteUserNotificationCountData?.data?.pendingNotificationCount
      );
    }
  }, [deleteUserNotificationCountData?.data]);

  return (
    <UserNotificationsContext.Provider
      value={{
        userNotificationsCount: userNotificationsCount,
        setUserNotificationsCount: setUserNotificationsCount,
        triggerGetUserNotificationCountApi: triggerGetUserNotificationCountApi,
        triggerDeleteUserNotificationCountApi:
          triggerDeleteUserNotificationCountApi,
      }}
    >
      {children}
    </UserNotificationsContext.Provider>
  );
};

export { useUserNotificationsContext };
export default UserNotificationsContextProvider;
