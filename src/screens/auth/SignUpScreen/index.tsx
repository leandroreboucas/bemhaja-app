import {ImageBackground, Pressable} from 'react-native';

import ImageBg from '@assets/bg-cad.png';
import {zodResolver} from '@hookform/resolvers/zod';
import {useForm} from 'react-hook-form';
import {RFValue} from 'react-native-responsive-fontsize';

import {
  Box,
  Screen,
  Text,
  Icon,
  ButtonLinear,
  Loading,
  FormTextInput,
  FormDateInputModal,
  FormPasswordInput,
} from '@components';
import {useAuthNavigation} from '@hooks';

import {SignUpType, signUpSchema} from './SignUpSchema';

export function SignUpScreen() {
  const navigation = useAuthNavigation();

  const {control, formState, handleSubmit} = useForm<SignUpType>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      nome: '',
      email: '',
      data_nascimento: undefined,
      senha: '',
      confirma_senha: '',
    },
    mode: 'onChange',
  });

  function submitForm(form: SignUpType) {
    console.log(form);
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
          paddingTop="s60"
          paddingBottom="s28"
          alignItems="center"
          justifyContent="center">
          <Text variant="banner_cad">
            Seja bem vindo, vamos começar a espalhar boas ações!
          </Text>
        </Box>
        <Box paddingBottom="s28" alignItems="center" justifyContent="center">
          <Text variant="title_cad" color="gray_700">
            Cadastro
          </Text>
        </Box>
        <Box paddingBottom="s28" alignItems="center" justifyContent="center">
          <Icon name="camera" size={140} color="primary_300" />
        </Box>
        <Box paddingBottom="s28" alignItems="center" justifyContent="center">
          <Text variant="change_image" textDecorationLine="underline">
            Escolha uma foto
          </Text>
        </Box>
        <FormTextInput
          control={control}
          name="nome"
          removeLabel
          required
          label="Nome"
          placeholder="Nome Completo"
          boxProps={{mb: 's28'}}
          keyboardType="default"
        />

        <FormTextInput
          control={control}
          name="email"
          removeLabel
          required
          label="E-mail"
          placeholder="E-mail"
          boxProps={{mb: 's28'}}
          keyboardType="email-address"
        />

        <FormDateInputModal
          control={control}
          name="data_nascimento"
          removeLabel
          required
          label="Data de nascimento"
          placeholder="Data de nascimento"
          boxProps={{mb: 's28'}}
        />

        <FormPasswordInput
          control={control}
          name="senha"
          removeLabel
          required
          label="Senha"
          placeholder="Senha"
          boxProps={{mb: 's28'}}
        />

        <FormPasswordInput
          control={control}
          name="confirma_senha"
          removeLabel
          required
          label="Senha"
          placeholder="Confirmar sua senha"
          boxProps={{mb: 's28'}}
        />

        <Box alignItems="center" mb="s28">
          <ButtonLinear
            disabled={!formState.isValid}
            onPress={handleSubmit(submitForm)}
            title="Cadastrar"
            buttonWidth={RFValue(190)}
          />
        </Box>
        <Box alignItems="center" mb="s160">
          <Pressable onPress={navigation.goBack}>
            <Text
              variant="label_back_button"
              color="gray_700"
              textDecorationLine="underline">
              Voltar
            </Text>
          </Pressable>
        </Box>
      </Screen>
    </ImageBackground>
  );
}
