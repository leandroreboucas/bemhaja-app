import {NavigatorScreenParams} from '@react-navigation/native';
import {
  NativeStackNavigationProp,
  createNativeStackNavigator,
} from '@react-navigation/native-stack';

import {
  AttitudeNew,
  EventDetail,
  EventFeed,
  EventNew,
  FriendsNew,
  PostNew,
  SettingsScreen,
} from '@screens';

import {AppTabNavigator, AppTabRoutes} from './AppTabNavigator';

export type AppRoutes = {
  AppTabNavigator: NavigatorScreenParams<AppTabRoutes>;
  SettingsScreen: undefined;
  EventDetail: {
    event_id: string;
  };
  EventNew: undefined;
  PostNew: undefined;
  AttitudeNew: undefined;
  EventFeed: {
    event_id: string;
  };
  FriendsNew: undefined;
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
      <Screen name="EventNew" component={EventNew} />
      <Screen name="PostNew" component={PostNew} />
      <Screen name="AttitudeNew" component={AttitudeNew} />
      <Screen name="EventFeed" component={EventFeed} />
      <Screen name="FriendsNew" component={FriendsNew} />
    </Navigator>
  );
}
