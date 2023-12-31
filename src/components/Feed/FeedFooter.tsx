import {Evento} from '@domain';
import {RFValue} from 'react-native-responsive-fontsize';

import {Box} from '../Box';
import {Icon} from '../Icon';
import {Text} from '../Text';
import {TouchableOpacityBox} from '../TouchableOpacityBox';

interface FeedFooterProps {
  evento: Evento;
  text?: string;
}

export function FeedFooter({evento, text}: FeedFooterProps) {
  if (!evento) {
    return null;
  }
  return (
    <TouchableOpacityBox
      flex={1}
      backgroundColor="white"
      flexDirection="row"
      marginTop="s16"
      marginBottom="s16"
      justifyContent="space-between"
      alignItems="center">
      <Box gap="s16" flexDirection="row" alignItems="center">
        <Icon name="events" color="primary_500" size={RFValue(16)} />
        <Text variant="feed_title">{text ? text : evento.nome}</Text>
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
    </TouchableOpacityBox>
  );
}
