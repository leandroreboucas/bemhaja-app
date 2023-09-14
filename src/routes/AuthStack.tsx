import {
  NativeStackNavigationProp,
  createNativeStackNavigator,
} from '@react-navigation/native-stack';

import {ForgoutPasswordScreen, LoginScreen, SignUpScreen} from '@screens';

type AuthRoutes = {
  LoginScreen: undefined;
  SignUpScreen: undefined;
  ForgoutPasswordScreen: undefined;
};

export type IAuthNavigatorRoutesProps = NativeStackNavigationProp<AuthRoutes>;

const {Navigator, Screen} = createNativeStackNavigator<AuthRoutes>();

export function AuthStack() {
  return (
    <Navigator
      initialRouteName="LoginScreen"
      screenOptions={{
        headerShown: false,
        fullScreenGestureEnabled: true,
      }}>
      <Screen name="LoginScreen" component={LoginScreen} />
      <Screen name="SignUpScreen" component={SignUpScreen} />
      <Screen name="ForgoutPasswordScreen" component={ForgoutPasswordScreen} />
    </Navigator>
  );
}
