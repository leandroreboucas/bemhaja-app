import {EventoDTO, PageAPI} from '../types';

import {eventListMock} from './eventListMock';

async function getList(): Promise<PageAPI<EventoDTO>> {
  await new Promise(resolve => setTimeout(resolve, 1000));
  const data: PageAPI<EventoDTO> = {
    meta: {
      total: 24,
      per_page: 10,
      current_page: 1,
      last_page: 3,
      first_page: 1,
      first_page_url: '/?page=1',
      last_page_url: '/?page=3',
      next_page_url: '/?page=2',
      previous_page_url: null,
    },
    data: eventListMock,
  };
  return data;
}

export const eventApi = {
  getList,
};
