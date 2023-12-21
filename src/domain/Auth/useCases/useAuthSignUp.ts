import {useMutation} from '@tanstack/react-query';

import {authService} from '../authService';
import {SignUpData, UserResponseRegister} from '../authTypes';

import {MutationOptions} from './../../../domain/Infra';

export function useAuthSignUp(options?: MutationOptions<UserResponseRegister>) {
  const mutation = useMutation<UserResponseRegister, Error, SignUpData>({
    mutationFn: signUpData => authService.signUp(signUpData),
    retry: false,
    onError: error => {
      if (options?.onError) {
        options.onError(error.message);
      }
    },
    onSuccess: userResponse => {
      if (options?.onSucess) {
        options.onSucess(userResponse);
      }
    },
  });

  return {
    signUp: (signUpData: SignUpData) => mutation.mutate(signUpData),
    isLoading: mutation.isPending,
  };
}
