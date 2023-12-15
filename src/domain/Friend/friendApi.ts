import { api } from '@api';

import { Usuario } from '../User';

interface GetAllResponse {
  users: Usuario[];
}

async function getAll(): Promise<Usuario[]> {
  try {
    const response = await api.get<GetAllResponse>('/user/friends');
    return response.data.users;
  } catch (error) {
    throw new Error(
      'Estamos com problemas técnicos, tente novamente mais tarde.',
    );
  }
}

export const friendApi = {
  getAll,
};
