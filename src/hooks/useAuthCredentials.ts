import { useContext } from 'react';

import { AuthCredentialsService } from './../services/authCredentials/authCredentialsType';
import { AuthCredentialsContext } from './../services/authCredentials/Providers/AuthCredentialsProvider';

export function useAuthCredentials(): AuthCredentialsService {
    const context = useContext(AuthCredentialsContext);
    if (!context) {
        throw new Error(
            'useAuthCredentials must be used within a AuthCredentialsProvider',
        );
    }
    return context;
}
