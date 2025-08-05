import * as WebBrowser from 'expo-web-browser';
import { Button } from '@/components/Atoms/Button';
import { useAuth } from '@/hooks/useAuth';

import {
    GoogleSignin,
    isSuccessResponse,
} from '@react-native-google-signin/google-signin'
import GoogleIcon from "@/assets/icons/google.svg";


WebBrowser.maybeCompleteAuthSession();

export function GoogleLoginButton() {
    const { googleLogin } = useAuth();

    GoogleSignin.configure({
        webClientId: process.env.EXPO_PUBLIC_GOOGLE_CLIENTID,
        offlineAccess: true,
        scopes: ['profile', 'email'],
        forceCodeForRefreshToken: true,
    })

    async function handleGoogleAutheticate() {
        try {
            await GoogleSignin.hasPlayServices()

            const response = await GoogleSignin.signIn()
            const tokens = await GoogleSignin.getTokens()
            if (isSuccessResponse(response)) {
                googleLogin({
                    auth_token: response.data.idToken!,
                    user_type: 3,
                    device_type: "mobile"
                })
            }
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <Button
            title="Entrar com Google"
            variant="google"
            onPress={handleGoogleAutheticate}
            icon={GoogleIcon}

        />
    );
}
