import {useQuery} from '@tanstack/react-query';

import {behaviorService} from '../behaviorService';

import {QueryKeys} from './../../Infra';

export function useBehaviorGetAll() {
  const {data, isLoading, isError, refetch, isFetching} = useQuery({
    queryKey: [QueryKeys.BehaviorGetAll],
    queryFn: () => behaviorService.getAll(),
  });
  return {
    behaviors: data || [],
    isLoading,
    isError,
    refetch,
    isFetching,
  };
}
