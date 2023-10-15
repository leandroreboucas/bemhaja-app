import {EventoDTO, PageAPI} from '../types';

import {eventApi} from './eventApi';

async function getList(): Promise<PageAPI<EventoDTO>> {
  return await eventApi.getList();
}

export const eventService = {
  getList,
};
