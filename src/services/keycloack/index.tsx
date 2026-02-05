import * as AuthSession from "expo-auth-session";
export const KEYCLOAK_HOST = process.env.EXPO_PUBLIC_KEYCLOAK_HOST;
export const REALM = process.env.EXPO_PUBLIC_KEYCLOACK_REALM;
export const CLIENT_ID = process.env.EXPO_PUBLIC_KEYCLOACK_CLIENT_ID;

export const discovery: AuthSession.DiscoveryDocument = {
  authorizationEndpoint: `${KEYCLOAK_HOST}realms/${REALM}/protocol/openid-connect/auth`,
  tokenEndpoint: `${KEYCLOAK_HOST}realms/${REALM}/protocol/openid-connect/token`,
  revocationEndpoint: `${KEYCLOAK_HOST}realms/${REALM}/protocol/openid-connect/revoke`,
  endSessionEndpoint: `${KEYCLOAK_HOST}realms/${REALM}/protocol/openid-connect/logout`,
};

export const redirectUri = AuthSession.makeRedirectUri({
  scheme: "trackioapp",
  path: "login",
});

export const authConfig = {
  clientId: CLIENT_ID!,
  scopes: ["openid", "profile", "email"],
  redirectUri: redirectUri,
  responseType: "code",
  usePKCE: true,
};
