import { StatusBar } from "expo-status-bar";
import * as SplashScreen from "expo-splash-screen";
import {
  useFonts,
  Roboto_300Light,
  Roboto_400Regular,
  Roboto_500Medium,
  Roboto_700Bold,
} from "@expo-google-fonts/roboto";

import {
  Poppins_300Light,
  Poppins_500Medium,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";
import { Home } from "@screens/Home";
import { ThemeProvider } from "@shopify/restyle";
import { theme } from "@themes/index";
import { SafeAreaView } from "react-native";

export default function App() {
  SplashScreen.preventAutoHideAsync();

  const [fontsLoaded] = useFonts({
    Roboto_300Light,
    Roboto_400Regular,
    Roboto_500Medium,
    Roboto_700Bold,
    Poppins_300Light,
    Poppins_500Medium,
    Poppins_700Bold,
  });

  if (!fontsLoaded) {
    return null;
  }

  SplashScreen.hideAsync();

  return (
    <>
      <StatusBar style="auto" backgroundColor="transparent" translucent />
      <ThemeProvider theme={theme}>
        <Home />
      </ThemeProvider>
    </>
  );
}
