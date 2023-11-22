import { create } from 'zustand';

import { AuthCredentialsService } from './authCredentialsType';

export function useAuthCredentials(): AuthCredentialsService {
    return useAuthCredentialsZustand();
}

const useAuthCredentialsZustand = create<AuthCredentialsService>(set => ({
    authCredentials: null,
    saveCredentials: async authCredentials => {
        set({ authCredentials });
    },
    removeCredentials: async () => {
        set({ authCredentials: null });
    },
    isLoading: false,
}));
