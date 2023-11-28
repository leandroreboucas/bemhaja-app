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
import {useAppNavigation} from '@hooks';

export function ConfigScreen() {
  const navigation = useAppNavigation();
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

  function handleGoTermOfUse() {
    navigation.navigate('TermsOfUseScreen');
  }
  function handleGoChangePassword() {
    navigation.navigate('ChangePasswordScreen');
  }
  function handleGoMyProfile() {
    navigation.navigate('MyProfileScreen');
  }

  return (
    <Screen
      style={{
        paddingBottom: 0,
        paddingTop: 0,
        paddingHorizontal: 0,
        flex: 1,
      }}>
      <Header contentRadius canGoBack title="Configurações" />

      <Box marginHorizontal="s28">
        <TouchableOpacityBox
          onPress={handleGoMyProfile}
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
          onPress={handleGoChangePassword}
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
          onPress={handleGoTermOfUse}
          flexDirection="row"
          alignItems="center"
          justifyContent="space-between"
          borderBottomColor="gray_disabled_Background"
          borderBottomWidth={1}
          paddingVertical="s16"
          marginBottom="s16">
          <Text variant="padrao">Termos e condições de uso</Text>
          <Icon name="arrowRight" size={20} color="gray_700" />
        </TouchableOpacityBox>

        <Button title="Sair da conta" preset="primary" onPress={logout} />
      </Box>
    </Screen>
  );
}
