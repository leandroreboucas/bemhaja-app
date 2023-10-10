import {Dimensions, ImageBackground} from 'react-native';

import AddEvent from '@assets/icons/addEvent.svg';
import TabBottomPng from '@assets/tabBottom.png';
import {BottomTabBarProps} from '@react-navigation/bottom-tabs';
import {RFValue} from 'react-native-responsive-fontsize';

import {AppTabRoutes} from '@routes';

import {Box} from '../Box';
import {Icon} from '../Icon';
import {Text} from '../Text';
import {TouchableOpacityBox} from '../TouchableOpacityBox';

import {mapScreenToProps} from './mapScreenToProps';

export function TabBarBottom({
  state,
  descriptors,
  navigation,
}: BottomTabBarProps) {
  return (
    <ImageBackground
      source={TabBottomPng}
      resizeMode="cover"
      style={{
        height: RFValue(80),
        width: '100%',
      }}>
      <Box
        flex={1}
        flexDirection="row"
        alignItems="center"
        justifyContent="center">
        {state.routes.map((route, index) => {
          const {options} = descriptors[route.key];

          const tabItem = mapScreenToProps[route.name as keyof AppTabRoutes];
          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              // The `merge: true` option makes sure that the params inside the tab screen are preserved
              navigation.navigate({
                name: route.name,
                merge: true,
                params: route.params,
              });
            }
          };

          const onLongPress = () => {
            navigation.emit({
              type: 'tabLongPress',
              target: route.key,
            });
          };

          return (
            <TouchableOpacityBox
              key={tabItem.label}
              activeOpacity={1}
              alignItems="center"
              accessibilityRole="button"
              accessibilityState={isFocused ? {selected: true} : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
              onLongPress={onLongPress}
              flex={1}>
              {route.name === 'ActionSheetScreen' ? (
                <AddEvent
                  width={RFValue(tabItem.size)}
                  height={RFValue(tabItem.size)}
                />
              ) : (
                <>
                  <Icon
                    name={tabItem.icon}
                    size={tabItem.size}
                    color={isFocused ? 'primary_300' : 'gray_300'}
                  />

                  <Text
                    variant={isFocused ? 'bottom_tabs_focused' : 'bottom_tabs'}>
                    {tabItem.label}
                  </Text>
                </>
              )}
            </TouchableOpacityBox>
          );
        })}
      </Box>
    </ImageBackground>
  );
}
