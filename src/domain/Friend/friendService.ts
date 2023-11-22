import {PageAPI, UsuarioDTO} from '../types';

import {friendApi} from './friendApi';

async function getList(): Promise<PageAPI<UsuarioDTO>> {
  return await friendApi.getList();
}

export const friendService = {
  getList,
};
