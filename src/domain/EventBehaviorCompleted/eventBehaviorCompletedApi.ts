import {api} from '@api';

import {EventBehaviorCompleted} from './types';

async function create(data: EventBehaviorCompleted): Promise<void> {
  try {
    await api.post<void>('/eventBehaviorCompleted', data);
  } catch (error) {
    throw new Error(
      'Estamos com problemas técnicos, tente novamente mais tarde.',
    );
  }
}

export const eventBehaviorCompletedApi = {
  create,
};
