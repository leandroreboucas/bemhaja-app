import { apiAdapter } from '../Api/apiAdapter';
import { Page, FeedDTO } from '../types';

import { feedApi } from './feedApi';

async function getList(page: number): Promise<Page<FeedDTO>> {
  const feedPageApi = await feedApi.getList({ page, perPage: 10 });
  return {
    data: feedPageApi.data,
    meta: apiAdapter.toMetaDataPage(feedPageApi.meta),
  };
}

export const feedService = {
  getList,
};
