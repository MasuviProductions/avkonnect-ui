import { ThemeOptions } from "@mui/material";
import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import { useQuery } from "react-query";
import API_ENDPOINTS from "../constants/api";
import { LABELS } from "../constants/labels";
import { patchUserSettings, getUserSettings } from "../utils/api";
import { useAuthContext } from "./AuthContext";
import { useSnackbarContext } from "./SnackbarContext";
export type IUserSettingsDisplayOption = "light" | "dark";

export interface IUserSettingsDisplay {
  theme: IUserSettingsDisplayOption;
}

export type IUserSettingsPrivacyOption =
  | "public"
  | "connectionsOnly"
  | "private";

export interface IUserSettingsPrivacy {
  location: IUserSettingsPrivacyOption;
  dateOfBirth: IUserSettingsPrivacyOption;
  gender: IUserSettingsPrivacyOption;
  profilePhotos: IUserSettingsPrivacyOption;
  email: IUserSettingsPrivacyOption;
  phone: IUserSettingsPrivacyOption;
}
export type IUserSettingsCommunicationsOption =
  | "all"
  | "emailPrompt"
  | "phonePrompt"
  | "messagePrompt";

export interface IUserSettingsCommunications {
  connectionInvite: IUserSettingsCommunicationsOption;
}
export interface IUserSettingsVisibility {
  activeStatus: IUserSettingsPrivacyOption;
  userBlockingInfo: Array<string>;
}
export interface IUserFeedPreferences {
  recentOnly: boolean;
  favourites: Array<string>;
}
export interface IUserSettings {
  id: string;
  display: IUserSettingsDisplay;
  privacy: IUserSettingsPrivacy;
  visibility: IUserSettingsVisibility;
  communications: IUserSettingsCommunications;
  updatedAt?: Date;
  feedPreference: IUserFeedPreferences;
}

export type IFieldOperationValue = "addition" | "deletion";

export interface ISettingsUpdateDetail {
  fieldName: string;
  fieldKey: string;
  fieldValue: string | boolean;
  fieldOperation?: IFieldOperationValue;
}
interface IUserSettingsProps {
  userSettings: IUserSettings;
  setUpdatedSettings: Dispatch<
    SetStateAction<ISettingsUpdateDetail | undefined>
  >;
  onThemeSelect: (selectedTheme: ThemeOptions) => void;
  triggerGetUserSettingsApi: () => void;
  isUpdatingUserSettings: boolean;
}

const defaultUserValues: IUserSettings = {
  id: "",
  display: { theme: "light" },
  privacy: {
    location: "public",
    dateOfBirth: "private",
    gender: "private",
    profilePhotos: "public",
    email: "public",
    phone: "public",
  },
  visibility: {
    activeStatus: "public",
    userBlockingInfo: [],
  },
  communications: {
    connectionInvite: "all",
  },
  feedPreference: {
    favourites: [],
    recentOnly: false,
  },
};

const UserSettingsContext = createContext<IUserSettingsProps>({
  userSettings: defaultUserValues,
  setUpdatedSettings: () => {},
  onThemeSelect: () => {},
  triggerGetUserSettingsApi: () => {},
  isUpdatingUserSettings: true,
});

const useUserSettingsContext = (): IUserSettingsProps => {
  return useContext(UserSettingsContext);
};

const UserSettingsContextProvider: React.FC<IUserSettingsProps> = ({
  children,
  onThemeSelect,
}) => {
  const { authUser, accessToken } = useAuthContext();
  const { setSnackbar } = useSnackbarContext();

  const [userSettings, setUserSettings] =
    useState<IUserSettings>(defaultUserValues);
  const [updatedSettings, setUpdatedSettings] =
    useState<ISettingsUpdateDetail>();

  const {
    data: getUserSettingsData,
    error: getUserSettingsError,
    refetch: triggerGetUserSettingsApi,
  } = useQuery(
    `GET:${API_ENDPOINTS.USER_SETTINGS.key}:${authUser?.id}`,
    () => getUserSettings(accessToken as string, authUser?.id as string),
    { refetchOnWindowFocus: false }
  );

  const {
    data: patchUserSettingsData,
    error: patchUserSettingsError,
    refetch: triggerPatchUserSettingsApi,
    isRefetching: isUpdatingUserSettings,
  } = useQuery(
    `PATCH:${API_ENDPOINTS.USER_SETTINGS.key}:${authUser?.id}`,
    () =>
      patchUserSettings(accessToken as string, authUser?.id as string, [
        updatedSettings as ISettingsUpdateDetail,
      ]),
    { refetchOnWindowFocus: false, enabled: false }
  );

  useEffect(() => {
    if (updatedSettings) triggerPatchUserSettingsApi();
  }, [triggerPatchUserSettingsApi, updatedSettings]);

  useEffect(() => {
    if (getUserSettingsError) {
      setSnackbar?.(() => ({
        message: LABELS.SETTINGS_LOAD_FAIL,
        messageType: "error",
      }));
    }
  }, [getUserSettingsError, setSnackbar]);

  useEffect(() => {
    if (patchUserSettingsError) {
      setSnackbar?.(() => ({
        message: LABELS.SETTINGS_UPDATE_FAIL,
        messageType: "error",
      }));
    }
  }, [patchUserSettingsError, setSnackbar]);

  useEffect(() => {
    if (getUserSettingsData?.data) {
      setUserSettings(getUserSettingsData?.data);
    }
  }, [getUserSettingsData?.data]);

  useEffect(() => {
    if (patchUserSettingsData?.data) {
      setUserSettings(patchUserSettingsData?.data);
    }
  }, [patchUserSettingsData?.data]);

  return (
    <UserSettingsContext.Provider
      value={{
        userSettings: userSettings as IUserSettings,
        setUpdatedSettings: setUpdatedSettings,
        onThemeSelect: onThemeSelect,
        triggerGetUserSettingsApi: triggerGetUserSettingsApi,
        isUpdatingUserSettings: isUpdatingUserSettings,
      }}
    >
      {children}
    </UserSettingsContext.Provider>
  );
};

export { useUserSettingsContext };
export default UserSettingsContextProvider;
