import {EventoDTO} from '@dtos';
import {RFValue} from 'react-native-responsive-fontsize';

import {Box} from '../Box';
import {Icon} from '../Icon';
import {Text} from '../Text';

interface FeedFooterProps {
  evento: EventoDTO;
}

export function FeedFooter({evento}: FeedFooterProps) {
  return (
    <Box
      flex={1}
      flexDirection="row"
      marginBottom="s16"
      justifyContent="space-between"
      alignItems="center">
      <Box gap="s16" flexDirection="row" alignItems="center">
        <Icon name="events" color="primary_500" size={RFValue(16)} />
        <Text variant="feed_title">{evento.descricao}</Text>
      </Box>
      <Box
        backgroundColor="primary_500"
        paddingHorizontal="s8"
        paddingVertical="s4"
        borderRadius="br10"
        alignItems="center"
        justifyContent="center">
        <Icon name="arrowRight" color="white" size={RFValue(12)} />
      </Box>
    </Box>
  );
}
