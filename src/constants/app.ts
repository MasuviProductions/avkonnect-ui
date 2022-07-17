import { IUserImageType } from "../interfaces/api/external";
import { IImageSelectorAttrib } from "../interfaces/app";
import Home from "../pages";
import Profile from "../pages/profile/[id]";
import Search from "../pages/search";
import MyNetwork from "../pages/my-network";
import SignInPage from "../pages/sign-in";
import AboutUsPage from "../pages/about-us";
import { LABELS } from "./labels";

export const SESSION_REFETCH_INTERVAL = 5 * 60;

export const APP_ROUTES = {
  ROOT: {
    route: "/",
    key: "home",
    skeleton: Home.Skeleton,
  },
  PROFILE: {
    route: "/profile/:id",
    key: "profile",
    skeleton: Profile.Skeleton,
  },
  SIGN_IN: {
    route: "/sign-in",
    key: "sign-in",
    skeleton: SignInPage.Skeleton,
  },
  SEARCH: {
    route: "/search\\?key=:key",
    key: "search",
    skeleton: Search.Skeleton,
  },
  ABOUT: {
    route: "/about-us",
    key: "about-us",
    skeleton: AboutUsPage.Skeleton,
  },
  MY_NETWORK: {
    route: "/my-network",
    key: "my-network",
    skeleton: MyNetwork.Skeleton,
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
