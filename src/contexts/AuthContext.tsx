import { signOut, useSession } from "next-auth/react";
import { useQuery } from "react-query";
import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import API_ENDPOINTS from "../constants/api";
import { fetchAuthUser } from "../utils/api";
import { APP_ROUTES, SESSION_REFETCH_INTERVAL } from "../constants/app";
import { IUserProfileApiResponse } from "../interfaces/api/external";

interface IAuthContextProps {
  authUser?: IUserProfileApiResponse;
  accessToken?: string;
  setAuthUser?: Dispatch<SetStateAction<IUserProfileApiResponse | undefined>>;
  setAccessToken?: Dispatch<SetStateAction<string | undefined>>;
  authError?: boolean;
  authLoading?: boolean;
  triggerAuthUserAPI?: () => void;
}

const AuthContext = createContext<IAuthContextProps>({});

const useAuthContext = (): IAuthContextProps => {
  return useContext(AuthContext);
};

const AuthContextProvider: React.FC = ({ children }) => {
  const [authUser, setAuthUser] = useState<IUserProfileApiResponse>();
  const [accessToken, setAccessToken] = useState<string>();
  const [authError, setAuthError] = useState(false);
  const [authLoading, setAuthLoading] = useState(true);
  const { data: sessionData, status: sessionStatus } = useSession();
  const {
    data: authUserData,
    error: authUserError,
    refetch: triggerAuthUserAPI,
  } = useQuery(
    API_ENDPOINTS.AUTH_USER.key,
    () => fetchAuthUser(sessionData?.accessToken as string),
    {
      cacheTime: 1000 * 60 * 3,
      enabled: Boolean(sessionData) && sessionStatus !== "loading",
    }
  );

  useEffect(() => {
    if (
      sessionData?.expires &&
      new Date(sessionData.expires).getTime() - Date.now() <
        SESSION_REFETCH_INTERVAL
    ) {
      signOut({
        callbackUrl: `${window.location.origin}${APP_ROUTES.SIGN_IN.route}`,
      });
    }
  }, [sessionData]);

  useEffect(() => {
    if (authUserData) {
      setAuthUser(authUserData);
    }
  }, [authUserData]);

  useEffect(() => {
    if (sessionData) {
      setAuthError(!!sessionData.error);
      setAccessToken(
        !sessionData.error ? (sessionData?.accessToken as string) : ""
      );
    }
  }, [sessionData]);

  useEffect(() => {
    setAuthLoading(sessionStatus === "loading");
  }, [sessionStatus]);

  useEffect(() => {
    if (authUserError) {
      setAuthError(!!authUserError);
    }
  }, [authUserError]);

  return (
    <AuthContext.Provider
      value={{
        authUser,
        setAuthUser,
        accessToken,
        setAccessToken,
        authError,
        authLoading,
        triggerAuthUserAPI,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { useAuthContext };
export default AuthContextProvider;
