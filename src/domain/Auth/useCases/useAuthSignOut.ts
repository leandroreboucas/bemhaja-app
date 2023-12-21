import {useAuthCredentials} from '@hooks';

export function useAuthSigOut() {
  const {removeCredentials} = useAuthCredentials();
  return {
    signOut: () => {
      removeCredentials();
    },
  };
}
