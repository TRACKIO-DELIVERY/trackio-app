import * as Google from 'expo-auth-session/providers/google';
import * as WebBrowser from 'expo-web-browser';
import { useEffect } from 'react';
import { Button } from '@/components/Atoms/Button';
import { useAuth } from '@/hooks/useAuth';

import GoogleIcon from "@/assets/icons/google.svg";


WebBrowser.maybeCompleteAuthSession();

export function GoogleLoginButton() {
    const { googleLogin } = useAuth();

    const [request, response, promptAsync] = Google.useAuthRequest({
        clientId: '963229888713-flsidg1c2o1i76tn0v3s0ivdccbkdc0k.apps.googleusercontent.com',
        redirectUri: 'https://auth.expo.io/@karendantas/trackio-app',
        scopes: ['profile', 'email'],
    });

    useEffect(() => {
        if (response?.type === 'success') {
            const { authentication } = response;
            const accessToken = authentication?.accessToken;
            if (accessToken) {
                googleLogin(accessToken);
            }
        }
    }, [response]);

    return (
        <Button
            title="Entrar com Google"
            variant="google"
            onPress={() => promptAsync()}
            icon={GoogleIcon}
            disabled={!request}
        />
    );
}
