import { useMutation, useQueryClient } from '@tanstack/react-query';

import { eventService } from '../eventService';
import { CreateEventModel } from '../eventTypes';

import { MutationOptions, QueryKeys } from './../../Infra/types';

export function useEventCreate(options?: MutationOptions<void>) {
    const queryClient = useQueryClient();
    const mutation = useMutation<void, Error, CreateEventModel>({
        mutationFn: data => eventService.create(data),
        retry: false,
        onError: error => {
            if (options?.onError) {
                options.onError(error.message);
            }
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: [QueryKeys.FeedList],
                exact: true,
            });
            if (options?.onSucess) {
                options.onSucess();
            }
        },
    });

    return {
        isLoading: mutation.isPending,
        create: (data: CreateEventModel) => mutation.mutate(data),
    };
}
