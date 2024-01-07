import { useMutation, useQueryClient } from '@tanstack/react-query';

import { eventBehaviorCompletedService } from '../eventBehaviorCompletedService';
import { EventBehaviorCompleted } from '../types';

import { MutationOptions, QueryKeys } from './../../Infra/types';

export function useEventBehaviorCompletedCreate(
  options?: MutationOptions<void>,
) {
  const queryClient = useQueryClient();
  const mutation = useMutation<void, Error, EventBehaviorCompleted>({
    mutationFn: data => eventBehaviorCompletedService.create(data),
    retry: false,
    onError: error => {
      if (options?.onError) {
        options.onError(error.message);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.FeedList],
      });
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.EventGetListMyEventsParticipants],
      });

      if (options?.onSucess) {
        options.onSucess();
      }
    },
  });

  return {
    isLoading: mutation.isPending,
    create: (data: EventBehaviorCompleted) => mutation.mutate(data),
  };
}
