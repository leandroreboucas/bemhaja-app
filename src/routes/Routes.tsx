import {ActivityIndicator} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import {is} from 'date-fns/locale';

import {Box} from '@components';
import {useAuthCredentials} from '@hooks';

import {AppStack} from './AppStack';
import {AuthStack} from './AuthStack';

export function Router() {
  const {authCredentials, isLoading} = useAuthCredentials();

  if (isLoading) {
    return (
      <Box flex={1} justifyContent="center" alignItems="center">
        <ActivityIndicator size="large" color="primary" />
      </Box>
    );
  }
  return (
    <NavigationContainer>
      {authCredentials ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
}
