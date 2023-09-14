import {
  BottomTabBarProps,
  BottomTabNavigationProp,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';

import {TabBarBottom} from '@components';
import {
  ActionSheetScreen,
  EventsScreen,
  FriendsScreen,
  GroupsScreen,
  HomeScreen,
} from '@screens';

export type AppTabRoutes = {
  HomeScreen: undefined;
  EventsScreen: undefined;
  ActionSheetScreen: undefined;
  FriendsScreen: undefined;
  GroupsScreen: undefined;
};

export type IAppTabNavigatorRoutesProps = BottomTabNavigationProp<AppTabRoutes>;
const {Navigator, Screen} = createBottomTabNavigator<AppTabRoutes>();

export function AppTabNavigator() {
  function renderTab(props: BottomTabBarProps) {
    return <TabBarBottom {...props} />;
  }

  return (
    <Navigator
      tabBar={renderTab}
      initialRouteName="HomeScreen"
      screenOptions={{
        headerShown: false,
      }}>
      <Screen name="HomeScreen" component={HomeScreen} />
      <Screen name="EventsScreen" component={EventsScreen} />
      <Screen name="ActionSheetScreen" component={ActionSheetScreen} />
      <Screen name="FriendsScreen" component={FriendsScreen} />
      <Screen name="GroupsScreen" component={GroupsScreen} />
    </Navigator>
  );
}
