import { api } from '@api';
import { AxiosError } from 'axios';

import { PageAPI, PageParam } from './../types';
import { Behavior } from './behaviorTypes';

async function getAll(params?: PageParam): Promise<PageAPI<Behavior>> {
  try {
    const response = await api.get<PageAPI<Behavior>>('/behavior', {
      params,
    });
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      if (error.response?.status === 409) {
        throw new Error(error.response.data.message);
      }
    }
    throw new Error(
      'Estamos com problemas técnicos, tente novamente mais tarde.',
    );
  }
}

export const behaviorApi = {
  getAll,
};
