import {Image, ImageBackground, Platform} from 'react-native';

import HeaderImg from '@assets/header.png';
import {BemHajaIcon} from '@assets/icons/BemHajaIcon';
import {LogoOnlyIcon} from '@assets/icons/LogoOnlyIcon';
import {StatusBar} from 'expo-status-bar';
import {RFValue} from 'react-native-responsive-fontsize';

import {useAppSafeArea} from '@hooks';

import {Box} from '../Box';
import {Icon} from '../Icon';

interface HeaderProps {
  contentRadius?: boolean;
}

export function Header({contentRadius = false}: HeaderProps) {
  const {top} = useAppSafeArea();
  return (
    <>
      <ImageBackground
        source={HeaderImg}
        resizeMode="cover"
        style={{
          height: contentRadius ? RFValue(120) : RFValue(110),
          width: '100%',
          marginBottom: contentRadius ? RFValue(-30) : 0,
        }}>
        <StatusBar style="light" backgroundColor="transparent" translucent />
        <Box
          flex={1}
          flexDirection="row"
          paddingHorizontal="s24"
          justifyContent="space-between"
          alignItems={contentRadius ? 'flex-start' : 'center'}
          borderBottomStartRadius="br10"
          borderBottomEndRadius="br10"
          style={{paddingTop: top}}>
          <Box
            height={RFValue(48)}
            flexDirection="row"
            gap="s8"
            alignItems="center">
            <LogoOnlyIcon />
            <BemHajaIcon />
          </Box>
          <Box flexDirection="row" gap="s16" alignItems="center">
            <Icon name="notification" color="white" size={24} />
            <Image
              source={{uri: 'https://github.com/leandroreboucas.png'}}
              style={{width: RFValue(48), height: RFValue(48)}}
              borderRadius={RFValue(48) / 2}
              resizeMode="cover"
            />
          </Box>
        </Box>
      </ImageBackground>
      {contentRadius && (
        <Box
          borderTopStartRadius="br10"
          borderTopEndRadius="br10"
          height={RFValue(30)}
          backgroundColor="white"
          marginHorizontal="s16"
          // marginBottom={Platform.OS === 'android' ? 's22n' : 's30n'}
          marginBottom="s28n"
        />
      )}
    </>
  );
}
