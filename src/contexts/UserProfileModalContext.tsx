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
  editModalType: (
    modalNameType: IUserProfileModalTypes,
    modalViewValue: boolean
  ) => void;
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
  editModalType: () => {},
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

  const editModalType = useCallback(
    (modalNameType: IUserProfileModalTypes, modalViewValue: boolean) => {
      setProfileModals(prev => ({
        ...prev,
        [modalNameType]: modalViewValue,
      }));
    },
    []
  );

  return (
    <UserProfileModalContext.Provider
      value={{ profileModals: profileModals, editModalType: editModalType }}
    >
      {children}
    </UserProfileModalContext.Provider>
  );
};

export { useUserProfileModalContext };
export default UserProfileModalContextProvider;
