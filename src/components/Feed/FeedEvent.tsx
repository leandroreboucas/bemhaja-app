import {Image} from 'react-native';

import {FeedDTO} from '@dtos';
import {RFValue} from 'react-native-responsive-fontsize';

import {Box} from '../Box';
import {Text} from '../Text';
import {TouchableOpacityBox} from '../TouchableOpacityBox';

interface FeedContentNewEventProps {
  item: FeedDTO;
}

export function FeedEvent({item}: FeedContentNewEventProps) {
  return (
    <Box
      flex={1}
      flexDirection="row"
      padding="s8"
      marginBottom="s16"
      backgroundColor="gray_100"
      borderRadius="br10">
      <TouchableOpacityBox
        flex={1}
        flexDirection="row"
        backgroundColor="gray_100"
        gap="s16"
        borderRightColor="primary_700"
        borderRightWidth={RFValue(4)}
        borderTopRightRadius="br10"
        alignItems="center">
        <Image
          source={{uri: item.evento?.foto}}
          style={{
            height: RFValue(84),
            width: RFValue(84),
            borderRadius: RFValue(10),
          }}
        />
        <Box justifyContent="space-between" flex={1} gap="s4">
          <Box>
            <Text variant="feed_desc_evento">{item.evento?.descricao}</Text>
          </Box>
          <Box flexDirection="row" justifyContent="flex-start" gap="s4">
            <Text variant="feed_data_hora_bold">Inicio:</Text>
            <Text variant="feed_data_hora">
              {item.evento?.data_hora_inicio}
            </Text>
          </Box>
          <Box flexDirection="row" justifyContent="flex-start" gap="s4">
            <Text variant="feed_data_hora_bold">Fim:</Text>
            <Text variant="feed_data_hora">
              {item.evento?.data_hora_final || 'Sem definição'}
            </Text>
          </Box>
          <Text variant="feed_data_hora_bold">Participantes: 10</Text>
        </Box>
      </TouchableOpacityBox>
    </Box>
  );
}
