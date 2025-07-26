import axios from 'axios'

export const api = axios.create({
    baseURL: process.env.EXPO_PUBLIC_API_URL
})

export const apiNode = axios.create({
    baseURL: process.env.EXPO_PUBLIC_NODE_API_URL
})