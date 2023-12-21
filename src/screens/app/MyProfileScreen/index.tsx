import {useEffect, useState} from 'react';
import {ScrollView} from 'react-native';

import {useUserGetProfile, useUserUpdateProfile} from '@domain';
import {useActionSheet} from '@expo/react-native-action-sheet';
import {MaterialCommunityIcons} from '@expo/vector-icons';
import {zodResolver} from '@hookform/resolvers/zod';
import {parseISO} from 'date-fns';
import {useForm} from 'react-hook-form';
import {RFValue} from 'react-native-responsive-fontsize';

import {
  Box,
  ButtonLinear,
  FormDateInputModal,
  FormTextInput,
  Header,
  Icon,
  ImageCached,
  Loading,
  Screen,
  Text,
  TouchableOpacityBox,
} from '@components';
import {useAuthCredentials} from '@hooks';
import {dateUtils, mediaUtils, toastUtils} from '@utils';

import {myProfileSchema, myProfileType} from './myProfileSchema';

export function MyProfileScreen() {
  const {authCredentials} = useAuthCredentials();
  const {user, isFetching} = useUserGetProfile(authCredentials?.user?.email);
  const {isLoading, updateProfile} = useUserUpdateProfile({
    onSucess: () => {
      toastUtils.showToast('Perfil atualizado com sucesso', 'success');
    },
    onError: message => {
      toastUtils.showToast(message, 'error');
    },
  });

  const [userPhoto, setUserPhoto] = useState<string | null>(null);
  const {showActionSheetWithOptions} = useActionSheet();

  const {control, formState, handleSubmit, setValue} = useForm<myProfileType>({
    resolver: zodResolver(myProfileSchema),
    defaultValues: {
      id: '',
      nome: '',
      email: '',
      data_nascimento: undefined,
    },
    mode: 'onChange',
  });

  useEffect(() => {
    if (user) {
      if (user.foto) {
        setUserPhoto(user.foto);
      }
      setValue('id', user.id!);
      setValue('nome', user.nome);
      setValue('email', user.email);
      setValue('data_nascimento', parseISO(user.data_nascimento.split('T')[0]));
    }
  }, [user]);

  async function handleUserPhotoSelect() {
    const options = ['Câmera', 'Galeria', 'Cancelar'];
    showActionSheetWithOptions(
      {
        options,

        title: 'Escolha uma opção',
        cancelButtonIndex: 2,

        icons: [
          <MaterialCommunityIcons name="camera" size={24} color="black" />,
          <MaterialCommunityIcons name="image" size={24} color="black" />,
          <MaterialCommunityIcons name="backspace" size={24} color="black" />,
        ],
      },
      async selectedIndex => {
        switch (selectedIndex) {
          case 0:
            const imageCamera = await mediaUtils.launchCameraImage();
            if (imageCamera) {
              setUserPhoto(imageCamera);
            }
            break;

          case 1:
            const imageGallery = await mediaUtils.launchLibraryImage();
            if (imageGallery) {
              setUserPhoto(imageGallery);
            }
            break;
        }
      },
    );
  }

  function submitForm(form: myProfileType) {
    updateProfile({
      ...form,
      data_nascimento: dateUtils.formattedDate(form.data_nascimento),
      foto: userPhoto || undefined,
    });
  }

  return (
    <Screen
      style={{
        paddingBottom: 0,
        paddingTop: 0,
        paddingHorizontal: 0,
        flex: 1,
      }}>
      <Header contentRadius canGoBack title="Meu perfil" />
      {isFetching ? (
        <Loading />
      ) : (
        <ScrollView
          style={{marginHorizontal: RFValue(16)}}
          keyboardShouldPersistTaps="handled">
          <Box marginTop="s16">
            <Box
              paddingBottom="s28"
              alignItems="center"
              justifyContent="center">
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
            </TouchableOpacityBox>
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

            <Box alignItems="center" mb="s28">
              <ButtonLinear
                loading={isLoading}
                disabled={!formState.isValid}
                onPress={handleSubmit(submitForm)}
                title="Salvar alterações"
                buttonWidth={RFValue(190)}
              />
            </Box>
          </Box>
        </ScrollView>
      )}
    </Screen>
  );
}
