import axios from 'axios'
import { applyAuthInterceptors } from './interceptors'

export const api = axios.create({
    baseURL: process.env.EXPO_PUBLIC_API_URL
})

export const apiNode = axios.create({
    baseURL: process.env.EXPO_PUBLIC_NODE_API_URL
})

applyAuthInterceptors(api)
applyAuthInterceptors(apiNode)