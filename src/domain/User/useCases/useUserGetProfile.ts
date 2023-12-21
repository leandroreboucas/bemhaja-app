import {useQuery} from '@tanstack/react-query';

import {userService} from '../userService';

import {QueryKeys} from './../../Infra';

export function useUserGetProfile(id?: string) {
  const {data, isLoading, isError, refetch, isFetching} = useQuery({
    queryKey: [QueryKeys.UserGetProfile, id],
    queryFn: () => userService.getProfile(),
  });

  return {
    user: data,
    isLoading,
    isError,
    refetch,
    isFetching,
  };
}
