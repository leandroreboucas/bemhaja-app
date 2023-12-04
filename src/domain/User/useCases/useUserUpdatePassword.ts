import { useMutation } from '@tanstack/react-query';

import { userService } from '../userService';

import { MutationOptions } from './../../Infra/types';

interface Variables {
    newPassword: string;
    oldPassword: string;
}

export function useUserUpdatePassword(options?: MutationOptions<void>) {
    const mutation = useMutation<void, Error, Variables>({
        mutationFn: ({ newPassword, oldPassword }) =>
            userService.updatePassword(newPassword, oldPassword),
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
        updatePassword: (variables: Variables) => mutation.mutate(variables),
    };
}
