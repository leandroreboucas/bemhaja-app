import { usePaginatedList } from '../../hooks/usePaginatedList';
import { FeedDTO } from '../../types';
import { feedService } from '../feedService';

export function useFeedList() {
    return usePaginatedList<FeedDTO>(feedService.getList);
}
