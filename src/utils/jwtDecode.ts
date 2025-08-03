import { jwtDecode } from 'jwt-decode'

type DecodedToken = {
    user_id: string
    exp: number
    iat: number
}

export function getUserIdFromToken(token: string): string | null {
    try {
        const decoded = jwtDecode<DecodedToken>(token)
        return decoded.user_id
    } catch (e) {
        console.error("Token inválido", e)
        return null
    }
}
