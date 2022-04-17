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
  dateOfBirth?: number;
  aboutUser: string;
  isAuthUser: boolean;
  gender: string;
  location: string;
}

interface IUserContext {
  user: IUser;
  profileStatus: IUserProfileStatus;
  setUser: Dispatch<SetStateAction<IUser>>;
  setProfileStatus: Dispatch<SetStateAction<IUserProfileStatus>>;
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
};

const defaultUserProfileStatus: IUserProfileStatus = {
  isUserProfileDetailsComplete: false,
  isAboutUserAddComplete: false,
  isProjectAddComplete: false,
  isSkillAddComplete: false,
  isExperienceAddComplete: false,
  isCertificationAddComplete: false,
};

const UserContext = createContext<IUserContext>({
  user: defaultUserValues,
  profileStatus: defaultUserProfileStatus,
  setUser: () => {},
  setProfileStatus: () => {},
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
  });

  const [profileStatus, setProfileStatus] = useState<IUserProfileStatus>({
    isUserProfileDetailsComplete: false,
    isAboutUserAddComplete: false,
    isProjectAddComplete: false,
    isSkillAddComplete: false,
    isExperienceAddComplete: false,
    isCertificationAddComplete: false,
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
    setProfileStatus(prev => ({
      ...prev,
      isAboutUserAddComplete: !!user.aboutUser,
    }));
  }, [user.aboutUser]);

  useEffect(() => {
    setProfileStatus(prev => ({
      ...prev,
      isUserProfileDetailsComplete:
        !!user.gender &&
        !!user.dateOfBirth &&
        !!user.headline &&
        !!user.location,
    }));
  }, [user.dateOfBirth, user.gender, user.headline, user.location]);

  return (
    <UserContext.Provider
      value={{
        user: user,
        profileStatus: profileStatus,
        setUser: setUser,
        setProfileStatus: setProfileStatus,
      }}
    >
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
