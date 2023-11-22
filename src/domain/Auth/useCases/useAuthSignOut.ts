import { useAuthCredentials } from '@services';

export function useAuthSigOut() {
    const { removeCredentials } = useAuthCredentials();
    return {
        signOut: () => {
            removeCredentials();
        },
    };
}
