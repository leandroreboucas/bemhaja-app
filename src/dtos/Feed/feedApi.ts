import {FeedDTO, PageAPI} from '../types';

import {feedListMock} from './feedListMock';

async function getList(): Promise<PageAPI<FeedDTO>> {
  await new Promise(resolve => setTimeout(resolve, 3000));
  const data: PageAPI<FeedDTO> = {
    meta: {
      total: 24,
      per_page: 10,
      current_page: 1,
      last_page: 3,
      first_page: 1,
      first_page_url: '/?page=1',
      last_page_url: '/?page=3',
      next_page_url: '/?page=2',
      previous_page_url: null,
    },
    data: feedListMock,
  };
  return data;
}

export const feedApi = {
  getList,
};
