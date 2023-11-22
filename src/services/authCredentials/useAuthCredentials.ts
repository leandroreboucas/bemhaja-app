import { useContext } from 'react';

import { AuthCredentialsService } from './authCredentialsType';
import { AuthCredentialsContext } from './Providers/AuthCredentialsProvider';

export function useAuthCredentials(): AuthCredentialsService {
    const context = useContext(AuthCredentialsContext);
    if (!context) {
        throw new Error(
            'useAuthCredentials must be used within a AuthCredentialsProvider',
        );
    }
    return context;
}

// const useAuthCredentialsZustand = create<AuthCredentialsService>()(
//     persist(
//         set => ({
//             authCredentials: null,
//             saveCredentials: async authCredentials => {
//                 set({ authCredentials });
//             },
//             removeCredentials: async () => {
//                 set({ authCredentials: null });
//             },
//             isLoading: false,
//         }),
//         {
//             name: '@bemhaja:authCredentials',
//             storage,
//         },
//     ),
// );
