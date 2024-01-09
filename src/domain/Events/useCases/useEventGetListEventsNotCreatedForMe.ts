import { eventService } from '../eventService';
import { Evento } from '../eventTypes';

import { QueryKeys, usePaginatedList } from './../../Infra';

export function useEventGetListEventsNotCreatedForMe(filter: string = '') {
    return usePaginatedList<Evento>(
        [QueryKeys.EventGetListEventsNotCreatedForMe, filter],
        () => eventService.getListEventsNotCreatedForMe(undefined, filter),
    );
}
