import {useQuery} from '@tanstack/react-query';

import {friendService} from '../friendService';

import {QueryKeys} from './../../Infra';

export function useFriendGetAll() {
  const {data, isLoading, isError, refetch, isFetching} = useQuery({
    queryKey: [QueryKeys.FriendGetAll],
    queryFn: () => friendService.getAll(),
  });

  return {
    friends: data || [],
    isLoading,
    isError,
    refetch,
    isFetching,
  };
}
