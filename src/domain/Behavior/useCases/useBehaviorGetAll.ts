import { behaviorService } from '../behaviorService';
import { Behavior } from '../behaviorTypes';

import { QueryKeys, usePaginatedList } from './../../Infra';

export function useBehaviorGetAll(filter: string = '') {
  return usePaginatedList<Behavior>(
    [QueryKeys.BehaviorGetAll, filter],
    () => behaviorService.getAll(undefined, filter),
    {
      enabled: filter.length > 0,
      staleTime: 30000,
    },
  );
}
