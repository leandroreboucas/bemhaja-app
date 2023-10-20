import {useState} from 'react';
import {Platform} from 'react-native';

import {RFValue} from 'react-native-responsive-fontsize';

import {
  Screen,
  Header,
  Box,
  Text,
  Icon,
  TouchableOpacityBox,
  TextInput,
  DateInputModal,
  Button,
  ButtonLinear,
} from '@components';

export function EventNew() {
  const [visibilidade, setVisibilidade] = useState<
    'REDE_AMIGOS' | 'PARTICIPANTES_EVENTO' | 'PUBLICO_GERAL'
  >('PARTICIPANTES_EVENTO');

  const [inicio, setInicio] = useState<Date>(new Date());

  function changeVisibilidade(
    option: 'REDE_AMIGOS' | 'PARTICIPANTES_EVENTO' | 'PUBLICO_GERAL',
  ) {
    setVisibilidade(option);
  }

  return (
    <Screen
      scrollable
      style={{
        paddingBottom: 0,
        paddingTop: 0,
        paddingHorizontal: 0,
        flex: 1,
      }}>
      <Header contentRadius canGoBack title="Novo evento" goHome />

      <Box paddingTop="s16" paddingHorizontal="s24" flex={1}>
        {/**
         * Foto do evento
         */}
        <Box alignItems="center" justifyContent="center">
          <Icon name="camera" size={140} color="primary_300" />
        </Box>
        <TouchableOpacityBox
          paddingTop="s16"
          alignItems="center"
          justifyContent="center">
          <Text variant="change_image" textDecorationLine="underline">
            Escolha uma foto
          </Text>
        </TouchableOpacityBox>

        {/**
         * Nome do evento
         */}
        <Box paddingTop="s16">
          <TextInput placeholder="Nome do evento" label="" />
        </Box>

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
        <DateInputModal
          label=""
          typeMode="datetime"
          setDateField={date => setInicio(date!)}
          value={
            inicio?.toLocaleDateString('pt-BR') +
            ' ' +
            inicio?.toLocaleTimeString('pt-BR')
          }
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
        <DateInputModal
          label=""
          typeMode="datetime"
          setDateField={date => setInicio(date!)}
          value={
            inicio?.toLocaleDateString('pt-BR') +
            ' ' +
            inicio?.toLocaleTimeString('pt-BR')
          }
        />

        {/**
         * Endereço do evento
         */}
        <Box>
          <TextInput placeholder="Endereço" label="" />
        </Box>

        {/**
         * Descrição do evento
         */}
        <Box>
          <TextInput
            placeholder="Descrição"
            label=""
            multiline
            numberOfLines={5}
            maxLength={250}
          />
        </Box>

        {/**
         * Atitudes do evento
         */}
        <Box paddingTop="s16">
          <Button title="Adicionar atitude(s)" preset="outline" />
        </Box>

        <Box paddingTop="s16" paddingBottom="s40">
          <ButtonLinear title="Criar" />
        </Box>
      </Box>
    </Screen>
  );
}
