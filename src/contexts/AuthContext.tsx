import { useSession } from "next-auth/react";
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
import { IAuthUserApiResponse } from "../interfaces/api/external";

interface IAuthContextProps {
  user?: IAuthUserApiResponse;
  accessToken?: string;
  setUser?: SetStateAction<Dispatch<IAuthUserApiResponse>>;
  setAccessToken?: SetStateAction<Dispatch<string>>;
}

const AuthContext = createContext<IAuthContextProps>({});

const useAuthContext = (): IAuthContextProps => {
  return useContext(AuthContext);
};

const AuthContextProvider: React.FC = ({ children }) => {
  const { data: authData, status: authStatus } = useSession();
  const { data: authUserData, error: authUserError } = useQuery(
    API_ENDPOINTS.AUTH_USER.key,
    () =>
      fetchAuthUser(authData?.accessToken as string).then((res) => res.data),
    {
      // Cache API response for upto 3 minutes
      cacheTime: 1000 * 60 * 3,
      retry: 2,
      retryDelay: 1000,
      enabled: Boolean(authData) && authStatus !== "loading",
    }
  );

  const [user, setUser] = useState<IAuthUserApiResponse>();
  const [accessToken, setAccessToken] = useState<string>();

  useEffect(() => {
    if (authUserData) {
      console.log(authUserData);
      setUser(authUserData);
    }
  }, [authUserData]);

  return (
    <AuthContext.Provider
      value={{ user, setUser, accessToken, setAccessToken }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { useAuthContext };
export default AuthContextProvider;
