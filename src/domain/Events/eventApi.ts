import { api } from '@api';

import { PageAPI, PageParam } from '../types';

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

async function getListMyEventsParticipanting(
  params?: PageParam,
): Promise<PageAPI<Evento>> {
  try {
    const response = await api.get<PageAPI<Evento>>('/events/participant', {
      params,
    });
    return response.data;
  } catch (error) {
    throw new Error(
      'Estamos com problemas técnicos, tente novamente mais tarde.',
    );
  }
}

async function getListMyEvents(params?: PageParam): Promise<PageAPI<Evento>> {
  try {
    const response = await api.get<PageAPI<Evento>>('/events/me', {
      params,
    });
    return response.data;
  } catch (error) {
    throw new Error(
      'Estamos com problemas técnicos, tente novamente mais tarde.',
    );
  }
}

async function getListEventsNotCreatedForMe(
  params?: PageParam,
): Promise<PageAPI<Evento>> {
  try {
    const response = await api.get<PageAPI<Evento>>('/events/not/me', {
      params,
    });
    return response.data;
  } catch (error) {
    throw new Error(
      'Estamos com problemas técnicos, tente novamente mais tarde.',
    );
  }
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
  getListMyEventsParticipanting,
  getListMyEvents,
  getListEventsNotCreatedForMe,
};
