import { useMutation } from '@tanstack/react-query';

import { Usuario } from '../types';
import { userService } from '../userService';

import { useAuthCredentials } from './../../../hooks/useAuthCredentials';
import { MutationOptions } from './../../Infra/types';

export function useUserUpdateProfile(options?: MutationOptions<Usuario>) {
    const { saveCredentials, authCredentials } = useAuthCredentials();
    const mutation = useMutation<Usuario, Error, Usuario>({
        mutationFn: data => userService.updateProfile(data),
        retry: false,
        onError: error => {
            if (options?.onError) {
                options.onError(error.message);
            }
        },
        onSuccess: data => {
            if (authCredentials) {
                saveCredentials({
                    token: authCredentials.token,
                    refreshToken: authCredentials.refreshToken,
                    user: {
                        nome: data.nome,
                        email: data.email,
                        foto: data.foto!,
                        adm: data.adm!,
                    },
                });
            }
            if (options?.onSucess) {
                options.onSucess(data);
            }
        },
    });

    return {
        isLoading: mutation.isPending,
        updateProfile: (data: Usuario) => mutation.mutate(data),
    };
}
