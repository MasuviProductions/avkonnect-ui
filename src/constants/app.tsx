import { IUserImageType } from "../interfaces/api/external";
import { IImageSelectorAttrib } from "../interfaces/app";
import Home from "../pages";
import Profile from "../pages/profile/[id]";
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
