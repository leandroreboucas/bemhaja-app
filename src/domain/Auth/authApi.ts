import { api } from '@api';
import { AxiosError, AxiosRequestConfig } from 'axios';

import {
    AuthCredentialsAPI,
    SignUpDataAPI,
    UserResponseRegister,
} from './authTypes';

async function signIn(
    email: string,
    password: string,
): Promise<AuthCredentialsAPI> {
    try {
        const response = await api.post<AuthCredentialsAPI>('/session', {
            email,
            senha: password,
        });
        return response.data;
    } catch (error) {
        if (error instanceof AxiosError) {
            if (error.response?.status === 401 || error.response?.status === 400) {
                throw new Error('E-mail ou senha estão incorretos.');
            }
        }
        throw new Error(
            'Estamos com problemas tecnicos, tente novamente mais tarde.',
        );
    }
}

async function signUp(data: SignUpDataAPI): Promise<UserResponseRegister> {
    try {
        const response = await api.post<UserResponseRegister>('/user', data);
        return response.data;
    } catch (error) {
        if (error instanceof AxiosError) {
            if (error.response?.status === 409) {
                throw new Error(error.response?.data?.message);
            }
        }
        throw new Error(
            'Estamos com problemas tecnicos, tente novamente mais tarde.',
        );
    }
}

async function resetPassword(data: { email: string }): Promise<void> {
    try {
        await api.post<void>('/reset/password', data);
    } catch (error) {
        throw new Error(
            'Estamos com problemas tecnicos, tente novamente mais tarde.',
        );
    }
}

async function refreshToken(): Promise<AuthCredentialsAPI> {
    try {
        const response = await api.post<AuthCredentialsAPI>('/token/refresh');
        return response.data;
    } catch (error) {
        throw new Error(
            'Estamos com problemas tecnicos, tente novamente mais tarde.',
        );
    }
}

function isRefreshTokenRequest(request: AxiosRequestConfig) {
    return request.url === '/token/refresh';
}

export const authApi = {
    signIn,
    signUp,
    resetPassword,
    refreshToken,
    isRefreshTokenRequest,
};
