import {useState} from 'react';
import {Modal, ScrollView} from 'react-native';

import {EventPost, Evento, useEventPostCreate} from '@domain';
import {useActionSheet} from '@expo/react-native-action-sheet';
import {MaterialCommunityIcons} from '@expo/vector-icons';
import {zodResolver} from '@hookform/resolvers/zod';
import {useForm} from 'react-hook-form';
import {RFValue} from 'react-native-responsive-fontsize';

import {
  Box,
  Button,
  EventSearch,
  Feed,
  FormTextInput,
  Header,
  Icon,
  Screen,
  Text,
  TouchableOpacityBox,
} from '@components';
import {useAppNavigation} from '@hooks';
import {mediaUtils, toastUtils} from '@utils';

import {postNewSchema, postNewType} from './postNewSchema';

export function PostNew() {
  const [isVisibleEventModal, setIsVisibleEventModal] = useState(false);
  const [event, setEvent] = useState<Evento | null>(null);
  const [midia, setMidia] = useState<string | null>(null);
  const [visibilidade, setVisibilidade] = useState<'TEXT' | 'IMAGE'>('TEXT');

  const {control, formState, handleSubmit, setValue} = useForm<postNewType>({
    resolver: zodResolver(postNewSchema),
    defaultValues: {
      tipo: 'TEXT',
      evento_codigo: null,
      foto: null,
      titulo: null,
      descricao: null,
    },
    mode: 'onChange',
  });

  const navigation = useAppNavigation();
  const {showActionSheetWithOptions} = useActionSheet();

  const {create, isLoading} = useEventPostCreate({
    onSucess: () => {
      //todo: show success message
      toastUtils.showToast('Postagem realizada com sucesso', 'success');
      navigation.navigate('AppTabNavigator', {screen: 'HomeScreen'});
    },
    onError: message => {
      toastUtils.showToast(message, 'error');
    },
  });

  function changeVisibilidade(option: 'TEXT' | 'IMAGE') {
    if (visibilidade !== option) {
      setMidia(null);
      setValue('foto', null);
      setValue('tipo', option);
      setVisibilidade(option);
    }
  }

  function handleOpenEventModal() {
    setIsVisibleEventModal(true);
  }

  function handleCloseEventModal() {
    setIsVisibleEventModal(false);
  }

  function changeItemsSelected(evento: Evento | null) {
    setValue('evento_codigo', evento?.codigo!);
    setEvent(evento);
  }

  async function handleImageSelect() {
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
              setMidia(imageCamera);
            }
            break;

          case 1:
            const imageGallery = await mediaUtils.launchLibraryImage();
            if (imageGallery) {
              setMidia(imageGallery);
            }
            break;
        }
      },
    );
  }

  function submitForm(form: EventPost) {
    if (!event) {
      toastUtils.showToast('Selecione um evento', 'error');
      return;
    }

    if (visibilidade !== 'TEXT' && !midia) {
      toastUtils.showToast('Selecione uma imagem', 'error');
    }

    create(form);
  }

  return (
    <>
      <Screen
        style={{
          paddingBottom: 0,
          paddingTop: 0,
          paddingHorizontal: 0,
          flex: 1,
        }}>
        <Header contentRadius canGoBack title="Nova postagem" goHome />
        <ScrollView keyboardShouldPersistTaps="handled" style={{flex: 1}}>
          <Box paddingHorizontal="s24" flex={1}>
            {/**
             * Selecionar evento
             */}
            <Box alignItems="center" justifyContent="center" paddingTop="s16">
              {event ? (
                <Feed.Event item={event} navigateEventDetail={false} />
              ) : (
                <Icon name="events" size={140} color="primary_300" />
              )}
            </Box>
            <TouchableOpacityBox
              onPress={handleOpenEventModal}
              paddingTop="s16"
              alignItems="center"
              justifyContent="center">
              <Text variant="change_image" textDecorationLine="underline">
                {event ? 'Alterar ' : 'Selecione um '}evento
              </Text>
            </TouchableOpacityBox>
            {/**
             * Titulo
             */}
            <FormTextInput
              control={control}
              name="titulo"
              removeLabel
              required
              label="Título(opcional)"
              placeholder="Título(opcional)"
              boxProps={{mt: 's28'}}
              keyboardType="default"
            />
            {/**
             * Descrição
             */}
            <FormTextInput
              control={control}
              name="descricao"
              removeLabel
              required
              label="Digite seu texto aqui"
              placeholder="Digite seu texto aqui"
              boxProps={{mt: 's28'}}
              keyboardType="default"
              multiline
              numberOfLines={5}
              maxLength={250}
            />

            {visibilidade === 'IMAGE' && midia && <Feed.Image foto={midia} />}

            <Box
              paddingTop="s16"
              flexDirection="row"
              alignItems="center"
              justifyContent="center"
              gap="s24">
              <TouchableOpacityBox
                onPress={() => changeVisibilidade('TEXT')}
                flexDirection="row"
                alignItems="center"
                gap="s4">
                <Box
                  width={RFValue(20)}
                  height={RFValue(20)}
                  borderRadius="br10"
                  backgroundColor={
                    visibilidade === 'TEXT' ? 'primary_500' : 'white'
                  }
                  borderColor="gray_600"
                  borderWidth={RFValue(1)}
                />

                <Text variant="padrao">Texto</Text>
              </TouchableOpacityBox>
              <TouchableOpacityBox
                onPress={() => changeVisibilidade('IMAGE')}
                flexDirection="row"
                alignItems="center"
                gap="s4">
                <Box
                  width={RFValue(20)}
                  height={RFValue(20)}
                  borderRadius="br10"
                  backgroundColor={
                    visibilidade === 'IMAGE' ? 'primary_500' : 'white'
                  }
                  borderColor="gray_600"
                  borderWidth={RFValue(1)}
                />

                <Text variant="padrao">Imagem</Text>
              </TouchableOpacityBox>
            </Box>
            {visibilidade === 'IMAGE' && (
              <TouchableOpacityBox
                onPress={handleImageSelect}
                paddingTop="s16"
                alignItems="flex-end"
                justifyContent="center">
                <Icon name="upload" size={62} color="primary_300" />
              </TouchableOpacityBox>
            )}
            {/**
             * Data
             */}

            <Box paddingTop="s16" paddingBottom="s40">
              <Button
                onPress={handleSubmit(submitForm)}
                loading={isLoading}
                title="Gravar"
                preset="primary"
                disabled={!formState.isValid || event === null}
              />
            </Box>
          </Box>
        </ScrollView>
      </Screen>
      <Modal visible={isVisibleEventModal} statusBarTranslucent transparent>
        <EventSearch
          initialItemsSelected={event}
          changeItemsSelected={changeItemsSelected}
          closeModal={handleCloseEventModal}
        />
      </Modal>
    </>
  );
}
