import {EventoDTO} from '../types';

import {eventApi} from './eventApi';

async function getList(): Promise<EventoDTO[]> {
  return await eventApi.getList();
}

export const eventService = {
  getList,
};
