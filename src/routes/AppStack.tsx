import {NavigatorScreenParams} from '@react-navigation/native';
import {
  NativeStackNavigationProp,
  createNativeStackNavigator,
} from '@react-navigation/native-stack';

import {EventDetail, SettingsScreen} from '@screens';

import {AppTabNavigator, AppTabRoutes} from './AppTabNavigator';

export type AppRoutes = {
  AppTabNavigator: NavigatorScreenParams<AppTabRoutes>;
  SettingsScreen: undefined;
  EventDetail: {
    event_id: string;
  };
};

export type IAppNavigatorRoutesProps = NativeStackNavigationProp<AppRoutes>;

const {Navigator, Screen} = createNativeStackNavigator<AppRoutes>();
export function AppStack() {
  return (
    <Navigator
      initialRouteName="AppTabNavigator"
      screenOptions={{
        headerShown: false,
        fullScreenGestureEnabled: true,
      }}>
      <Screen name="AppTabNavigator" component={AppTabNavigator} />
      <Screen name="SettingsScreen" component={SettingsScreen} />
      <Screen name="EventDetail" component={EventDetail} />
    </Navigator>
  );
}
