import { useQuery } from '@tanstack/react-query';


import { userService } from '../userService';

import { QueryKeys } from './../../Infra';

export function useUserGetAll() {
    const { data, isLoading, isError, refetch, isFetching } = useQuery({
        queryKey: [QueryKeys.UserGetAll],
        queryFn: () => userService.getAll(),
    });

    return {
        users: data || [],
        isLoading,
        isError,
        refetch,
        isFetching,
    };
}
