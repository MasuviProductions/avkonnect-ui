import { IUserImageType } from "../interfaces/api/external";
import { IImageSelectorAttrib } from "../interfaces/app";
import Home from "../pages";
import Profile from "../pages/profile/[id]";
import Search from "../pages/search";
import { LABELS } from "./labels";

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

export const SKILL_ELLIPSE_LIMIT = 3;
export const MAX_SKILL_LIMIT = 10;
export const SKILLS_LIST = [
  "Actor",
  "Director",
  "Script Writer",
  "Art Director",
  "Line Producer",
  "Associate Producer",
  "Executive Producer",
  "Producer",
  " Assistant Director",
  "VFX Director",
  "Editor",
  "Assistant Editor",
  "M Colorist",
];

export const PROJECTS_ELLIPSE_LIMIT = 2;
export const MAX_PROJECTS_LIMIT = 8;

export const MAX_DATE = 8640000000000000;

export const MAX_SEARCH_DROPDOWN_LIMIT = 5;
