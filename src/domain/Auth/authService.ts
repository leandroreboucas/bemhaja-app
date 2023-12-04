import { api } from '@api';

import { authApi } from './authApi';
import {
    AuthCredentialsAPI,
    SignUpData,
    UserResponseRegister,
} from './authTypes';

async function signIn(
    email: string,
    password: string,
): Promise<AuthCredentialsAPI> {
    const authCredentialsAPI = await authApi.signIn(email, password);
    if (!authCredentialsAPI.user.foto) {
        authCredentialsAPI.user.foto = `https://ui-avatars.com/api/?name=${authCredentialsAPI.user.nome}&size=48`;
    }
    authCredentialsAPI.user.email = email;
    return authCredentialsAPI;
}

async function signUp(data: SignUpData): Promise<UserResponseRegister> {
    // if (data.foto) {
    //     const photoBucket = await fileService.getUrlUpload({
    //         contentType: 'image/jpeg',
    //         fileName: `${new Date().getTime()}.jpg`,
    //         folder: 'app/profile',
    //         uri: data.foto!,
    //     });
    //     data.foto = photoBucket;
    // }
    return await authApi.signUp(data);
}

async function resetPassword(data: { email: string }): Promise<void> {
    await authApi.resetPassword(data);
}

function updateToken(token: string) {
    api.defaults.headers.common.Authorization = `Bearer ${token}`;
}

function removeToken() {
    delete api.defaults.headers.common.Authorization;
}

async function refreshToken(): Promise<AuthCredentialsAPI> {
    const authCredentialsAPI = await authApi.refreshToken();
    if (!authCredentialsAPI.user.foto) {
        authCredentialsAPI.user.foto = `https://ui-avatars.com/api/?name=${authCredentialsAPI.user.nome}&size=48`;
    }
    return authCredentialsAPI;
}

interface InteceptorProps {
    authCredentials: AuthCredentialsAPI | null;
    saveCredentials: (authCredentials: AuthCredentialsAPI) => Promise<void>;
    removeCredentials: () => Promise<void>;
}

function registerInterceptor({
    authCredentials,
    saveCredentials,
    removeCredentials,
}: InteceptorProps) {
    const interceptor = api.interceptors.response.use(
        response => response,
        async error => {
            const failedRequest = error.config;
            if (error.response.status === 401) {
                if (
                    !authCredentials?.refreshToken ||
                    authService.isRefreshTokenRequest(failedRequest) ||
                    failedRequest.sent
                ) {
                    await removeCredentials();
                    return Promise.reject(error);
                }
                failedRequest.sent = true;
                api.defaults.headers.common.Authorization = `Bearer ${authCredentials.refreshToken}`;
                const newAuthCredentials = await authService.refreshToken();
                await saveCredentials(newAuthCredentials);
                failedRequest.headers[
                    'Authorization'
                ] = `Bearer ${newAuthCredentials.token}`;
                return api(failedRequest);
            }
            return Promise.reject(error);
        },
    );
    return () => api.interceptors.response.eject(interceptor);
}

export const authService = {
    signIn,

    signUp,
    resetPassword,
    refreshToken,
    isRefreshTokenRequest: authApi.isRefreshTokenRequest,
    registerInterceptor,
    updateToken,
    removeToken,
};
