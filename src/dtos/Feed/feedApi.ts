import {FeedDTO} from '../types';

import {feedListMock} from './feedListMock';

async function getList(): Promise<FeedDTO[]> {
  await new Promise(resolve => setTimeout(resolve, 1000));
  return feedListMock;
}

export const feedApi = {
  getList,
};
