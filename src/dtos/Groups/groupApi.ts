import {PageAPI, GrupoAtitudeDTO} from '../types';

import {groupListMock} from './groupListMock';

async function getList(): Promise<PageAPI<GrupoAtitudeDTO>> {
  await new Promise(resolve => setTimeout(resolve, 1000));
  const data: PageAPI<GrupoAtitudeDTO> = {
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
    data: groupListMock,
  };
  return data;
}

export const groupApi = {
  getList,
};
