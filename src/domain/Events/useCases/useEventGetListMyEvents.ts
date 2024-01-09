import { eventService } from '../eventService';
import { Evento } from '../eventTypes';

import { QueryKeys, usePaginatedList } from './../../Infra';

export function useEventGetListMyEvents(filter: string = '') {
    return usePaginatedList<Evento>(
        [QueryKeys.EventGetListMyEvents, filter],
        () => eventService.getListMyEvents(undefined, filter),
    );
}
