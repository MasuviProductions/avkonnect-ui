import Home from "../pages";
import Profile from "../pages/profile/[id]";

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
