import {Box, Icon, Screen, Text} from '@components';

export function SettingsScreen() {
  return (
    <Screen>
      <Box
        flexDirection="row"
        borderBottomColor="gray_disabled_Background"
        borderBottomWidth={1}>
        <Text variant="backButton">Termos de uso</Text>
        <Icon name="arrowRight" size={24} color="gray_700" />
      </Box>
      <Text color="black">Settings Screen</Text>
    </Screen>
  );
}
