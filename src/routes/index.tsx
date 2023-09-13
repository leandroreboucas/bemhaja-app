import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { ForgoutPasswordScreen, LoginScreen, SignUpScreen } from "@screens";

export type RootStackParamList = {
  LoginScreen: undefined;
  SignUpScreen: undefined;
  ForgoutPasswordScreen: undefined;
};

const { Navigator, Screen } = createNativeStackNavigator<RootStackParamList>();

export function Router() {
  return (
    <NavigationContainer>
      <Navigator
        initialRouteName="LoginScreen"
        screenOptions={{
          headerShown: false,
          fullScreenGestureEnabled: true,
        }}
      >
        <Screen name="LoginScreen" component={LoginScreen} />
        <Screen name="SignUpScreen" component={SignUpScreen} />
        <Screen
          name="ForgoutPasswordScreen"
          component={ForgoutPasswordScreen}
        />
      </Navigator>
    </NavigationContainer>
  );
}
