import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import { useAuthContext } from "./AuthContext";

export interface IUser {
  id: string;
  displayPictureUrl: string;
  backgroundImageUrl: string;
  email: string;
  name: string;
  currentPosition: string;
  headline: string;
  dateOfBirth: number;
  aboutUser: string;
  isAuthUser: boolean;
}

interface IUserContext {
  user: IUser;
  setUser: Dispatch<SetStateAction<IUser>>;
}

const defaultUserValues: IUser = {
  id: "",
  displayPictureUrl: "",
  backgroundImageUrl: "",
  email: "",
  name: "",
  currentPosition: "",
  headline: "",
  dateOfBirth: 0,
  aboutUser: "",
  isAuthUser: false,
};

const UserContext = createContext<IUserContext>({
  user: defaultUserValues,
  setUser: () => {},
});

const UserContextProvider: React.FC<IUser> = ({
  children,
  id,
  displayPictureUrl,
  backgroundImageUrl,
  email,
  name,
  currentPosition,
  dateOfBirth,
  headline,
  aboutUser,
  isAuthUser,
}) => {
  const [user, setUser] = useState<IUser>({
    id,
    displayPictureUrl,
    backgroundImageUrl,
    email,
    name,
    currentPosition,
    headline,
    dateOfBirth,
    aboutUser,
    isAuthUser,
  });

  const { authUser } = useAuthContext();

  useEffect(() => {
    if (authUser?.id === user.id && !user.isAuthUser) {
      setUser((prev) => ({ ...prev, isAuthUser: true }));
    }
  }, [authUser?.id, user.id, user.isAuthUser]);

  return (
    <UserContext.Provider value={{ user: user, setUser: setUser }}>
      {children}
    </UserContext.Provider>
  );
};

const useUserContext = (): IUserContext => {
  const userContext = useContext(UserContext);
  return userContext;
};

export { useUserContext };
export default UserContextProvider;