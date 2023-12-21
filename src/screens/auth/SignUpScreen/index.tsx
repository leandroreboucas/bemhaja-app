import {useState} from 'react';
import {ImageBackground, Pressable} from 'react-native';

import ImageBg from '@assets/bg-cad.png';
import {useAuthSigIn, useAuthSignUp} from '@domain';
import {zodResolver} from '@hookform/resolvers/zod';
import * as ImagePicker from 'expo-image-picker';
import {useForm} from 'react-hook-form';
import {RFValue} from 'react-native-responsive-fontsize';

import {
  Box,
  ButtonLinear,
  FormDateInputModal,
  FormPasswordInput,
  FormTextInput,
  Loading,
  Screen,
  Text,
} from '@components';
import {useAuthNavigation} from '@hooks';
import {dateUtils, toastUtils} from '@utils';

import {SignUpType, signUpSchema} from './SignUpSchema';

export function SignUpScreen() {
  const [photoBase64, setPhotoBase64] = useState<string | null>(null);
  const [userPhoto, setUserPhoto] = useState<string | null>(null);
  const navigation = useAuthNavigation();

  const {control, formState, handleSubmit, watch} = useForm<SignUpType>({
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

  const {signIn, isLoading: isLoadingSigIn} = useAuthSigIn();

  const {isLoading, signUp} = useAuthSignUp({
    onSucess: () => {
      signIn({
        email: watch('email'),
        password: watch('confirma_senha'),
      });
    },
    onError: message => {
      toastUtils.showToast(message, 'error');
    },
  });

  async function handleUserPhotoSelect() {
    try {
      const photoSelected = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 1,
        base64: true,
        aspect: [4, 4],
      });
      if (!photoSelected.canceled) {
        setUserPhoto(photoSelected.assets[0].uri);
        setPhotoBase64(photoSelected.assets[0].base64!);
      }
    } catch (error) {
      console.log(error);
    } finally {
    }
  }

  function submitForm(form: SignUpType) {
    console.log(form);
    signUp({
      foto: userPhoto ? photoBase64 : userPhoto,
      nome: form.nome,
      email: form.email,
      data_nascimento: dateUtils.formattedDate(form.data_nascimento),
      senha: form.senha,
      adm: false,
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
        {/* <Box paddingBottom="s28" alignItems="center" justifyContent="center">
          {userPhoto ? (
            <ImageCached
              style={{
                borderRadius: RFValue(140 / 2),
                width: RFValue(140),
                height: RFValue(140),
              }}
              source={{
                uri: userPhoto,
              }}
              contentFit="cover"
            />
          ) : (
            <Icon name="camera" size={140} color="primary_300" />
          )}
        </Box>
        <TouchableOpacityBox
          onPress={handleUserPhotoSelect}
          paddingBottom="s28"
          alignItems="center"
          justifyContent="center">
          <Text variant="change_image" textDecorationLine="underline">
            Alterar foto
          </Text>
        </TouchableOpacityBox> */}
        <FormTextInput
          control={control}
          name="nome"
          removeLabel
          required
          label="Nome"
          placeholder="Nome"
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
            loading={isLoading || isLoadingSigIn}
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
