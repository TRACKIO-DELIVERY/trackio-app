import { deleteItemAsync, getItemAsync, setItemAsync } from "expo-secure-store";

const ACCESS_TOKEN_KEY = "trackioaccess";
const REFRESH_TOKEN_KEY = "trackiorefresh";

export async function getTokensStorage() {
  try {
    const access = await getItemAsync(ACCESS_TOKEN_KEY);
    const refresh = await getItemAsync(REFRESH_TOKEN_KEY);
    if (!access || !refresh) {
      return;
    }
    return { access, refresh };
  } catch (error) {
    console.error("Error to get token", error);
  }
}

export async function setTokensStorage(access: string, refresh: string) {
  try {
    await setItemAsync(ACCESS_TOKEN_KEY, access);
    await setItemAsync(REFRESH_TOKEN_KEY, refresh);
  } catch (error) {
    console.error("Error to set token", error);
  }
}

export async function removeTokensStorage() {
  await deleteItemAsync(ACCESS_TOKEN_KEY);
  await deleteItemAsync(REFRESH_TOKEN_KEY);
}
