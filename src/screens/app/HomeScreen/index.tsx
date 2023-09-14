import {Button, Screen, Text} from '@components';
import {useAppNavigation} from '@hooks';

export function HomeScreen() {
  const navigation = useAppNavigation();
  function goSettings() {
    navigation.navigate('SettingsScreen');
  }
  return (
    <Screen>
      <Text variant="banner_cad">Home Screen</Text>
      <Button title="Settings" onPress={goSettings} />
    </Screen>
  );
}
