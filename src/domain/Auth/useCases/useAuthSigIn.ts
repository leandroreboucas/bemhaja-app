import { useMutation } from '@tanstack/react-query';

import { useAuthCredentials } from '@hooks';

import { authService } from '../authService';
import { AuthCredentialsAPI } from '../authTypes';

import { MutationOptions } from './../../Infra';

interface Variables {
    email: string;
    password: string;
}

export function useAuthSigIn(options?: MutationOptions<AuthCredentialsAPI>) {
    const { saveCredentials } = useAuthCredentials();
    const mutation = useMutation<AuthCredentialsAPI, Error, Variables>({
        mutationFn: ({ email, password }) => authService.signIn(email, password),
        retry: false,
        onError: error => {
            if (options?.onError) {
                options.onError(error.message);
            }
        },
        onSuccess: authCredentials => {
            saveCredentials(authCredentials);
        },
    });

    return {
        isLoading: mutation.isPending,
        signIn: (variables: Variables) => mutation.mutate(variables),
    };
}
