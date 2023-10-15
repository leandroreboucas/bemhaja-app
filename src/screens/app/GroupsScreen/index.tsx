import {RFValue} from 'react-native-responsive-fontsize';

import {Box, Header, Screen, Text, TouchableOpacityBox} from '@components';
const FILTER_HEIGHT = RFValue(40);
export function GroupsScreen() {
  return (
    <Screen
      style={{paddingBottom: 0, paddingTop: 0, paddingHorizontal: 0, flex: 1}}>
      <Header contentRadius />

      {/**
       * Cabeçalho
       */}
      <Box
        height={FILTER_HEIGHT}
        flexDirection="row"
        alignItems="center"
        justifyContent="space-between"
        marginHorizontal="s16"
        gap="s4"
        borderTopStartRadius="br10"
        borderTopEndRadius="br10">
        <Text paddingLeft="s16" variant="friends_title_screen">
          Grupo de atitudes
        </Text>
        {/* <TouchableOpacityBox paddingRight="s16">
          <Text variant="friends_subtitle_screen">Solicitações(1)</Text>
        </TouchableOpacityBox> */}
      </Box>
    </Screen>
  );
}
