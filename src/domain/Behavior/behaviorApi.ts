import {api} from '@api';
import {AxiosError} from 'axios';

import {Behavior} from './behaviorTypes';

interface getAllResponse {
  behaviors: Behavior[];
}

async function getAll(): Promise<Behavior[]> {
  try {
    const response = await api.get<getAllResponse>('/behavior');
    return response.data.behaviors;
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

export const behaviorApi = {
  getAll,
};
