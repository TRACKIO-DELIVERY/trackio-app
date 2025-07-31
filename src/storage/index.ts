import AsyncStorage from "@react-native-async-storage/async-storage";

const ACCESS_TOKEN_KEY = '@trackio::token'

export async function getTokenStorage() {
    try {
        const stored = await AsyncStorage.getItem(ACCESS_TOKEN_KEY)
        if (!stored) {
            return
        }
        return JSON.parse(stored)
    } catch (error) {
        console.error('Error to get token', error)
    }
}

export async function setTokenStorage(token: string) {
    try {
        await AsyncStorage.setItem(ACCESS_TOKEN_KEY, JSON.stringify(token))
    } catch (error) {
        console.error('Error to set token', error)
    }
}

export async function removeTokenStorage() {
    AsyncStorage.removeItem(ACCESS_TOKEN_KEY)
}