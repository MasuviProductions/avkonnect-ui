import { Box, Button, Grid, Select, Theme, Typography } from "@mui/material";
import { SxProps } from "@mui/system";
import ArrowForwardIcon from "@mui/icons-material/ArrowForwardIos";
import LayoutCard from "../../components/LayoutCard";
import { LABELS } from "../../constants/labels";
import { ReactFCWithSkeleton } from "../../interfaces/app";
import SettingsSkeleton from "./SettingsSkeleton";
import { useEffect, useState } from "react";
import BlockingModal from "./BlockingModal";
import {
  IUserSettingsCommunicationsOption,
  IUserSettingsPrivacyOption,
  useUserSettingsContext,
  IFieldOperationValue,
} from "../../contexts/UserSettingsContext";
import { THEMES_LIST } from "../../constants/theme";
import Switch from "@mui/material/Switch";
import MenuItem from "@mui/material/MenuItem";
import FavoritesModal from "./FavoritesModal";
import { IUserAvatarApiModel } from "../../interfaces/api/external";
import API_ENDPOINTS from "../../constants/api";
import { useQuery } from "react-query";
import { getUsersInfo } from "../../utils/api";
import { useAuthContext } from "../../contexts/AuthContext";

const privacyOptions: {
  key: IUserSettingsPrivacyOption;
  value: string;
}[] = [
  { key: "public", value: "Public" },
  { key: "connectionsOnly", value: "Connections Only" },
  { key: "private", value: "Private" },
];
const communicationsOptions: {
  key: IUserSettingsCommunicationsOption;
  value: string;
}[] = [
  { key: "all", value: "All" },
  { key: "emailPrompt", value: "Email Prompt" },
  { key: "phonePrompt", value: "Phone Prompt" },
  { key: "messagePrompt", value: "Message Prompt" },
];

const Settings: ReactFCWithSkeleton = () => {
  const {
    userSettings,
    setUpdatedSettings,
    onThemeSelect,
    triggerGetUserSettingsApi,
    isUpdatingUserSettings,
  } = useUserSettingsContext();
  const { authUser, accessToken } = useAuthContext();

  // useEffect(() => {
  //   triggerGetUserSettingsApi();
  // }, []);

  useEffect(() => {
    setDarkMode(userSettings?.display?.theme === "dark");
    setLocation(userSettings?.privacy?.location);
    setDateOfBirth(userSettings?.privacy?.dateOfBirth);
    setGender(userSettings?.privacy?.gender);
    setProfilePhotos(userSettings?.privacy?.profilePhotos);
    setEmail(userSettings?.privacy?.email);
    setPhone(userSettings?.privacy?.phone);
    setActiveStatus(userSettings?.visibility?.activeStatus);
    setBlockedUserIds(userSettings?.visibility?.userBlockingInfo);
    setConnectionInvite(userSettings?.communications?.connectionInvite);
    setRecentOnly(userSettings?.feedPreference?.recentOnly as boolean);
    setFavoriteUserIds(userSettings?.feedPreference?.favourites);
  }, [userSettings]);

  const { data: getBlockedUsersData, refetch: triggerGetBlockedUsersApi } =
    useQuery(`${API_ENDPOINTS.USER_SETTINGS.key}:blocked`, () =>
      getUsersInfo(accessToken as string, blockedUserIds as string[])
    );

  const [blockedUserIds, setBlockedUserIds] = useState<string[]>(
    userSettings?.visibility?.userBlockingInfo
  );
  const [blockedUsers, setBlockedUsers] = useState<IUserAvatarApiModel[]>(
    getBlockedUsersData?.data as IUserAvatarApiModel[]
  );

  const handleBlockUnblockUsers = (
    user: IUserAvatarApiModel,
    operation: IFieldOperationValue
  ) => {
    const patchSettings = {
      fieldName: "visibility",
      fieldKey: "userBlockingInfo",
      fieldValue: user.id,
      fieldOperation: operation,
    };
    setUpdatedSettings(patchSettings);
  };

  useEffect(() => {
    triggerGetBlockedUsersApi();
  }, [blockedUserIds, triggerGetBlockedUsersApi]);

  useEffect(() => {
    setBlockedUsers(getBlockedUsersData?.data as IUserAvatarApiModel[]);
  }, [getBlockedUsersData?.data]);

  const {
    data: getFavoriteUsersData,
    refetch: triggerGetFavoriteUsersApi,
    isFetching: isLoadingFavoriteUsers,
  } = useQuery(`${API_ENDPOINTS.USER_SETTINGS.key}:favourite`, () =>
    getUsersInfo(accessToken as string, favoriteUserIds as string[])
  );

  const [favoriteUserIds, setFavoriteUserIds] = useState<string[]>(
    userSettings?.feedPreference?.favourites
  );
  const [favoriteUsers, setFavoriteUsers] = useState<IUserAvatarApiModel[]>(
    getFavoriteUsersData?.data as IUserAvatarApiModel[] // getUsersByID(userSettings?.visibility?.userBlockingInfo)
  );

  const handleFavoriteUnfavoriteUsers = (
    user: IUserAvatarApiModel,
    operation: IFieldOperationValue
  ) => {
    const patchSettings = {
      fieldName: "feedPreference",
      fieldKey: "favourites",
      fieldValue: user.id,
      fieldOperation: operation,
    };
    setUpdatedSettings(patchSettings);
  };

  useEffect(() => {
    triggerGetFavoriteUsersApi();
  }, [favoriteUserIds, triggerGetFavoriteUsersApi]);

  useEffect(() => {
    setFavoriteUsers(getFavoriteUsersData?.data as IUserAvatarApiModel[]);
  }, [getFavoriteUsersData?.data]);

  const [darkMode, setDarkMode] = useState<boolean>(
    userSettings?.display?.theme === "dark"
  );
  const handleThemeSwitch = (event: any) => {
    setDarkMode(event.target.checked);
    onThemeSelect(event.target.checked ? THEMES_LIST[1] : THEMES_LIST[0]);
    const patchSettings = {
      fieldName: "display",
      fieldKey: "theme",
      fieldValue: (event.target.checked
        ? THEMES_LIST[1].key
        : THEMES_LIST[0].key) as string,
    };
    setUpdatedSettings(patchSettings);
  };
  const [location, setLocation] = useState<IUserSettingsPrivacyOption>(
    userSettings?.privacy?.location
  );
  const handleChangeLocationPrivacy = (event: any) => {
    setLocation(event.target.value);
    const patchSettings = {
      fieldName: "privacy",
      fieldKey: "location",
      fieldValue: event.target.value as string,
    };
    setUpdatedSettings(patchSettings);
  };
  const [dateOfBirth, setDateOfBirth] = useState<IUserSettingsPrivacyOption>(
    userSettings?.privacy?.dateOfBirth
  );
  const handleChangeDateOfBirthPrivacy = (event: any) => {
    setDateOfBirth(event.target.value);
    const patchSettings = {
      fieldName: "privacy",
      fieldKey: "dateOfBirth",
      fieldValue: event.target.value as string,
    };
    setUpdatedSettings(patchSettings);
  };
  const [gender, setGender] = useState<IUserSettingsPrivacyOption>(
    userSettings?.privacy?.gender
  );
  const handleChangeGenderPrivacy = (event: any) => {
    setGender(event.target.value);
    const patchSettings = {
      fieldName: "privacy",
      fieldKey: "gender",
      fieldValue: event.target.value as string,
    };
    setUpdatedSettings(patchSettings);
  };
  const [profilePhotos, setProfilePhotos] =
    useState<IUserSettingsPrivacyOption>(userSettings?.privacy?.profilePhotos);
  const handleChangeProfilePhotosPrivacy = (event: any) => {
    setProfilePhotos(event.target.value);
    const patchSettings = {
      fieldName: "privacy",
      fieldKey: "profilePhotos",
      fieldValue: event.target.value as string,
    };
    setUpdatedSettings(patchSettings);
  };
  const [email, setEmail] = useState<IUserSettingsPrivacyOption>(
    userSettings?.privacy?.email
  );
  const handleChangeEmailPrivacy = (event: any) => {
    setEmail(event.target.value);
    const patchSettings = {
      fieldName: "privacy",
      fieldKey: "email",
      fieldValue: event.target.value as string,
    };
    setUpdatedSettings(patchSettings);
  };
  const [phone, setPhone] = useState<IUserSettingsPrivacyOption>(
    userSettings?.privacy?.phone
  );
  const handleChangePhonePrivacy = (event: any) => {
    setPhone(event.target.value);
    const patchSettings = {
      fieldName: "privacy",
      fieldKey: "phone",
      fieldValue: event.target.value as string,
    };
    setUpdatedSettings(patchSettings);
  };
  const [activeStatus, setActiveStatus] = useState<IUserSettingsPrivacyOption>(
    userSettings?.visibility?.activeStatus
  );
  const handleChangeActiveStatus = (event: any) => {
    setActiveStatus(event.target.value);
    const patchSettings = {
      fieldName: "visibility",
      fieldKey: "activeStatus",
      fieldValue: event.target.value as string,
    };
    setUpdatedSettings(patchSettings);
  };
  const [connectionInvite, setConnectionInvite] =
    useState<IUserSettingsCommunicationsOption>(
      userSettings?.communications?.connectionInvite
    );
  const handleChangeConnectionInvite = (event: any) => {
    setConnectionInvite(event.target.value);
    const patchSettings = {
      fieldName: "communications",
      fieldKey: "connectionInvite",
      fieldValue: event.target.value as string,
    };
    setUpdatedSettings(patchSettings);
  };

  const [recentOnly, setRecentOnly] = useState<boolean>(
    userSettings?.feedPreference?.recentOnly as boolean
  );
  const handleRecentSwitch = (event: any) => {
    setRecentOnly(event.target.checked);
    const patchSettings = {
      fieldName: "feedPreference",
      fieldKey: "recentOnly",
      fieldValue: event.target.checked,
    };
    setUpdatedSettings(patchSettings);
  };

  const [showBlockingModal, setShowBlockingModal] = useState<boolean>(false);

  const handleBlockingModalOpen = () => {
    triggerGetUserSettingsApi();
    setShowBlockingModal(true);
  };
  const handleBlockingModalClose = () => {
    setShowBlockingModal(false);
  };

  const [showFavoritesModal, setShowFavoritesModal] = useState<boolean>(false);

  const handleFavoritesModalOpen = () => {
    triggerGetUserSettingsApi();
    setShowFavoritesModal(true);
  };
  const handleFavoritesModalClose = () => {
    setShowFavoritesModal(false);
  };

  const settingItems = [
    {
      header: LABELS.SETTINGS_DISPLAY,
      fields: [
        {
          title: LABELS.SETTINGS_THEME,
          description: LABELS.SETTINGS_THEME_DESCRIPTION,
          uiElement: (
            <Switch
              checked={darkMode}
              onChange={handleThemeSwitch}
              inputProps={{ "aria-label": "controlled" }}
            />
          ),
        },
      ],
    },
    {
      header: LABELS.SETTINGS_PRIVACY,
      fields: [
        {
          title: LABELS.SETTINGS_LOCATION,
          description: LABELS.SETTINGS_LOCATION_DESCRIPTION,
          uiElement: (
            <Select
              size="small"
              id={LABELS.SETTINGS_LOCATION}
              value={location}
              onChange={handleChangeLocationPrivacy}
            >
              {privacyOptions.map((option, i) => (
                <MenuItem value={option.key} key={option.key}>
                  {option.value}
                </MenuItem>
              ))}
            </Select>
          ),
        },
        {
          title: LABELS.SETTINGS_DOB,
          description: LABELS.SETTINGS_DOB_DESCRIPTION,
          uiElement: (
            <Select
              size="small"
              id={LABELS.SETTINGS_DOB}
              value={dateOfBirth}
              onChange={handleChangeDateOfBirthPrivacy}
            >
              {privacyOptions.map((option, i) => (
                <MenuItem value={option.key} key={option.key}>
                  {option.value}
                </MenuItem>
              ))}
            </Select>
          ),
        },
        {
          title: LABELS.SETTINGS_GENDER,
          description: LABELS.SETTINGS_GENDER_DESCRIPTION,
          uiElement: (
            <Select
              size="small"
              id={LABELS.SETTINGS_GENDER}
              value={gender}
              onChange={handleChangeGenderPrivacy}
            >
              {privacyOptions.map((option, i) => (
                <MenuItem value={option.key} key={option.key}>
                  {option.value}
                </MenuItem>
              ))}
            </Select>
          ),
        },
        {
          title: LABELS.SETTINGS_PROFILE_PHOTO,
          description: LABELS.SETTINGS_PROFILE_PHOTO_DESCRIPTION,
          uiElement: (
            <Select
              size="small"
              id={LABELS.SETTINGS_PROFILE_PHOTO}
              value={profilePhotos}
              onChange={handleChangeProfilePhotosPrivacy}
            >
              {privacyOptions.map((option, i) => (
                <MenuItem value={option.key} key={option.key}>
                  {option.value}
                </MenuItem>
              ))}
            </Select>
          ),
        },
        {
          title: LABELS.SETTINGS_EMAIL,
          description: LABELS.SETTINGS_EMAIL_DESCRIPTION,
          uiElement: (
            <Select
              size="small"
              id={LABELS.SETTINGS_EMAIL}
              value={email}
              onChange={handleChangeEmailPrivacy}
            >
              {privacyOptions.map((option, i) => (
                <MenuItem value={option.key} key={option.key}>
                  {option.value}
                </MenuItem>
              ))}
            </Select>
          ),
        },
        {
          title: LABELS.SETTINGS_PHONE_NO,
          description: LABELS.SETTINGS_PHONE_NO_DESCRIPTION,
          uiElement: (
            <Select
              size="small"
              id={LABELS.SETTINGS_PHONE_NO}
              value={phone}
              onChange={handleChangePhonePrivacy}
            >
              {privacyOptions.map((option, i) => (
                <MenuItem value={option.key} key={option.key}>
                  {option.value}
                </MenuItem>
              ))}
            </Select>
          ),
        },
      ],
    },
    {
      header: LABELS.SETTINGS_VISIBILITY,
      fields: [
        {
          title: LABELS.SETTINGS_ACTIVE_STATUS,
          description: LABELS.SETTINGS_ACTIVE_STATUS_DESCRIPTION,
          uiElement: (
            <Select
              size="small"
              id={LABELS.SETTINGS_ACTIVE_STATUS}
              value={activeStatus}
              onChange={handleChangeActiveStatus}
            >
              {privacyOptions.map((option, i) => (
                <MenuItem value={option.key} key={option.key}>
                  {option.value}
                </MenuItem>
              ))}
            </Select>
          ),
        },
        {
          title: LABELS.SETTINGS_BLOCKING_INFO,
          description: LABELS.SETTINGS_BLOCKING_INFO_DESCRIPTION,
          uiElement: (
            <Button onClick={handleBlockingModalOpen}>
              {LABELS.SETTINGS_BLOCK_UNBLOCK_USERS}
              <ArrowForwardIcon />
            </Button>
          ),
        },
      ],
    },
    {
      header: LABELS.SETTINGS_COMMUNICATIONS,
      fields: [
        {
          title: LABELS.SETTINGS_CONNECTION_INVITE,
          description: LABELS.SETTINGS_CONNECTION_INVITE_DESCRIPTION,
          uiElement: (
            <Select
              size="small"
              id={LABELS.SETTINGS_CONNECTION_INVITE}
              value={connectionInvite}
              onChange={handleChangeConnectionInvite}
            >
              {communicationsOptions.map((option, i) => (
                <MenuItem value={option.key} key={option.key}>
                  {option.value}
                </MenuItem>
              ))}
            </Select>
          ),
        },
      ],
    },
    {
      header: LABELS.SETTINGS_FEED_PREFERENCES,
      fields: [
        {
          title: LABELS.SETTINGS_RECENT_ONLY,
          description: LABELS.SETTINGS_RECENT_ONLY_DESCRIPTION,
          uiElement: (
            <Switch
              checked={recentOnly}
              onChange={handleRecentSwitch}
              inputProps={{ "aria-label": "controlled" }}
            />
          ),
        },
        // {
        //   title: LABELS.SETTINGS_FAVORITES,
        //   description: LABELS.SETTINGS_FAVORITES_DESCRIPTION,
        //   uiElement: (
        //     <Button onClick={handleFavoritesModalOpen}>
        //       {LABELS.SETTINGS_ADD_REMOVE_USERS}
        //       <ArrowForwardIcon />
        //     </Button>
        //   ),
        // },
      ],
    },
  ];

  return (
    <>
      <Box mt={4}>
        <LayoutCard>
          <Grid container>
            <Grid item xs={12} m={1} p={1}>
              <Typography variant="h4">{LABELS.SETTINGS_HEADER}</Typography>
              {settingItems.map((settingsItem, i) => (
                <Grid key={i} item xs={12} mt={2}>
                  <Typography sx={titleSx} variant="h5">
                    {settingsItem.header}
                  </Typography>
                  {settingsItem.fields.map((field, j) => (
                    <Grid item key={j} sx={subTitleSx} xs={12} mt={2}>
                      <Grid item>
                        <Typography variant="body1">{field.title}</Typography>
                        <Typography variant="caption" color="text.secondary">
                          {field.description}
                        </Typography>
                      </Grid>
                      <Grid item sx={UIElementSx}>
                        {field.uiElement}
                      </Grid>
                    </Grid>
                  ))}
                </Grid>
              ))}
            </Grid>
          </Grid>
        </LayoutCard>
      </Box>

      {showBlockingModal && (
        <>
          <BlockingModal
            isLoading={isUpdatingUserSettings}
            blockedUsers={blockedUsers}
            handleAddRemoveUsers={handleBlockUnblockUsers}
            showModal={showBlockingModal}
            onModalClose={handleBlockingModalClose}
          />
        </>
      )}
      {showFavoritesModal && (
        <>
          <FavoritesModal
            isLoading={isUpdatingUserSettings}
            favorites={favoriteUsers}
            handleAddRemoveUsers={handleFavoriteUnfavoriteUsers}
            showModal={showFavoritesModal}
            onModalClose={handleFavoritesModalClose}
          />
        </>
      )}
    </>
  );
};

const titleSx: SxProps<Theme> = (theme: Theme) => ({
  borderBottom: `2px solid ${theme.palette.secondary.dark}`,
});
const subTitleSx: SxProps<Theme> = (theme: Theme) => ({
  display: "flex",
  justifyContent: "space-between",
  flexDirection: "row",
});
const UIElementSx: SxProps<Theme> = (theme: Theme) => ({
  display: "flex",
  alignItems: "center",
});

Settings.Skeleton = SettingsSkeleton;

export default Settings;
