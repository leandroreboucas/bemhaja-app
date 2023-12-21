import {ImageBackground, Platform, Pressable} from 'react-native';

import ImageBg from '@assets/bg.png';
import {LogoIcon} from '@assets/icons/LogoIcon';
import {useAuthSigIn} from '@domain';
import {zodResolver} from '@hookform/resolvers/zod';
import {useForm} from 'react-hook-form';
import {RFValue} from 'react-native-responsive-fontsize';

import {
  Box,
  ButtonLinear,
  FormPasswordInput,
  FormTextInput,
  Icon,
  Loading,
  Screen,
  Text,
} from '@components';
import {useAuthNavigation} from '@hooks';
import {toastUtils} from '@utils';

import {LoginType, loginSchema} from './LoginSchema';

export function LoginScreen() {
  const {isLoading, signIn} = useAuthSigIn({
    onSucess: () => {
      toastUtils.showToast('Bem vindo de volta, BemHaja 🙏🏻', 'success');
    },
    onError(message) {
      toastUtils.showToast(message, 'error');
    },
  });
  const navigation = useAuthNavigation();
  const {control, formState, handleSubmit} = useForm<LoginType>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      senha: '',
    },
    mode: 'onChange',
  });

  function navigateToSignUpScreen() {
    navigation.navigate('SignUpScreen');
  }

  function navigateToForgoutPasswordScreen() {
    navigation.navigate('ForgoutPasswordScreen');
  }

  function submitForm(form: LoginType) {
    console.log(form);
    signIn({
      email: form.email,
      password: form.senha,
    });
  }

  if (!ImageBg) {
    return <Loading />;
  }

  return (
    <ImageBackground
      source={ImageBg}
      resizeMode="stretch"
      style={{
        justifyContent: 'center',
        width: '100%',
        height: '100%',
        flexDirection: 'column',
      }}>
      <Screen scrollable removeBackgroundColor>
        <Box
          paddingTop="s34"
          paddingBottom="s24"
          alignItems="center"
          justifyContent="center">
          <LogoIcon />
        </Box>

        <FormTextInput
          control={control}
          name="email"
          removeLabel
          required
          label="E-mail"
          placeholder="Digite seu e-mail"
          boxProps={{mb: formState.errors.email?.message ? 's8' : 's24'}}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <FormPasswordInput
          control={control}
          name="senha"
          removeLabel
          required
          label="Senha"
          placeholder="Digite sua senha"
          boxProps={{mb: formState.errors.senha?.message ? 's8' : 's24'}}
        />

        <Box alignItems="center" mb="s24">
          <Pressable
            hitSlop={RFValue(10)}
            onPress={navigateToForgoutPasswordScreen}>
            <Text variant="padrao">Recuperar senha</Text>
          </Pressable>
        </Box>
        <Box alignItems="center" mb="s72">
          <ButtonLinear
            loading={isLoading}
            disabled={!formState.isValid}
            onPress={handleSubmit(submitForm)}
            title="Entrar"
            buttonWidth={RFValue(190)}
          />
        </Box>
        <Box alignItems="center" mb="s24">
          <Text variant="title_300" color="white">
            Faça login com
          </Text>
        </Box>
        <Box
          flexDirection="row"
          justifyContent="space-around"
          alignItems="center"
          mb="s24">
          <Box
            gap="s8"
            flexDirection="column"
            justifyContent="center"
            alignItems="center">
            <Icon name="facebook" size={42} color="white" />
            <Text variant="login_social">Conta Facebook</Text>
          </Box>
          <Box
            gap="s8"
            flexDirection="column"
            justifyContent="center"
            alignItems="center">
            <Icon name="google" size={42} color="white" />
            <Text variant="login_social">Conta Google</Text>
          </Box>
          {Platform.OS === 'ios' && (
            <Box
              gap="s8"
              flexDirection="column"
              justifyContent="center"
              alignItems="center">
              <Icon name="apple" size={42} color="white" />
              <Text variant="login_social">Conta Apple</Text>
            </Box>
          )}
        </Box>
        <Box alignItems="center">
          <Pressable hitSlop={RFValue(10)} onPress={navigateToSignUpScreen}>
            <Text variant="login_social" textDecorationLine="underline">
              Não tem conta? Cadastre-se
            </Text>
          </Pressable>
        </Box>
      </Screen>
    </ImageBackground>
  );
}
