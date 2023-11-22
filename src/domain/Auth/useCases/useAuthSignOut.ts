import { useAuthCredentials } from '@services';

import { authService } from '../authService';

export function useAuthSigOut() {
    const { removeCredentials } = useAuthCredentials();
    return {
        signOut: () => {
            authService.removeToken();
            removeCredentials();
        },
    };
}
