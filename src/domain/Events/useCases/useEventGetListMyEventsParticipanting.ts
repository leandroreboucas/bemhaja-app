import { eventService } from '../eventService';
import { Evento } from '../eventTypes';

import { QueryKeys, usePaginatedList } from './../../Infra';

export function useEventGetListMyEventsParticipanting(filter: string = '') {
  return usePaginatedList<Evento>(
    [QueryKeys.EventGetListMyEventsParticipants, filter],
    () => eventService.getListMyEventsParticipanting(undefined, filter),
    {
      enabled: filter.length > 0,
      staleTime: 30000,
    },
  );
}
