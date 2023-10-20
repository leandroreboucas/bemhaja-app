import {Image, ImageBackground} from 'react-native';

import HeaderImg from '@assets/header.png';
import {BemHajaIcon} from '@assets/icons/BemHajaIcon';
import {LogoOnlyIcon} from '@assets/icons/LogoOnlyIcon';
import {StatusBar} from 'expo-status-bar';
import {RFValue} from 'react-native-responsive-fontsize';

import {useAppNavigation, useAppSafeArea} from '@hooks';

import {Box} from '../Box';
import {Icon} from '../Icon';
import {Text} from '../Text';
import {TouchableOpacityBox} from '../TouchableOpacityBox';

interface HeaderProps {
  contentRadius?: boolean;
  canGoBack?: boolean;
  title?: string;
  goHome?: boolean;
}

export function Header({
  contentRadius = false,
  canGoBack = false,
  title = undefined,
  goHome = false,
}: HeaderProps) {
  const {top} = useAppSafeArea();
  const navigation = useAppNavigation();
  const imageUri = Image.resolveAssetSource(HeaderImg).uri;

  function goNavigate() {
    if (goHome) {
      navigation.navigate('AppTabNavigator', {screen: 'HomeScreen'});
      return;
    }
    console.log('chamou');
    navigation.goBack();
  }

  return (
    <>
      <ImageBackground
        source={{uri: imageUri, cache: 'only-if-cached'}}
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
          alignItems="flex-start"
          borderBottomStartRadius="br10"
          borderBottomEndRadius="br10"
          style={{paddingTop: top}}>
          {canGoBack ? (
            <>
              <TouchableOpacityBox
                onPress={goNavigate}
                height={RFValue(48)}
                flexDirection="row"
                alignItems="center"
                justifyContent="center">
                <Icon name="arrowLeft" color="white" />
              </TouchableOpacityBox>
              {title && (
                <Box
                  height={RFValue(48)}
                  flexDirection="row"
                  alignItems="center"
                  justifyContent="center">
                  <Text variant="friends_title_screen" color="white">
                    {title}
                  </Text>
                </Box>
              )}
              <Box
                height={RFValue(48)}
                flexDirection="row"
                alignItems="center"
                justifyContent="center"
              />
            </>
          ) : (
            <>
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
            </>
          )}
        </Box>
      </ImageBackground>
      {contentRadius && (
        <Box
          backgroundColor="white"
          borderTopStartRadius="br10"
          borderTopEndRadius="br10"
          height={RFValue(30)}
          marginHorizontal="s16"
          // marginBottom={Platform.OS === 'android' ? 's22n' : 's30n'}
          marginBottom="s29n"
        />
      )}
    </>
  );
}
