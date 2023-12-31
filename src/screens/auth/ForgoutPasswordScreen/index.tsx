import {ImageBackground, Pressable} from 'react-native';

import ImageBg from '@assets/bg-cad.png';
import {useAuthResetPassword} from '@domain';
import {zodResolver} from '@hookform/resolvers/zod';
import {useForm} from 'react-hook-form';
import {RFValue} from 'react-native-responsive-fontsize';

import {
  Box,
  ButtonLinear,
  FormTextInput,
  Loading,
  Screen,
  Text,
} from '@components';
import {useAuthNavigation} from '@hooks';
import {toastUtils} from '@utils';

import {
  ForgoutPasswordType,
  forgoutPasswordSchema,
} from './ForgoutPasswordSchema';

export function ForgoutPasswordScreen() {
  const navigation = useAuthNavigation();
  const {isLoading, resetPassword} = useAuthResetPassword({
    onSucess: () => {
      toastUtils.showToast(
        'Foi enviado um e-mail com os passos para recuperação da senha',
        'success',
      );
      navigation.goBack();
    },
  });
  const {control, formState, handleSubmit} = useForm<ForgoutPasswordType>({
    resolver: zodResolver(forgoutPasswordSchema),
    defaultValues: {
      email: '',
    },
    mode: 'onChange',
  });
  function submitForm(form: ForgoutPasswordType) {
    console.log(form);
    resetPassword(form);
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
          <Text variant="banner_cad">Esqueci minha senha</Text>
        </Box>
        <Box paddingBottom="s28" alignItems="center" justifyContent="center">
          <Text variant="title_cad" color="gray_700">
            Digite seu e-mail e enviaremos as instruções para a recuperação de
            senha
          </Text>
        </Box>

        <FormTextInput
          control={control}
          name="email"
          removeLabel
          required
          label="E-mail"
          placeholder="Digite seu e-mail"
          boxProps={{mb: 's28'}}
          keyboardType="email-address"
        />

        <Box alignItems="center" mb="s28">
          <ButtonLinear
            loading={isLoading}
            disabled={!formState.isValid}
            onPress={handleSubmit(submitForm)}
            title="Recuperar senha"
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
