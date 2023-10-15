import {FeedDTO, PageAPI} from '../types';

import {feedApi} from './feedApi';

async function getList(): Promise<PageAPI<FeedDTO>> {
  return await feedApi.getList();
}

export const feedService = {
  getList,
};
