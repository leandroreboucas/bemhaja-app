import {useEffect, useState} from 'react';
import {ScrollView} from 'react-native';

import {useUserGetProfile} from '@domain';
import {zodResolver} from '@hookform/resolvers/zod';
import {dateUtils} from '@utils';
import {parse, parseISO} from 'date-fns';
import * as ImagePicker from 'expo-image-picker';
import {useForm} from 'react-hook-form';
import {RFValue} from 'react-native-responsive-fontsize';

import {
  Box,
  Screen,
  Text,
  ButtonLinear,
  FormTextInput,
  FormDateInputModal,
  ImageCached,
  Icon,
  TouchableOpacityBox,
  Header,
  Loading,
} from '@components';
import {useAuthCredentials, useAuthNavigation} from '@hooks';

import {myProfileSchema, myProfileType} from './myProfileSchema';

export function MyProfileScreen() {
  const {authCredentials} = useAuthCredentials();
  const {user, isFetching} = useUserGetProfile(authCredentials?.user?.email);
  const [photoBase64, setPhotoBase64] = useState<string | null>(null);
  const [userPhoto, setUserPhoto] = useState<string | null>(null);
  const navigation = useAuthNavigation();

  const {control, formState, handleSubmit, setValue} = useForm<myProfileType>({
    resolver: zodResolver(myProfileSchema),
    defaultValues: {
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
      setValue('nome', user.nome);
      setValue('email', user.email);
      setValue('data_nascimento', parseISO(user.data_nascimento.split('T')[0]));
    }
  }, [user]);

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

  function submitForm(form: myProfileType) {
    console.log(dateUtils.formattedDate(form.data_nascimento));
    console.log(form);
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
        <ScrollView style={{marginHorizontal: RFValue(16)}}>
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
