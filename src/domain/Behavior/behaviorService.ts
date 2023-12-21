import {behaviorApi} from './behaviorApi';
import {Behavior} from './behaviorTypes';

async function getAll(): Promise<Behavior[]> {
  return await behaviorApi.getAll();
}

export const behaviorService = {
  getAll,
};
