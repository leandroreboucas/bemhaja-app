import { AuthCredentialsAPI } from '@domain';

export interface AuthCredentialsService {
    authCredentials: AuthCredentialsAPI | null;
    saveCredentials: (authCredentials: AuthCredentialsAPI) => Promise<void>;
    removeCredentials: () => Promise<void>;
    isLoading: boolean;
}
