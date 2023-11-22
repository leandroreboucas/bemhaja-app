import {Alert} from 'react-native';

import {useAuthSigOut} from '@domain';

import {Screen, Header, Button, Box} from '@components';

export function ConfigScreen() {
  const {signOut} = useAuthSigOut();
  function logout() {
    Alert.alert('Deseja realmente sair da sua conta?', undefined, [
      {
        text: 'Não',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {text: 'Sim', onPress: () => signOut()},
    ]);
  }
  return (
    <Screen
      style={{
        paddingBottom: 0,
        paddingTop: 0,
        paddingHorizontal: 0,
        flex: 1,
      }}>
      <Header canGoBack title="Configurações" />
      <Box marginHorizontal="s28" marginTop="s16">
        <Button title="Sair da conta" preset="primary" onPress={logout} />
      </Box>
    </Screen>
  );
}
