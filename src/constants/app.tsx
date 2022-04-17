import { IUserImageType } from "../interfaces/api/external";
import { IImageSelectorAttrib } from "../interfaces/app";
import Home from "../pages";
import Profile from "../pages/profile/[id]";
import Search from "../pages/search";
import { LABELS } from "./labels";
import { useUserContext } from "../contexts/UserContext";
import { IUserProfileModalTypes } from "../contexts/UserProfileModalContext";

export const APP_ROUTES = {
  ROOT: {
    route: "/",
    key: "home",
    skeleton: <Home.Skeleton />,
  },
  PROFILE: {
    route: "/profile/:id",
    key: "profile",
    skeleton: <Profile.Skeleton />,
  },
  SIGN_IN: {
    route: "/sign-in",
    key: "sign-in",
    skeleton: <></>,
  },
  SEARCH: {
    route: "/search\\?key=:key",
    key: "search",
    skeleton: <Search.Skeleton />,
  },
};

export const USER_IMAGE_SELECTOR_ATTRIBUTES: Record<
  IUserImageType,
  IImageSelectorAttrib
> = {
  display_picture: {
    aspectRatio: 1 / 1,
    label: LABELS.DISPLAY_PICTURE_CROPPER_TITLE,
    fitType: "vertical-cover",
  },
  background_image: {
    aspectRatio: 4 / 1,
    label: LABELS.BACKGROUND_IMAGE_CROPPER_TITLE,
    fitType: "horizontal-cover",
  },
};

export const UserProfileProgressSteps = () => {
  const { user } = useUserContext();

  const USER_PROFILE_PROGRESS_STEPS = [
    {
      USER_PROGRESS_LABEL: LABELS.USER_PROFILE_PROGRESS_PROFILE_STEP_LABEL,
      USER_PROGRESS_INFO: LABELS.USER_PROFILE_PROGRESS_PROFILE_STEP_INFO,
      USER_PROGRESS_STATUS_VAL:
        user?.profileStatus?.isUserProfileDetailsComplete,
      USER_PROGRESS_SKIPPABLE: false,
      USER_PROGRESS_MODAL: "userProfileInfoCardModal" as IUserProfileModalTypes,
    },
    {
      USER_PROGRESS_LABEL: LABELS.USER_PROFILE_PROGRESS_ABOUT_STEP_LABEL,
      USER_PROGRESS_INFO: LABELS.USER_PROFILE_PROGRESS_ABOUT_STEP_INFO,
      USER_PROGRESS_STATUS_VAL: user?.profileStatus?.isAboutUserAddComplete,
      USER_PROGRESS_SKIPPABLE: false,
      USER_PROGRESS_MODAL: "aboutCardModal" as IUserProfileModalTypes,
    },
    {
      USER_PROGRESS_LABEL: LABELS.USER_PROFILE_PROGRESS_SKILL_STEP_LABEL,
      USER_PROGRESS_INFO: LABELS.USER_PROFILE_PROGRESS_SKILL_STEP_INFO,
      USER_PROGRESS_STATUS_VAL: user?.profileStatus?.isSkillAddComplete,
      USER_PROGRESS_SKIPPABLE: false,
      USER_PROGRESS_MODAL: "skillsCardModal" as IUserProfileModalTypes,
    },
    {
      USER_PROGRESS_LABEL: LABELS.USER_PROFILE_PROGRESS_EXPERIENCE_STEP_LABEL,
      USER_PROGRESS_INFO: LABELS.USER_PROFILE_PROGRESS_EXPERIENCE_STEP_INFO,
      USER_PROGRESS_STATUS_VAL: user?.profileStatus?.isExperienceAddComplete,
      USER_PROGRESS_SKIPPABLE: false,
      USER_PROGRESS_MODAL: "experiencesCardModal" as IUserProfileModalTypes,
    },
    {
      USER_PROGRESS_LABEL: LABELS.USER_PROFILE_PROGRESS_PROJECT_STEP_LABEL,
      USER_PROGRESS_INFO: LABELS.USER_PROFILE_PROGRESS_PROJECT_STEP_INFO,
      USER_PROGRESS_STATUS_VAL: user?.profileStatus?.isProjectAddComplete,
      USER_PROGRESS_SKIPPABLE: true,
      USER_PROGRESS_MODAL: "projectsCardModal" as IUserProfileModalTypes,
    },
    {
      USER_PROGRESS_LABEL: LABELS.USER_PROFILE_PROGRESS_CERTIFICATE_STEP_LABEL,
      USER_PROGRESS_INFO: LABELS.USER_PROFILE_PROGRESS_CERTIFICATE_STEP_INFO,
      USER_PROGRESS_STATUS_VAL: user?.profileStatus?.isCertificationAddComplete,
      USER_PROGRESS_SKIPPABLE: true,
      USER_PROGRESS_MODAL: "certificatesCardModal" as IUserProfileModalTypes,
    },
  ];

  return USER_PROFILE_PROGRESS_STEPS;
};

export const SKILL_ELLIPSE_LIMIT = 3;
export const MAX_SKILL_LIMIT = 10;

export const PROJECTS_ELLIPSE_LIMIT = 2;
export const MAX_PROJECTS_LIMIT = 8;

export const EXPERIENCES_ELLIPSE_LIMIT = 2;
export const MAX_EXPERIENCES_LIMIT = 8;

export const CERTIFICATIONS_ELLIPSE_LIMIT = 2;
export const MAX_CERTIFICATIONS_LIMIT = 8;

export const MAX_DATE = 8640000000000000;

export const MAX_SEARCH_DROPDOWN_LIMIT = 5;

export const URL_MATCH_REGEX_WITH_PROTOCOL = new RegExp(
  /(https?:\/\/)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/g
);

export const URL_MATCH_REGEX_WITHOUT_PROTOCOL = new RegExp(
  /^(!https?:\/\/)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/g
);
