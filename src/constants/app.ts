import LikeIcon from "@mui/icons-material/ThumbUpOffAlt";
import LoveIcon from "@mui/icons-material/FavoriteBorder";
import LaughIcon from "@mui/icons-material/InsertEmoticon";
import SadIcon from "@mui/icons-material/SentimentVeryDissatisfied";
import SupportIcon from "@mui/icons-material/VolunteerActivism";
import LikeActiveIcon from "@mui/icons-material/ThumbUpAltTwoTone";
import LoveActiveIcon from "@mui/icons-material/FavoriteTwoTone";
import LaughActiveIcon from "@mui/icons-material/InsertEmoticonTwoTone";
import SadActiveIcon from "@mui/icons-material/SentimentDissatisfiedTwoTone";
import SupportActiveIcon from "@mui/icons-material/VolunteerActivismTwoTone";
import { IReactionTypes, IUserImageType } from "../interfaces/api/external";
import { IImageSelectorAttrib, IReactionConfig } from "../interfaces/app";
import Home from "../pages";
import Profile from "../pages/profile/[id]";
import Search from "../pages/search";
import MyNetwork from "../pages/my-network";
import SignInPage from "../pages/sign-in";
import AboutUsPage from "../pages/about-us";
import NotificationsPage from "../pages/notifications";
import PrivacyPolicyPage from "../pages/legal/privacy-policy";
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
  NOTIFICATIONS: {
    route: "/notifications",
    key: "notifications",
    skeleton: NotificationsPage.Skeleton,
  },
  LEGAL_PRIVACY_POLICY: {
    route: "/legal/privacy-policy",
    key: "legal-privacy-policy",
    skeleton: PrivacyPolicyPage.Skeleton,
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

export const MAX_SEARCH_DROPDOWN_LIMIT = 5;

export const MAX_NOTIFICATION_BADGE_LIMIT = 99;
export const FETCH_NOTIFICATION_INTERVAL_MS = 2 * 60 * 1000;

export const NOTIFICATION_PAGINATION_LIMIT = 10;
export const FEEDS_PAGINATION_LIMIT = 15;
export const GET_POST_REACTION_PAGINATION_LIMIT = 10;
export const GET_COMMENT_REACTION_PAGINATION_LIMIT = 10;

export const URL_MATCH_REGEX_WITH_PROTOCOL = new RegExp(
  /(https?:\/\/)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/g
);

export const URL_MATCH_REGEX_WITHOUT_PROTOCOL = new RegExp(
  /^(!https?:\/\/)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/g
);

export const UUID_REGEX_STRING =
  "[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}";

export const HASHTAG_REGEX = new RegExp(/#(\w+)/g);

export const REACTION_CONFIGS: Record<IReactionTypes, IReactionConfig> = {
  love: {
    label: LABELS.LOVE,
    icon: LoveIcon,
    iconActive: LoveActiveIcon,
    reactionPretext: LABELS.REACTION_PRETEXT_LOVE,
  },
  like: {
    label: LABELS.LIKE,
    icon: LikeIcon,
    iconActive: LikeActiveIcon,
    reactionPretext: LABELS.REACTION_PRETEXT_LIKE,
  },
  laugh: {
    label: LABELS.LAUGH,
    icon: LaughIcon,
    iconActive: LaughActiveIcon,
    reactionPretext: LABELS.REACTION_PRETEXT_LAUGH,
  },
  support: {
    label: LABELS.SUPPORT,
    icon: SupportIcon,
    iconActive: SupportActiveIcon,
    reactionPretext: LABELS.REACTION_PRETEXT_SUPPORT,
  },
  sad: {
    label: LABELS.SAD,
    icon: SadIcon,
    iconActive: SadActiveIcon,
    reactionPretext: LABELS.REACTION_PRETEXT_SAD,
  },
};
