import {ActionSheetProvider} from '@expo/react-native-action-sheet';
import {
  Poppins_300Light,
  Poppins_500Medium,
  Poppins_700Bold,
} from '@expo-google-fonts/poppins';
import {
  Roboto_300Light,
  Roboto_400Regular,
  Roboto_500Medium,
  Roboto_700Bold,
  useFonts,
} from '@expo-google-fonts/roboto';
import {ThemeProvider} from '@shopify/restyle';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import * as SplashScreen from 'expo-splash-screen';
import {StatusBar} from 'expo-status-bar';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';

import {Router} from '@routes';
import {AuthCredentialsProvider} from '@services';
import {theme} from '@themes';

const queryClient = new QueryClient();

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
    <AuthCredentialsProvider>
      <QueryClientProvider client={queryClient}>
        <SafeAreaProvider>
          <StatusBar style="auto" backgroundColor="transparent" translucent />
          <ThemeProvider theme={theme}>
            <ActionSheetProvider>
              <Router />
            </ActionSheetProvider>
          </ThemeProvider>
        </SafeAreaProvider>
      </QueryClientProvider>
      <Toast />
    </AuthCredentialsProvider>
  );
}
