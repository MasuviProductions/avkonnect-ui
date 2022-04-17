import NextAuth, { Session } from "next-auth";
import { JWT } from "next-auth/jwt";
import CognitoProvider from "next-auth/providers/cognito";
import API_ENDPOINTS from "../../../constants/api";
import ENV from "../../../constants/env";

const refreshAccessToken = async (token: JWT): Promise<JWT> => {
  try {
    if (!token.refreshToken) throw Error();

    const formPayload: Record<string, string> = {
      grant_type: "refresh_token",
      client_id: ENV.COGNITO_CLIENT_ID,
      client_secret: ENV.COGNITO_CLIENT_SECRET,
      refresh_token: token.refreshToken as string,
    };

    const urlEncodedformBody = Object.keys(formPayload)
      .map(
        (key) =>
          encodeURIComponent(key) + "=" + encodeURIComponent(formPayload[key])
      )
      .join("&");

    // Base 64 encode authentication string
    const authHeader = Buffer.from(
      process.env.COGNITO_CLIENT_ID + ":" + process.env.COGNITO_CLIENT_SECRET,
      "utf-8"
    ).toString("base64");

    const refreshedTokensResponse = await fetch(
      API_ENDPOINTS.COGNITO_TOKEN.url,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: "Basic " + authHeader,
        },
        method: "POST",
        body: urlEncodedformBody,
      }
    );

    const refreshedTokens = await refreshedTokensResponse.json();

    if (!refreshedTokensResponse.ok) {
      throw refreshedTokens;
    }

    const currentTime = Date.now();

    const newToken: JWT = {
      ...token,
      accessToken: refreshedTokens.access_token,
      accessTokenExpiresAt: currentTime + refreshedTokens.expires_in * 1000,
      // Fall back to old refresh token
      refreshToken: refreshedTokens.refresh_token ?? token.refreshToken,
    };

    return newToken;
  } catch (error) {
    return {
      ...token,
      error: "RefreshAccessTokenError",
    };
  }
};

export default NextAuth({
  secret: ENV.NEXTAUTH_SECRET,
  providers: [
    CognitoProvider({
      clientId: ENV.COGNITO_CLIENT_ID,
      clientSecret: ENV.COGNITO_CLIENT_SECRET,
      issuer: ENV.COGNITO_ISSUER,
    }),
  ],
  callbacks: {
    jwt: async (params): Promise<JWT> => {
      if (params.account) {
        return Promise.resolve({
          accessToken: params.account.access_token,
          refreshToken: params.account.refresh_token,
          accessTokenExpiresAt: params.account.expires_at! * 1000,
        });
      }

      const currentTime = Date.now();
      // Return previous token if the access token has not expired yet
      if (currentTime < (params.token.accessTokenExpiresAt as number)) {
        return Promise.resolve(params.token);
      }
      // Access token has expired, try to update it
      return refreshAccessToken(params.token);
    },
    session: async (params): Promise<Session> => {
      params.session.accessToken = params.token.accessToken;
      params.session.refreshtoken = params.token.refreshToken;
      params.session.refreshTokenExpiresAt =
        (params.token.exp as number) * 1000;
      params.session.error = params.token.error;
      return params.session;
    },
  },
});
