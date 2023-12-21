import {api} from '@api';
import {AxiosError} from 'axios';

import {Usuario} from './types';

interface UpdateProfileResponse {
  user: Usuario;
}

interface GetAllResponse {
  users: Usuario[];
}

async function updatePassword(
  newPassword: string,
  oldPassword: string,
): Promise<void> {
  try {
    await api.post<void>('/user/update/password', {
      newPassword,
      oldPassword,
    });
  } catch (error) {
    if (error instanceof AxiosError) {
      if (error.response?.status === 409) {
        throw new Error(error.response.data.message);
      }
    }
    throw new Error(
      'Estamos com problemas tecnicos, tente novamente mais tarde.',
    );
  }
}

async function getProfile(): Promise<Usuario> {
  try {
    const response = await api.get<Usuario>('/user/profile');
    return response.data;
  } catch (error) {
    throw new Error(
      'Estamos com problemas tecnicos, tente novamente mais tarde.',
    );
  }
}

async function updateProfile(data: Usuario): Promise<Usuario> {
  try {
    const response = await api.post<UpdateProfileResponse>(
      '/user/profile',
      data,
    );
    return response.data.user;
  } catch (error) {
    if (error instanceof AxiosError) {
      if (error.response?.status === 409) {
        throw new Error(error.response.data.message);
      }
    }
    throw new Error(
      'Estamos com problemas tecnicos, tente novamente mais tarde.',
    );
  }
}

async function getAll(): Promise<Usuario[]> {
  try {
    const response = await api.get<GetAllResponse>('/user');
    return response.data.users;
  } catch (error) {
    if (error instanceof AxiosError) {
      if (error.response?.status === 409) {
        throw new Error(error.response.data.message);
      }
    }
    throw new Error(
      'Estamos com problemas tecnicos, tente novamente mais tarde.',
    );
  }
}

export const userApi = {
  updatePassword,
  getProfile,
  updateProfile,
  getAll,
};
