import {EventoDTO} from '../types';

import {eventListMock} from './eventListMock';

async function getList(): Promise<EventoDTO[]> {
  await new Promise(resolve => setTimeout(resolve, 1000));
  return eventListMock;
}

export const eventApi = {
  getList,
};
