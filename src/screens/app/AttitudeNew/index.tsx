import {useState} from 'react';
import {Modal, ScrollView} from 'react-native';

import {
  Behavior,
  EventBehaviorCompleted,
  Evento,
  useEventBehaviorCompletedCreate,
} from '@domain';
import {useActionSheet} from '@expo/react-native-action-sheet';
import {MaterialCommunityIcons} from '@expo/vector-icons';
import {zodResolver} from '@hookform/resolvers/zod';
import {useForm} from 'react-hook-form';
import {RFValue} from 'react-native-responsive-fontsize';

import {
  AudioRecorder,
  BehaviorSearchSingle,
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
import {useAppNavigation, useAuthCredentials} from '@hooks';
import {mediaUtils, toastUtils} from '@utils';

import {AtitudeNewType, atitudeNewSchema} from './atitudeNewSchema';

export function AttitudeNew() {
  const [midia, setMidia] = useState<string | null>(null);
  const [isVisibleEventModal, setIsVisibleEventModal] = useState(false);
  const [isVisibleBehaviorModal, setIsVisibleBehaviorModal] = useState(false);
  const [isVisibleAudioModal, setIsVisibleAudioModal] = useState(false);
  const [event, setEvent] = useState<Evento | null>(null);
  const [behavior, setBehavior] = useState<Behavior | null>(null);
  const {authCredentials} = useAuthCredentials();
  const {showActionSheetWithOptions} = useActionSheet();

  const [visibilidade, setVisibilidade] = useState<
    'TEXT' | 'IMAGE' | 'VIDEO' | 'AUDIO'
  >('TEXT');

  const {control, formState, handleSubmit, setValue} = useForm<AtitudeNewType>({
    resolver: zodResolver(atitudeNewSchema),
    defaultValues: {
      tipo: 'TEXT',
      evento_codigo: undefined,
      atitude_codigo: undefined,
      midia_link: null,
      titulo: null,
      texto: null,
    },
    mode: 'onChange',
  });

  const navigation = useAppNavigation();

  const {create, isLoading} = useEventBehaviorCompletedCreate({
    onSucess: () => {
      //todo: show success message
      toastUtils.showToast('Atitude realizada com sucesso', 'success');
      navigation.navigate('AppTabNavigator', {screen: 'HomeScreen'});
    },
    onError: message => {
      toastUtils.showToast(message, 'error');
    },
  });

  function changeVisibilidade(option: 'TEXT' | 'IMAGE' | 'VIDEO' | 'AUDIO') {
    if (visibilidade !== option) {
      setMidia(null);
      setVisibilidade(option);
      setValue('midia_link', null);
      setValue('tipo', option);
    }
  }

  function handleOpenEventModal() {
    setIsVisibleEventModal(true);
  }

  function handleOpenBehaviorModal() {
    setIsVisibleBehaviorModal(true);
  }

  function handleOpenAudioModal() {
    setIsVisibleAudioModal(true);
  }

  function handleCloseEventModal() {
    setIsVisibleEventModal(false);
  }

  function handleCloseBehaviorModal() {
    setIsVisibleBehaviorModal(false);
  }

  function handleCloseAudioModal() {
    setIsVisibleAudioModal(false);
  }

  function changeItemsSelected(evento: Evento | null) {
    setValue('evento_codigo', evento?.codigo!);
    setEvent(evento);
  }

  function changeBehaviorSelected(behavior: Behavior | null) {
    setBehavior(behavior);
    setValue('atitude_codigo', behavior?.codigo!);
  }

  function changeAudioSelected(audio: string | null) {
    setMidia(audio);
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

  async function handleVideoSelect() {
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
            const imageCamera = await mediaUtils.launchVideo();
            if (imageCamera) {
              setMidia(imageCamera);
            }
            break;

          case 1:
            const imageGallery = await mediaUtils.launchLibraryVideo();
            if (imageGallery) {
              setMidia(imageGallery);
            }
            break;
        }
      },
    );
  }

  async function handleSetMidia() {
    if (visibilidade === 'IMAGE') {
      await handleImageSelect();
    } else if (visibilidade === 'VIDEO') {
      await handleVideoSelect();
    } else if (visibilidade === 'AUDIO') {
      handleOpenAudioModal();
    }
  }

  function submitForm(form: EventBehaviorCompleted) {
    if (visibilidade === 'TEXT' && !form.texto) {
      toastUtils.showToast('Digite um texto', 'error');
      return;
    }
    if (visibilidade !== 'TEXT' && !midia) {
      toastUtils.showToast('Selecione uma mídia', 'error');
      return;
    }

    if (!behavior) {
      toastUtils.showToast('Selecione uma atitude', 'error');
      return;
    }

    if (!event) {
      toastUtils.showToast('Selecione um evento', 'error');
      return;
    }

    create({
      evento_codigo: event.codigo!,
      atitude_codigo: behavior.codigo!,
      tipo: visibilidade,
      texto: form.texto!,
      titulo: form.titulo!,
      midia_link: midia,
    });
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
        <Header contentRadius canGoBack title="Realizar atitude" goHome />
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
              name="texto"
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
            {visibilidade === 'VIDEO' && midia && <Feed.Video uri={midia} />}
            {visibilidade === 'AUDIO' && midia && <Feed.Audio uri={midia} />}
            {/**
             * Visibilidade
             */}
            <Box
              paddingTop="s16"
              flexDirection="row"
              alignItems="center"
              justifyContent="center"
              gap="s16">
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
              <TouchableOpacityBox
                onPress={() => changeVisibilidade('VIDEO')}
                flexDirection="row"
                alignItems="center"
                gap="s4">
                <Box
                  width={RFValue(20)}
                  height={RFValue(20)}
                  borderRadius="br10"
                  backgroundColor={
                    visibilidade === 'VIDEO' ? 'primary_500' : 'white'
                  }
                  borderColor="gray_600"
                  borderWidth={RFValue(1)}
                />

                <Text variant="padrao">Vídeo</Text>
              </TouchableOpacityBox>
              <TouchableOpacityBox
                onPress={() => changeVisibilidade('AUDIO')}
                flexDirection="row"
                alignItems="center"
                gap="s4">
                <Box
                  width={RFValue(20)}
                  height={RFValue(20)}
                  borderRadius="br10"
                  backgroundColor={
                    visibilidade === 'AUDIO' ? 'primary_500' : 'white'
                  }
                  borderColor="gray_600"
                  borderWidth={RFValue(1)}
                />

                <Text variant="padrao">Áudio</Text>
              </TouchableOpacityBox>
            </Box>
            {visibilidade !== 'TEXT' && (
              <TouchableOpacityBox
                onPress={handleSetMidia}
                paddingTop="s16"
                alignItems="flex-end"
                justifyContent="center">
                <Icon name="upload" size={62} color="primary_300" />
              </TouchableOpacityBox>
            )}

            {/**
             * Atitudes selecionadas
             */}
            {behavior?.id && (
              <Box paddingTop="s16">
                <Text variant="feed_title">Atitude selecionada</Text>
                <Box
                  key={behavior.id}
                  flexDirection="row"
                  marginHorizontal="s16"
                  alignItems="center"
                  paddingVertical="s8"
                  gap="s16">
                  <Box
                    width={RFValue(16)}
                    height={RFValue(16)}
                    backgroundColor="primary_500"
                  />
                  <Box>
                    <Text variant="friends_card_name">
                      {behavior.descricao}
                    </Text>
                    <Text variant="friends_meta_events_count">
                      {behavior.grupo}
                    </Text>
                  </Box>
                </Box>
              </Box>
            )}
            <Box paddingTop="s16">
              <Button
                onPress={handleOpenBehaviorModal}
                title={behavior ? 'Alterar atitude' : 'Selecionar atitude'}
                preset="outline"
              />
            </Box>

            <Box paddingTop="s16" paddingBottom="s40">
              <Button
                title="Gravar"
                preset="primary"
                loading={isLoading}
                onPress={handleSubmit(submitForm)}
                disabled={
                  !formState.isValid || behavior === null || event === null
                }
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
      <Modal visible={isVisibleBehaviorModal} statusBarTranslucent transparent>
        <BehaviorSearchSingle
          initialItemSelected={behavior}
          closeModal={handleCloseBehaviorModal}
          changeItemSelected={changeBehaviorSelected}
        />
      </Modal>
      <Modal visible={isVisibleAudioModal} statusBarTranslucent transparent>
        <AudioRecorder
          closeModal={handleCloseAudioModal}
          midiaSelected={changeAudioSelected}
        />
      </Modal>
    </>
  );
}
