import {Box, Header, Screen, Text} from '@components';

export function FriendsScreen() {
  return (
    <Screen
      style={{paddingBottom: 0, paddingTop: 0, paddingHorizontal: 0, flex: 1}}>
      <Header contentRadius />
      <Box alignItems="center" justifyContent="center">
        <Text variant="banner_cad">Amigos</Text>
      </Box>
    </Screen>
  );
}
