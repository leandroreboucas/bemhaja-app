import {useQuery} from '@tanstack/react-query';

import {eventService} from '../eventService';

import {QueryKeys} from './../../Infra';

export function useEventGetListMyEvents() {
  const {data, isLoading, isError, refetch, isFetching} = useQuery({
    queryKey: [QueryKeys.EventGetListMyEvents],
    queryFn: () => eventService.getListMyEvents(),
  });

  return {
    events: data || [],
    isLoading,
    isError,
    refetch,
    isFetching,
  };
}
