import { useRouter } from "next/router";
import { pathToRegexp } from "path-to-regexp";
import { memo, useEffect, useState } from "react";
import { APP_ROUTES } from "../../constants/app";

const WithPageSkeleton: React.FC<any> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [routeDestination, setRouteDestination] = useState("");
  const router = useRouter();

  useEffect(() => {
    router.events.on("routeChangeStart", (url) => {
      setRouteDestination(url);
      setIsLoading(true);
    });

    router.events.on("routeChangeComplete", () => {
      setIsLoading(false);
    });
  }, [router.events]);

  if (isLoading) {
    const routes = Object.values(APP_ROUTES);
    for (let index = 0; index < routes.length; index += 1) {
      const regexp = pathToRegexp(routes[index].route);
      if (regexp.exec(routeDestination)) {
        return routes[index].skeleton;
      }
    }
    return <>{children}</>;
  }

  return <>{children}</>;
};

export default memo(WithPageSkeleton);
