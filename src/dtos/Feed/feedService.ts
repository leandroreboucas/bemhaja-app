import {FeedDTO} from '../types';

import {feedApi} from './feedApi';

async function getList(): Promise<FeedDTO[]> {
  return await feedApi.getList();
}

export const feedService = {
  getList,
};
