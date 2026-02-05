import { getTokensStorage, setTokensStorage } from "@/storage/authTokens";
import { CLIENT_ID, discovery } from "../keycloack";

export async function refreshAccessToken() {
  const tokens = await getTokensStorage();
  if (!tokens?.refresh) throw new Error("No refresh token");

  const params = new URLSearchParams({
    grant_type: "refresh_token",
    client_id: CLIENT_ID!,
    refresh_token: tokens.refresh,
  });

  const res = await fetch(discovery.tokenEndpoint!, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: params.toString(),
  });

  // Se a rede respondeu mas o Keycloak negou o refresh
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    console.error("Falha no refresh do Keycloak:", errorData);
    throw new Error("Session expired");
  }

  const data = await res.json();

  if (!data.access_token) {
    throw new Error("Refresh token inválido ou ausente na resposta");
  }

  await setTokensStorage(
    data.access_token,
    data.refresh_token ?? tokens.refresh,
  );

  return data;
}
