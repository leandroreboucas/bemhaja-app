import { QueryKeys } from '@dtos';
import { useQuery } from '@tanstack/react-query';

import { userService } from '../userService';

export function useUserGetById(id: number) {
    const { data, isLoading, isError, refetch, isFetching } = useQuery({
        queryKey: [QueryKeys.UserGetById, id],
        queryFn: () => userService.getById(id),
        staleTime: 1000 * 30,
    });

    return {
        user: data,
        isLoading,
        isError,
        refetch,
        isFetching,
    };
}
