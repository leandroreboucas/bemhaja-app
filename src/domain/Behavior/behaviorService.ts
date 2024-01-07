import { PageAPI } from './../types';
import { behaviorApi } from './behaviorApi';
import { Behavior } from './behaviorTypes';

async function getAll(
  page: number = 1,
  filter: string = '',
): Promise<PageAPI<Behavior>> {
  return await behaviorApi.getAll({
    page,
    per_page: 10,
    filter,
  });
}

export const behaviorService = {
  getAll,
};
