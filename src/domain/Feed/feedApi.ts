import { api } from '@api';

import { FeedDTO, PageAPI, PageParam } from '../types';

async function getList(params?: PageParam): Promise<PageAPI<FeedDTO>> {
  const response = await api.get<PageAPI<FeedDTO>>('/feed', { params });
  return response.data;
}

export const feedApi = {
  getList,
};
