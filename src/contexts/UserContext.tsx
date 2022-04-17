import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import { useAuthContext } from "./AuthContext";

export interface IUserProfileStatus {
  isUserProfileDetailsComplete: boolean;
  isAboutUserAddComplete: boolean;
  isProjectAddComplete: boolean;
  isSkillAddComplete: boolean;
  isExperienceAddComplete: boolean;
  isCertificationAddComplete: boolean;
}

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
  gender: string;
  location: string;
  profileStatus: IUserProfileStatus;
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
  gender: "",
  location: "",
  profileStatus: {
    isUserProfileDetailsComplete: false,
    isAboutUserAddComplete: false,
    isProjectAddComplete: false,
    isSkillAddComplete: false,
    isExperienceAddComplete: false,
    isCertificationAddComplete: false,
  },
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
  location,
  gender,
  profileStatus,
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
    location,
    gender,
    profileStatus,
  });

  const { authUser, setAuthUser } = useAuthContext();

  useEffect(() => {
    if (authUser?.id === user.id && !user.isAuthUser) {
      setUser(prev => ({ ...prev, isAuthUser: true }));
    }
  }, [authUser?.id, user.id, user.isAuthUser]);

  useEffect(() => {
    if (user.isAuthUser && setAuthUser) {
      setAuthUser(prev =>
        prev
          ? {
              ...prev,
              name: user.name,
              headline: user.headline,
              displayPictureUrl: user.displayPictureUrl,
            }
          : undefined
      );
    }
  }, [user, setAuthUser]);

  useEffect(() => {
    if (user.aboutUser !== "") {
      setUser(prev => ({
        ...prev,
        profileStatus: { ...prev.profileStatus, isAboutUserAddComplete: true },
      }));
    }
  }, [user.aboutUser]);

  useEffect(() => {
    if (
      user.gender !== "" &&
      user.dateOfBirth !== 0 &&
      user.headline !== "" &&
      user.location !== ""
    ) {
      setUser(prev => ({
        ...prev,
        profileStatus: {
          ...prev.profileStatus,
          isUserProfileDetailsComplete: true,
        },
      }));
    }
  }, [user.dateOfBirth, user.gender, user.headline, user.location]);

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
