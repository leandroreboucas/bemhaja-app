import { api } from '@api';

import { EventPost } from './types';

async function create(data: EventPost): Promise<void> {
    try {
        await api.post<void>('/eventPost', data);
    } catch (error) {
        throw new Error(
            'Estamos com problemas técnicos, tente novamente mais tarde.',
        );
    }
}

export const eventPostApi = {
    create,
};
