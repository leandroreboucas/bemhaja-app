import { api } from '@api';

import { fileService } from '../File';

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

export const authService = {
    signIn,
    updateToken,
    removeToken,
    signUp,
    resetPassword,
    refreshToken,
    isRefreshTokenRequest: authApi.isRefreshTokenRequest,
};
