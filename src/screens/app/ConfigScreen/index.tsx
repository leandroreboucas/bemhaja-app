import {Alert} from 'react-native';

import {useAuthSigOut} from '@domain';

import {
  Screen,
  Header,
  Button,
  Box,
  Text,
  Icon,
  TouchableOpacityBox,
} from '@components';

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
        <TouchableOpacityBox
          flexDirection="row"
          alignItems="center"
          justifyContent="space-between"
          borderBottomColor="gray_disabled_Background"
          borderBottomWidth={1}
          paddingVertical="s16">
          <Text variant="padrao">Meu perfil</Text>
          <Icon name="arrowRight" size={20} color="gray_700" />
        </TouchableOpacityBox>
        <TouchableOpacityBox
          flexDirection="row"
          alignItems="center"
          justifyContent="space-between"
          borderBottomColor="gray_disabled_Background"
          borderBottomWidth={1}
          paddingVertical="s16">
          <Text variant="padrao">Alterar senha</Text>
          <Icon name="arrowRight" size={20} color="gray_700" />
        </TouchableOpacityBox>
        <TouchableOpacityBox
          flexDirection="row"
          alignItems="center"
          justifyContent="space-between"
          borderBottomColor="gray_disabled_Background"
          borderBottomWidth={1}
          paddingVertical="s16">
          <Text variant="padrao">Termos de uso</Text>
          <Icon name="arrowRight" size={20} color="gray_700" />
        </TouchableOpacityBox>
        <TouchableOpacityBox
          flexDirection="row"
          alignItems="center"
          justifyContent="space-between"
          borderBottomColor="gray_disabled_Background"
          borderBottomWidth={1}
          paddingVertical="s16">
          <Text variant="padrao">Política de privacidade</Text>
          <Icon name="arrowRight" size={20} color="gray_700" />
        </TouchableOpacityBox>
        <Button title="Sair da conta" preset="primary" onPress={logout} />
      </Box>
    </Screen>
  );
}
