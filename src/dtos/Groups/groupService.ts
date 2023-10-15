import {PageAPI, GrupoAtitudeDTO} from '../types';

import {groupApi} from './groupApi';

async function getList(): Promise<PageAPI<GrupoAtitudeDTO>> {
  return await groupApi.getList();
}

export const groupService = {
  getList,
};
