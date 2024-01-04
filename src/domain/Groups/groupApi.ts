import { GrupoAtitudeDTO, PageAPI } from '../types';

import { groupListMock } from './groupListMock';

async function getList(): Promise<PageAPI<GrupoAtitudeDTO>> {
  await new Promise(resolve => setTimeout(resolve, 1000));
  const data: PageAPI<GrupoAtitudeDTO> = {
    data: groupListMock,
  };
  return data;
}

export const groupApi = {
  getList,
};
