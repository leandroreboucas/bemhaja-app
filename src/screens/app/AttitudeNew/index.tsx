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

export function AttitudeNew() {
  const [visibilidade, setVisibilidade] = useState<
    'TEXT' | 'IMAGE' | 'VIDEO' | 'AUDIO'
  >('TEXT');
  function changeVisibilidade(option: 'TEXT' | 'IMAGE' | 'VIDEO' | 'AUDIO') {
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
      <Header contentRadius canGoBack title="Nova atitude" goHome />
      <Box paddingHorizontal="s24" flex={1}>
        {/**
         * Selecionar evento
         */}
        <Box alignItems="center" justifyContent="center" paddingTop="s16">
          <Icon name="events" size={140} color="primary_300" />
        </Box>
        <TouchableOpacityBox
          paddingTop="s16"
          alignItems="center"
          justifyContent="center">
          <Text variant="change_image" textDecorationLine="underline">
            Selecione um evento(Opcional)
          </Text>
        </TouchableOpacityBox>
        {/**
         * Titulo
         */}
        <Box>
          <TextInput placeholder="Título(Opcional)" label="" />
        </Box>
        {/**
         * Descrição
         */}
        <Box>
          <TextInput
            placeholder="Digite seu texto aqui"
            label=""
            multiline
            numberOfLines={5}
            maxLength={250}
          />
        </Box>

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

            <Text variant="padrao">Imagem/Vídeo</Text>
          </TouchableOpacityBox>
          {/* <TouchableOpacityBox
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
          </TouchableOpacityBox> */}
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
            paddingTop="s16"
            alignItems="flex-end"
            justifyContent="center">
            <Icon name="upload" size={62} color="primary_300" />
          </TouchableOpacityBox>
        )}
        <Box paddingTop="s16">
          <Button title="Selecionar atitude" preset="outline" />
        </Box>

        <Box paddingTop="s16" paddingBottom="s40">
          <ButtonLinear title="Criar" />
        </Box>
      </Box>
    </Screen>
  );
}
