import { fileService } from '../File';

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

async function updateProfile(data: Usuario): Promise<Usuario> {
    if (data.foto && !data.foto.includes('amazonaws.com')) {
        const photoBucket = await fileService.getUrlUpload({
            contentType: 'image/jpeg',
            fileName: `${new Date().getTime()}.jpg`,
            folder: 'app/profile',
            uri: data.foto!,
        });
        data.foto = photoBucket;
    }
    const user = await userApi.updateProfile(data);
    if (!user.foto) {
        user.foto = `https://ui-avatars.com/api/?name=${user.nome}&size=48`;
    }
    return user;
}

export const userService = {
    updatePassword,
    getProfile,
    updateProfile,
};
