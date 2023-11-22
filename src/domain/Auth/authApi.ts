import { api } from '@services';

import { AuthCredentialsAPI } from './authTypes';

async function signIn(
    email: string,
    password: string,
): Promise<AuthCredentialsAPI> {
    const response = await api.post<AuthCredentialsAPI>('/session', {
        email,
        senha: password,
    });
    return response.data;
}

export const authApi = {
    signIn,
};
