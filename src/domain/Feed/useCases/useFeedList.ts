import {QueryKeys} from '../../Infra/types';
import {FeedDTO} from '../../types';
import {feedService} from '../feedService';

import {usePaginatedList} from './../../Infra/hooks/usePaginatedList';

export function useFeedList() {
  return usePaginatedList<FeedDTO>([QueryKeys.FeedList], feedService.getList);
}
