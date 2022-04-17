import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

export interface IUserProfileModal {
  userProfileInfoCardModal: boolean;
  aboutCardModal: boolean;
  skillsCardModal: boolean;
  experiencesCardModal: boolean;
  projectsCardModal: boolean;
  certificatesCardModal: boolean;
}

export type IUserProfileModalTypes =
  | "userProfileInfoCardModal"
  | "aboutCardModal"
  | "skillsCardModal"
  | "experiencesCardModal"
  | "projectsCardModal"
  | "certificatesCardModal";

interface IUserProfileModalContext {
  profileModals: IUserProfileModal;
  toggleModal: (modalNameType: IUserProfileModalTypes) => void;
}

const defaultUserProfileModalValues: IUserProfileModal = {
  userProfileInfoCardModal: false,
  aboutCardModal: false,
  skillsCardModal: false,
  experiencesCardModal: false,
  projectsCardModal: false,
  certificatesCardModal: false,
};

const UserProfileModalContext = createContext<IUserProfileModalContext>({
  profileModals: defaultUserProfileModalValues,
  toggleModal: () => {},
});

const useUserProfileModalContext = (): IUserProfileModalContext => {
  const userProfileModalContext = useContext(UserProfileModalContext);
  return userProfileModalContext;
};

const UserProfileModalContextProvider: React.FC = ({ children }) => {
  const [profileModals, setProfileModals] = useState<IUserProfileModal>({
    userProfileInfoCardModal: false,
    aboutCardModal: false,
    skillsCardModal: false,
    experiencesCardModal: false,
    projectsCardModal: false,
    certificatesCardModal: false,
  });

  const toggleModal = useCallback((modalNameType: IUserProfileModalTypes) => {
    setProfileModals(prev => ({
      ...prev,
      [modalNameType]: !prev[modalNameType],
    }));
  }, []);

  return (
    <UserProfileModalContext.Provider
      value={{ profileModals: profileModals, toggleModal: toggleModal }}
    >
      {children}
    </UserProfileModalContext.Provider>
  );
};

export { useUserProfileModalContext };
export default UserProfileModalContextProvider;
