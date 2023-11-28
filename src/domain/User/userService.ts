import { Usuario } from './types';
import { userApi } from './userApi';

async function updatePassword(
    newPassword: string,
    oldPassword: string,
): Promise<void> {
    await userApi.updatePassword(newPassword, oldPassword);
}

async function getProfile(): Promise<Usuario> {
    return await userApi.getProfile();
}

export const userService = {
    updatePassword,
    getProfile,
};
