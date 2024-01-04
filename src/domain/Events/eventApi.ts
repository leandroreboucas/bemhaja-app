import { api } from '@api';

import { PageAPI } from '../types';

import { eventListMock } from './eventListMock';
import { CreateEventModel, Evento } from './eventTypes';

interface ListResponse {
  events: Evento[];
}

async function getList(): Promise<PageAPI<Evento>> {
  await new Promise(resolve => setTimeout(resolve, 1000));
  const data: PageAPI<Evento> = {
    data: eventListMock,
  };
  return data;
}

async function getListMyEvents(): Promise<Evento[]> {
  const response = await api.get<ListResponse>('/events/me');
  return response.data.events;
}

async function create(data: CreateEventModel): Promise<void> {
  try {
    await api.post<void>('/event', data);
  } catch (error) {
    throw new Error(
      'Estamos com problemas técnicos, tente novamente mais tarde.',
    );
  }
}

export const eventApi = {
  getList,
  create,
  getListMyEvents,
};
