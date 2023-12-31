import {useMutation} from '@tanstack/react-query';

import {authService} from '../authService';
import {AuthCredentialsAPI} from '../authTypes';

import {useAuthCredentials} from './../../../hooks/useAuthCredentials';
import {MutationOptions} from './../../Infra/types';

interface Variables {
  email: string;
  password: string;
}

export function useAuthSigIn(options?: MutationOptions<AuthCredentialsAPI>) {
  const {saveCredentials} = useAuthCredentials();
  const mutation = useMutation<AuthCredentialsAPI, Error, Variables>({
    mutationFn: ({email, password}) => authService.signIn(email, password),
    retry: false,
    onError: error => {
      if (options?.onError) {
        options.onError(error.message);
      }
    },
    onSuccess: authCredentials => {
      saveCredentials(authCredentials);
      if (options?.onSucess) {
        options.onSucess(authCredentials);
      }
    },
  });

  return {
    isLoading: mutation.isPending,
    signIn: (variables: Variables) => mutation.mutate(variables),
  };
}
