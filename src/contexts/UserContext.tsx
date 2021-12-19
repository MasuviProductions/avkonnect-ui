import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from "react";

export interface IUser {
  displayPictureUrl: string;
  backgroundImageUrl: string;
  email: string;
  name: string;
  currentPosition: string;
  headline: string;
  dateOfBirth: number;
  aboutUser: string;
}

interface IUserContext {
  user: IUser;
  setUser: Dispatch<SetStateAction<IUser>>;
}

const defaultUserValues: IUser = {
  displayPictureUrl: "",
  backgroundImageUrl: "",
  email: "",
  name: "",
  currentPosition: "",
  headline: "",
  dateOfBirth: 0,
  aboutUser: "",
};

const UserContext = createContext<IUserContext>({
  user: defaultUserValues,
  setUser: () => {},
});

const UserContextProvider: React.FC<IUser> = ({
  children,
  displayPictureUrl,
  backgroundImageUrl,
  email,
  name,
  currentPosition,
  dateOfBirth,
  headline,
  aboutUser,
}) => {
  const [user, setUser] = useState<IUser>({
    displayPictureUrl,
    backgroundImageUrl,
    email,
    name,
    currentPosition,
    headline,
    dateOfBirth,
    aboutUser,
  });
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
