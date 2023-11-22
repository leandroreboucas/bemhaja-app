import { api } from '@services';
import { AxiosError } from 'axios';

import { authApi } from './authApi';
import { AuthCredentialsAPI } from './authTypes';

async function signIn(
    email: string,
    password: string,
): Promise<AuthCredentialsAPI> {
    try {
        const authCredentialsAPI = await authApi.signIn(email, password);
        if (!authCredentialsAPI.user.foto) {
            authCredentialsAPI.user.foto = `https://ui-avatars.com/api/?name=${authCredentialsAPI.user.nome}&size=48`;
        }
        authCredentialsAPI.user.email = email;
        return authCredentialsAPI;
    } catch (error) {
        if (error instanceof AxiosError) {
            if (error.response?.status === 401 || error.response?.status === 400) {
                throw new Error('Email ou senha estão incorretos.');
            }
        }
        throw new Error(
            'Estamos com problemas tecnicos, tente novamente mais tarde.',
        );
    }
}

function updateToken(token: string) {
    api.defaults.headers.common.Authorization = `Bearer ${token}`;
}

function removeToken() {
    api.defaults.headers.common.Authorization = null;
}

export const authService = {
    signIn,
    updateToken,
    removeToken,
};
