import {PropsWithChildren, createContext, useEffect, useState} from 'react';

import {AuthCredentialsAPI, authService} from '@domain';

import {authCredentialsStorage} from '../authCredentialsStorage';
import {AuthCredentialsService} from '../authCredentialsType';

export const AuthCredentialsContext = createContext<AuthCredentialsService>({
  authCredentials: null,
  isLoading: true,
  saveCredentials: async () => {},
  removeCredentials: async () => {},
});

export function AuthCredentialsProvider({children}: PropsWithChildren<object>) {
  const [authCredentials, setAuthCredentials] =
    useState<AuthCredentialsAPI | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    startAuthCredentials();
  }, []);

  async function startAuthCredentials() {
    try {
      const ac = await authCredentialsStorage.get();
      if (ac) {
        authService.updateToken(ac.token);
        setAuthCredentials(ac);
      }
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  }

  async function saveCredentials(credentials: AuthCredentialsAPI) {
    authService.updateToken(credentials.token);
    authCredentialsStorage.set(credentials);
    setAuthCredentials(credentials);
    setIsLoading(false);
  }

  async function removeCredentials() {
    authService.removeToken();
    authCredentialsStorage.remove();
    setAuthCredentials(null);
    setIsLoading(false);
  }

  return (
    <AuthCredentialsContext.Provider
      value={{authCredentials, isLoading, saveCredentials, removeCredentials}}>
      {children}
    </AuthCredentialsContext.Provider>
  );
}
