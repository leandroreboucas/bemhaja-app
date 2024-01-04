import {useEffect, useState} from 'react';

import Slider from '@react-native-community/slider';
import {
  AVPlaybackStatus,
  Audio,
  InterruptionModeAndroid,
  InterruptionModeIOS,
} from 'expo-av';
import {RFValue} from 'react-native-responsive-fontsize';

import {useAppTheme} from '@hooks';

import {Box} from '../Box';
import {Icon} from '../Icon';
import {Text} from '../Text';
import {TouchableOpacityBox} from '../TouchableOpacityBox';

interface FeedAudioProps {
  uri: string;
}

const ICON_SIZE = RFValue(32);

export function FeedAudio({uri}: FeedAudioProps) {
  const [sound, setSound] = useState<Audio.Sound>();
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState<number | undefined>(1);
  const [position, setPosition] = useState(0);
  const {colors} = useAppTheme();

  if (!uri) {
    return null;
  }

  async function loadAudio() {
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
    const {sound: soundAudio} = await Audio.Sound.createAsync({uri});
    soundAudio.setOnPlaybackStatusUpdate(onPlaybackStatusUpdate);
    setSound(soundAudio);
  }

  async function onPlaybackStatusUpdate(status: AVPlaybackStatus) {
    if (status.isLoaded) {
      setPosition(status.positionMillis);
      setDuration(status.durationMillis);

      if (status.isPlaying) {
        setIsPlaying(true);
      } else {
        setIsPlaying(false);
      }

      if (status.didJustFinish) {
        setIsPlaying(false);
      }
    }
  }

  async function togglePlayback() {
    if (isPlaying) {
      await sound?.pauseAsync();
    } else {
      if (position === duration) {
        await sound?.setPositionAsync(0);
      }
      await sound?.playAsync();
    }
    setIsPlaying(!isPlaying);
  }

  function formatTime(ms: number) {
    const totalSeconds = Math.floor(ms / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;

    const paddedMinutes = String(minutes).padStart(2, '0');
    const paddedSeconds = String(seconds).padStart(2, '0');

    return `${paddedMinutes}:${paddedSeconds}`;
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    loadAudio();
    return () => {
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, []);

  return (
    <Box
      flex={1}
      marginTop="s16"
      flexDirection="row"
      alignItems="center"
      justifyContent="center"
      backgroundColor="gray_100"
      borderRadius="br10">
      <TouchableOpacityBox
        padding="s8"
        borderRadius="br10"
        backgroundColor="gray_100"
        alignItems="center"
        justifyContent="center"
        onPress={togglePlayback}>
        {isPlaying ? (
          <Box
            height={RFValue(ICON_SIZE)}
            width={RFValue(ICON_SIZE)}
            flexDirection="row"
            gap="s4">
            <Box
              width={RFValue(14)}
              backgroundColor="primary_700"
              borderRadius="br4"
            />
            <Box
              width={RFValue(14)}
              backgroundColor="primary_700"
              borderRadius="br4"
            />
          </Box>
        ) : (
          <Icon name="play" size={ICON_SIZE} color="primary_700" />
        )}
      </TouchableOpacityBox>
      <Slider
        minimumTrackTintColor={colors.primary_700}
        maximumTrackTintColor={colors.gray_700}
        thumbTintColor={colors.primary_700}
        style={{
          height: RFValue(ICON_SIZE),
          flex: 1,
          marginRight: RFValue(8),
        }}
        minimumValue={0}
        maximumValue={duration}
        value={position}
        onSlidingComplete={value => {
          if (sound) {
            sound.setPositionAsync(value);
          }
        }}
      />
      <Text marginRight="s8" variant="friends_meta_events_count">
        {formatTime(position!)}/{formatTime(duration!)}
      </Text>
    </Box>
  );
}
