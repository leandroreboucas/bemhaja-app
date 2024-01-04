import {useEffect, useState} from 'react';
import {Dimensions, Pressable} from 'react-native';

import {MaterialCommunityIcons} from '@expo/vector-icons';
import {Audio, InterruptionModeAndroid, InterruptionModeIOS} from 'expo-av';
import {RFValue} from 'react-native-responsive-fontsize';

import {useAppTheme} from '@hooks';
import {toastUtils} from '@utils';

import {Feed} from '../../Feed';

import {Box} from './../../Box';
import {Button} from './../../Button';
import {Screen} from './../../Screen';
import {Text} from './../../Text';
import {TouchableOpacityBox} from './../../TouchableOpacityBox';

interface AudioRecorderProps {
  closeModal: () => void;

  midiaSelected: (midia: string | null) => void;
}

export function AudioRecorder({closeModal, midiaSelected}: AudioRecorderProps) {
  const [recording, setRecording] = useState<Audio.Recording | null>(null);
  const [midia, setMidia] = useState<string | null>(null);
  const {colors} = useAppTheme();

  function goBack() {
    closeModal();
  }

  function handleConfirm() {
    midiaSelected(midia);
    closeModal();
  }

  async function requestPermissions() {
    const {granted} = await Audio.requestPermissionsAsync();
    if (granted) {
      Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        interruptionModeAndroid: InterruptionModeAndroid.DoNotMix,
        interruptionModeIOS: InterruptionModeIOS.DoNotMix,
        playsInSilentModeIOS: true,
        shouldDuckAndroid: true,
        playThroughEarpieceAndroid: true,
      });
    }
  }

  async function startRecording() {
    const {granted} = await Audio.requestPermissionsAsync();
    if (granted) {
      try {
        const {recording} = await Audio.Recording.createAsync();
        setRecording(recording);
      } catch (error) {
        toastUtils.showToast(
          'Não foi possível iniciar a gravação do áudio',
          'error',
        );
      }
    }
  }

  async function stopRecording() {
    try {
      if (recording) {
        await recording?.stopAndUnloadAsync();
        const uri = recording?.getURI();
        console.log('uri', uri);
        setMidia(uri);
        midiaSelected(uri);
        setRecording(null);
      }
    } catch (error) {
      toastUtils.showToast(
        'Não foi possível parar a gravação do áudio',
        'error',
      );
    }
  }

  async function removeAudio() {
    setMidia(null);
    midiaSelected(null);
  }

  useEffect(() => {
    requestPermissions();
  }, []);

  return (
    <Screen
      style={{
        paddingBottom: 0,
        paddingHorizontal: 0,
        flex: 1,
      }}>
      <Box
        flexDirection="row"
        marginHorizontal="s16"
        marginTop="s16"
        alignItems="center"
        justifyContent="center">
        <Text paddingLeft="s16" variant="friends_title_screen">
          Gravação de áudio
        </Text>
      </Box>
      <Box flex={1} alignItems="center" justifyContent="center" gap="s34">
        {midia ? (
          <Box alignItems="center" justifyContent="center" gap="s16">
            <Box
              alignItems="center"
              justifyContent="center"
              height={RFValue(64)}
              width={Dimensions.get('screen').width - RFValue(32)}>
              <Feed.Audio uri={midia} />
            </Box>
            <TouchableOpacityBox onPress={removeAudio}>
              <MaterialCommunityIcons
                name="close-circle"
                size={RFValue(44)}
                color={colors.error}
              />
            </TouchableOpacityBox>
          </Box>
        ) : (
          <Pressable
            onPressIn={startRecording}
            onPressOut={stopRecording}
            style={{
              width: RFValue(94),
              height: RFValue(94),
              borderRadius: RFValue(47),
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: recording ? colors.primary_500 : '#F2F2F2',
            }}>
            <MaterialCommunityIcons
              name={recording ? 'stop' : 'microphone'}
              size={RFValue(44)}
              color={recording ? colors.white : colors.black}
            />
          </Pressable>
        )}
        {recording && (
          <Box>
            <Text variant="friends_title_screen">Gravando...</Text>
          </Box>
        )}
        {!recording && !midia && (
          <Text variant="friends_title_screen">Pressione para gravar</Text>
        )}
      </Box>
      <Box
        flexDirection="row"
        alignItems="center"
        justifyContent="space-around"
        marginBottom="s24">
        <Button
          onPress={goBack}
          title="Voltar"
          preset="gray"
          width={RFValue(150)}
        />
        <Button
          onPress={handleConfirm}
          title="Confirmar"
          preset="primary"
          width={RFValue(150)}
        />
      </Box>
    </Screen>
  );
}
