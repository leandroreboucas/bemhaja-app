import {useMutation} from '@tanstack/react-query';

import {authService} from '../authService';

import {MutationOptions} from './../../Infra';

interface Variables {
  email: string;
}

export function useAuthResetPassword(options?: MutationOptions<void>) {
  const mutation = useMutation<void, Error, Variables>({
    mutationFn: ({email}) => authService.resetPassword({email}),
    retry: false,
    onError: error => {
      if (options?.onError) {
        options.onError(error.message);
      }
    },
    onSuccess: () => {
      if (options?.onSucess) {
        options.onSucess();
      }
    },
  });

  return {
    isLoading: mutation.isPending,
    resetPassword: (variables: Variables) => mutation.mutate(variables),
  };
}
