import AsyncStorage from "@react-native-async-storage/async-storage";

const ACCESS_TOKEN_KEY = '@trackio::access'
const REFRESH_TOKEN_KEY = '@trackio::refresh'

export async function getTokensStorage() {
    try {
        const access = await AsyncStorage.getItem(ACCESS_TOKEN_KEY)
        const refresh = await AsyncStorage.getItem(REFRESH_TOKEN_KEY)
        if (!access || !refresh) {
            return
        }
        return { access, refresh }
    } catch (error) {
        console.error('Error to get token', error)
    }
}

export async function setTokensStorage(access: string, refresh: string) {
    try {
        await AsyncStorage.setItem(ACCESS_TOKEN_KEY, access)
        await AsyncStorage.setItem(REFRESH_TOKEN_KEY, refresh)
    } catch (error) {
        console.error('Error to set token', error)
    }
}

export async function removeTokensStorage() {
    await AsyncStorage.removeItem(ACCESS_TOKEN_KEY)
    await AsyncStorage.removeItem(REFRESH_TOKEN_KEY)
}