import {useState} from 'react';
import {Alert, Modal, Platform, ScrollView} from 'react-native';

import {Behavior, Usuario, useEventCreate} from '@domain';
import {useActionSheet} from '@expo/react-native-action-sheet';
import {MaterialCommunityIcons} from '@expo/vector-icons';
import {zodResolver} from '@hookform/resolvers/zod';
import {dateUtils, mediaUtils} from '@utils';
import {useForm} from 'react-hook-form';
import {RFValue} from 'react-native-responsive-fontsize';

import {
  BehaviorSearch,
  Box,
  Button,
  FormDateInputModal,
  FormTextInput,
  FriendCard,
  FriendsSearch,
  Header,
  Icon,
  ImageCached,
  Screen,
  Text,
  TouchableOpacityBox,
} from '@components';
import {useAppNavigation} from '@hooks';

import {EventNewType, eventNewSchema} from './eventNewSchema';

const BEHAVIORS_QTD = 3;
const USERS_QTD = 2;

export function EventNew() {
  const [userPhoto, setUserPhoto] = useState<string | null>(null);
  const [isVisibleBehaviorModal, setIsVisibleBehaviorModal] = useState(false);
  const [isVisibleUsersModal, setIsVisibleUsersModal] = useState(false);
  const {showActionSheetWithOptions} = useActionSheet();
  const [behaviors, setBehaviors] = useState<Behavior[]>([]);
  const [users, setUsers] = useState<Usuario[]>([]);
  const navigation = useAppNavigation();

  const {create, isLoading} = useEventCreate({
    onSucess: () => {
      //todo: show success message
      navigation.navigate('AppTabNavigator', {screen: 'HomeScreen'});
    },
    onError: message => {
      Alert.alert('Atenção', message);
    },
  });

  const [visibilidade, setVisibilidade] = useState<
    'REDE_AMIGOS' | 'PARTICIPANTES_EVENTO' | 'PUBLICO_GERAL'
  >('PARTICIPANTES_EVENTO');

  const {control, formState, handleSubmit, setValue} = useForm<EventNewType>({
    resolver: zodResolver(eventNewSchema),
    defaultValues: {
      nome: undefined,
      visibilidade: 'PARTICIPANTES_EVENTO',
      data_hora_inicio: undefined,
      data_hora_final: undefined,
      presencial_endereco: undefined,
      observacoes: undefined,
      tematico_descricao: undefined,
      virtual_link: undefined,
    },
    mode: 'onChange',
  });

  function changeVisibilidade(
    option: 'REDE_AMIGOS' | 'PARTICIPANTES_EVENTO' | 'PUBLICO_GERAL',
  ) {
    if (visibilidade === 'REDE_AMIGOS' && option !== 'REDE_AMIGOS') {
      setUsers([]);
    }
    if (option === 'REDE_AMIGOS' && visibilidade !== 'REDE_AMIGOS') {
      setUsers([]);
    }
    setVisibilidade(option);
  }

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

  function submitForm(form: EventNewType) {
    create({
      event: {
        ...form,
        foto: userPhoto || undefined,
        visibilidade,
        usuario_codigo: null,
        data_hora_inicio: dateUtils.formattedDateTime(form.data_hora_inicio),
        data_hora_final: form.data_hora_final
          ? dateUtils.formattedDateTime(form.data_hora_final)
          : null,
      },
      behaviors,
      users,
    });
  }

  function handleOpenBehaviorModal() {
    setIsVisibleBehaviorModal(true);
  }

  function handleCloseBehaviorModal() {
    setIsVisibleBehaviorModal(false);
  }

  function changeBehaviorsSelecteds(items: Behavior[]) {
    setBehaviors(items);
  }

  function handleOpenUsersModal() {
    setIsVisibleUsersModal(true);
  }

  function handleCloseUsersModal() {
    setIsVisibleUsersModal(false);
  }

  function changeUsersSelecteds(items: Usuario[]) {
    setUsers(items);
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
        <Header contentRadius canGoBack title="Novo evento" goHome />
        <ScrollView keyboardShouldPersistTaps="handled" style={{flex: 1}}>
          <Box paddingHorizontal="s24" flex={1}>
            {/**
             * Foto do evento
             */}
            <Box
              paddingBottom="s28"
              alignItems="center"
              justifyContent="center">
              {userPhoto ? (
                <ImageCached
                  style={{
                    height: RFValue(300),
                    width: '100%',
                    borderRadius: RFValue(8),
                  }}
                  source={{
                    uri: userPhoto,
                  }}
                  contentFit="cover"
                />
              ) : (
                <Box paddingTop="s16">
                  <Icon name="events" size={140} color="primary_300" />
                </Box>
              )}
            </Box>
            <TouchableOpacityBox
              onPress={handleUserPhotoSelect}
              alignItems="center"
              justifyContent="center">
              <Text variant="change_image" textDecorationLine="underline">
                Escolha uma foto
              </Text>
            </TouchableOpacityBox>

            {/**
             * Nome do evento
             */}
            <FormTextInput
              control={control}
              name="nome"
              removeLabel
              required
              label="Nome"
              placeholder="Nome do evento"
              boxProps={{mt: 's28'}}
              keyboardType="default"
            />

            {/**
             * Visibilidade
             */}
            <Box paddingTop="s16">
              <Text variant="feed_title">Visibilidade</Text>
            </Box>
            <Box paddingTop="s8" flexDirection="row" gap="s24">
              <TouchableOpacityBox
                onPress={() => changeVisibilidade('REDE_AMIGOS')}
                flexDirection="row"
                alignItems="center"
                gap="s4">
                <Box
                  width={RFValue(20)}
                  height={RFValue(20)}
                  borderRadius="br10"
                  backgroundColor={
                    visibilidade === 'REDE_AMIGOS' ? 'primary_500' : 'white'
                  }
                  borderColor="gray_600"
                  borderWidth={RFValue(1)}
                />

                <Text variant="padrao">Amigos</Text>
              </TouchableOpacityBox>
              <TouchableOpacityBox
                onPress={() => changeVisibilidade('PARTICIPANTES_EVENTO')}
                flexDirection="row"
                alignItems="center"
                gap="s4">
                <Box
                  width={RFValue(20)}
                  height={RFValue(20)}
                  borderRadius="br10"
                  backgroundColor={
                    visibilidade === 'PARTICIPANTES_EVENTO'
                      ? 'primary_500'
                      : 'white'
                  }
                  borderColor="gray_600"
                  borderWidth={RFValue(1)}
                />

                <Text variant="padrao">Participantes</Text>
              </TouchableOpacityBox>
              <TouchableOpacityBox
                onPress={() => changeVisibilidade('PUBLICO_GERAL')}
                flexDirection="row"
                alignItems="center"
                gap="s4">
                <Box
                  width={RFValue(20)}
                  height={RFValue(20)}
                  borderRadius="br10"
                  backgroundColor={
                    visibilidade === 'PUBLICO_GERAL' ? 'primary_500' : 'white'
                  }
                  borderColor="gray_600"
                  borderWidth={RFValue(1)}
                />

                <Text variant="padrao">Todos</Text>
              </TouchableOpacityBox>
            </Box>

            {/**
             * Data hora inicio do evento
             */}
            <Box
              paddingTop="s16"
              style={{
                marginBottom:
                  Platform.OS === 'android' ? RFValue(-16) : RFValue(-8),
              }}>
              <Text variant="feed_title">Início</Text>
            </Box>
            <FormDateInputModal
              control={control}
              name="data_hora_inicio"
              typeMode="datetime"
              removeLabel
              required
              label="Data de nascimento"
              placeholder="Data/hora de início"
              boxProps={{mt: 's16'}}
              birthday={false}
            />

            {/**
             * Data hora fim do evento
             */}
            <Box
              paddingTop="s16"
              style={{
                marginBottom:
                  Platform.OS === 'android' ? RFValue(-16) : RFValue(-8),
              }}>
              <Text variant="feed_title">Fim (Opcional)</Text>
            </Box>
            <FormDateInputModal
              control={control}
              name="data_hora_final"
              typeMode="datetime"
              removeLabel
              required
              label="Data de nascimento"
              placeholder="Data/hora final"
              boxProps={{mt: 's16'}}
              birthday={false}
            />

            {/**
             * Endereço do evento
             */}
            <FormTextInput
              control={control}
              name="presencial_endereco"
              removeLabel
              required
              label="Nome"
              placeholder="Endereço"
              boxProps={{mt: 's16'}}
              keyboardType="default"
            />

            {/**
             * Link de acesso
             */}
            <FormTextInput
              control={control}
              name="virtual_link"
              removeLabel
              required
              label="Nome"
              placeholder="Link de acesso virtual (opcional)"
              boxProps={{mt: 's16'}}
              keyboardType="url"
            />

            {/**
             * Tema
             */}
            <FormTextInput
              control={control}
              name="tematico_descricao"
              removeLabel
              required
              label="Nome"
              placeholder="Tema (opcional)"
              boxProps={{mt: 's16'}}
              keyboardType="default"
            />

            {/**
             * Observações
             */}
            <FormTextInput
              control={control}
              name="observacoes"
              removeLabel
              required
              label="Nome"
              placeholder="Observações (opcional)"
              boxProps={{mt: 's16'}}
              keyboardType="default"
              multiline
              numberOfLines={5}
              maxLength={250}
            />

            {/**
             * Atitudes selecionadas
             */}
            {behaviors.length > 0 && (
              <Box paddingTop="s16">
                <Text variant="feed_title">Atitudes selecionadas</Text>
                {behaviors.slice(0, BEHAVIORS_QTD).map(behavior => (
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
                ))}
                {behaviors.length > BEHAVIORS_QTD && (
                  <Box
                    marginHorizontal="s16"
                    alignItems="center"
                    paddingVertical="s8"
                    gap="s16">
                    <Text variant="friends_meta_events_count">
                      +{behaviors.length - BEHAVIORS_QTD} atitudes
                    </Text>
                  </Box>
                )}
              </Box>
            )}

            {/**
             * Atitudes selecionadas
             */}
            {users.length > 0 && (
              <Box paddingTop="s16">
                <Text variant="feed_title">Participantes selecionados</Text>
                {users.slice(0, USERS_QTD).map(user => (
                  <FriendCard key={user.id} item={user} />
                ))}
                {users.length > USERS_QTD && (
                  <Box
                    marginHorizontal="s16"
                    alignItems="center"
                    paddingVertical="s8"
                    gap="s16">
                    <Text variant="friends_meta_events_count">
                      +{users.length - USERS_QTD} participantes
                    </Text>
                  </Box>
                )}
              </Box>
            )}

            {/**
             * Atitudes do evento
             */}
            <Box
              paddingTop="s16"
              flexDirection="row"
              alignItems="center"
              justifyContent="center">
              <Button
                onPress={handleOpenBehaviorModal}
                title="Adicionar/Remover atitudes"
                preset="outline"
                width={RFValue(300)}
              />
            </Box>

            {/**
             * Participantes do evento
             */}
            <Box
              paddingTop="s16"
              flexDirection="row"
              alignItems="center"
              justifyContent="center">
              <Button
                onPress={handleOpenUsersModal}
                title="Convidar participantes"
                preset="outline"
                width={RFValue(300)}
              />
            </Box>

            <Box
              paddingTop="s16"
              paddingBottom="s40"
              flexDirection="row"
              alignItems="center"
              justifyContent="center">
              <Button
                title="Criar"
                preset="primary"
                loading={isLoading}
                disabled={
                  !formState.isValid ||
                  behaviors.length === 0 ||
                  users.length === 0
                }
                onPress={handleSubmit(submitForm)}
                width={RFValue(300)}
              />
            </Box>
          </Box>
        </ScrollView>
      </Screen>
      <Modal visible={isVisibleBehaviorModal} statusBarTranslucent transparent>
        <BehaviorSearch
          initialItemsSelected={behaviors}
          closeModal={handleCloseBehaviorModal}
          changeItemsSelected={changeBehaviorsSelecteds}
        />
      </Modal>
      <Modal visible={isVisibleUsersModal} statusBarTranslucent transparent>
        <FriendsSearch
          initialItemsSelected={users}
          closeModal={handleCloseUsersModal}
          changeItemsSelected={changeUsersSelecteds}
          isUsersAll={visibilidade !== 'REDE_AMIGOS'}
        />
      </Modal>
    </>
  );
}
