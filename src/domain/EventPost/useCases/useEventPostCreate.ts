import { useMutation, useQueryClient } from '@tanstack/react-query';

import { eventPostService } from '../eventPostService';
import { EventPost } from '../types';

import { MutationOptions, QueryKeys } from './../../Infra/types';

export function useEventPostCreate(options?: MutationOptions<void>) {
    const queryClient = useQueryClient();
    const mutation = useMutation<void, Error, EventPost>({
        mutationFn: data => eventPostService.create(data),
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
        create: (data: EventPost) => mutation.mutate(data),
    };
}
