import { Session } from "next-auth";
import { getSession } from "next-auth/react";
import { URLSearchParams } from "url";

export const getQueryStringParams = (url: string): URLSearchParams => {
  const params = new URL(url).searchParams;
  return params;
};

export const handleServerSideAuthenticationRedirect = async (
  context: any,
  onSSRProps: (session: Session) => {}
) => {
  const session = await getSession(context);

  if (!session)
    return {
      redirect: {
        destination: "/sign-in",
        permanent: false,
      },
    };
  return onSSRProps(session);
};
