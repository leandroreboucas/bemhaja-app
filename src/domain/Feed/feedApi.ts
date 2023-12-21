import {FeedDTO, PageAPI, PageParam} from '../types';

import {feedListMock} from './feedListMock';

async function getList(params?: PageParam): Promise<PageAPI<FeedDTO>> {
  //todo: adicinar parametros de paginação no axios
  await new Promise(resolve => setTimeout(resolve, 1000));
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
