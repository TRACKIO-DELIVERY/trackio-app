import { getTokensStorage, removeTokensStorage, setTokensStorage } from "@/storage";
import axios, { AxiosInstance } from "axios";

export function applyAuthInterceptors(instance: AxiosInstance) {
    instance.interceptors.request.use(
        async (config) => {
            const tokens = await getTokensStorage()

            if (tokens?.access) {
                config.headers['Authorization'] = `Bearer ${tokens.access}`
            } else {
                delete config.headers['Authorization']
            }
            return config
        },
        (error) => {
            return Promise.reject(error)
        }
    )

    instance.interceptors.response.use(
        (response) => response,
        async (error) => {
            const originalRequest = error.config

            if (error.response.status === 401 && !originalRequest._retry) {
                originalRequest._retry = true

                const tokens = await getTokensStorage()

                if (tokens?.refresh) {
                    try {
                        const { data } = await axios.post(
                            `${process.env.EXPO_PUBLIC_API_URL}/api/token/refresh/`,
                            { refresh: tokens?.refresh }
                        )

                        const newAccessToken = data.access
                        const newRefreshToken = data.refresh ?? tokens?.refresh

                        await setTokensStorage(newAccessToken, newRefreshToken)

                        originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`
                        return instance(originalRequest)
                    } catch (refreshError) {
                        await removeTokensStorage()
                        console.log('Refresh token inválido.')
                        return Promise.reject(refreshError)
                    }
                }
            }
            return Promise.reject(error)
        }
    )

}