import { getTokensStorage, removeTokensStorage, setTokensStorage } from '@/storage'
import axios from 'axios'


export const api = axios.create({
    baseURL: process.env.EXPO_PUBLIC_API_URL
})

//interceptor da api django
api.interceptors.request.use(
    async (config) => {
        const tokens = await getTokensStorage()

        if (!tokens?.access && !tokens?.refresh) {
            delete config.headers['Authorization']
        }
        config.headers['Authorization'] = `Bearer ${tokens?.access}`
        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)

api.interceptors.response.use(
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
                    return api(originalRequest)
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


export const apiNode = axios.create({
    baseURL: process.env.EXPO_PUBLIC_NODE_API_URL
})