import {Usuario} from '../User';

import {friendApi} from './friendApi';

async function getAll(): Promise<Usuario[]> {
  return await friendApi.getAll();
}

export const friendService = {
  getAll,
};
