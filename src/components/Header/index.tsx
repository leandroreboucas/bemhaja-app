import {Dimensions, Image, ImageBackground} from 'react-native';

import HeaderImg from '@assets/header.png';
import {BemHajaIcon} from '@assets/icons/BemHajaIcon';
import {LogoOnlyIcon} from '@assets/icons/LogoOnlyIcon';
import {StatusBar} from 'expo-status-bar';
import {RFValue} from 'react-native-responsive-fontsize';

import {useAppSafeArea} from '@hooks';

import {Box} from '../Box';
import {Icon} from '../Icon';

export function Header() {
  const {top} = useAppSafeArea();
  return (
    <ImageBackground
      source={HeaderImg}
      resizeMode="cover"
      style={{
        height: RFValue(130),
        // width: Dimensions.get('screen').width,
        width: '100%',
        marginBottom: RFValue(-40),
      }}>
      <StatusBar style="light" backgroundColor="transparent" translucent />
      <Box
        flexDirection="row"
        paddingHorizontal="s24"
        justifyContent="space-between"
        style={{paddingTop: top}}>
        <Box flexDirection="row" gap="s8" alignItems="center">
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
  );
}
