import { FeedDTO, PageAPI } from '../types';

import { feedApi } from './feedApi';

async function getList(page: number): Promise<PageAPI<FeedDTO>> {
  const feedPageApi = await feedApi.getList({ page, per_page: 10 });
  return feedPageApi;
}

export const feedService = {
  getList,
};
