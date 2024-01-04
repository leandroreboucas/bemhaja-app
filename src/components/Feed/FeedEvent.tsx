import {Evento, EventoDTO} from '@domain';
import {RFValue} from 'react-native-responsive-fontsize';

import {useAppNavigation} from '@hooks';

import {Box, BoxProps} from '../Box';
import {ImageCached} from '../ImageCache';
import {Text} from '../Text';
import {TouchableOpacityBox} from '../TouchableOpacityBox';

interface FeedContentNewEventProps {
  item: Evento;
  boxProps?: BoxProps;
  navigateEventDetail?: boolean;
}

export function FeedEvent({
  item,
  boxProps,
  navigateEventDetail = true,
}: FeedContentNewEventProps) {
  const navigation = useAppNavigation();

  function goEventDetail(event_id: string) {
    if (navigateEventDetail) {
      navigation.navigate('EventDetail', {event_id});
    }
  }

  function getVisibleName({visibilidade}: Pick<EventoDTO, 'visibilidade'>) {
    if (visibilidade === 'PARTICIPANTES_EVENTO') {
      return 'Participantes';
    }
    if (visibilidade === 'PUBLICO_GERAL') {
      return 'Público geral';
    }
    if (visibilidade === 'REDE_AMIGOS') {
      return 'Rede de amigos';
    }
  }

  const Container = navigateEventDetail ? TouchableOpacityBox : Box;

  return (
    <Box
      flex={1}
      flexDirection="row"
      padding="s8"
      marginTop="s16"
      backgroundColor="gray_100"
      borderRadius="br10"
      {...boxProps}>
      <Container
        flex={1}
        flexDirection="row"
        backgroundColor="gray_100"
        gap="s16"
        borderRightColor="primary_700"
        borderRightWidth={RFValue(4)}
        borderTopRightRadius="br10"
        alignItems="center"
        justifyContent="center"
        onPress={() => {
          if (navigateEventDetail) {
            goEventDetail(item.id!);
          }
        }}>
        <ImageCached
          source={{uri: item?.foto}}
          style={{
            height: RFValue(84),
            width: RFValue(84),
            borderRadius: RFValue(10),
          }}
          contentFit="cover"
        />
        <Box justifyContent="space-between" flex={1} gap="s4">
          <Box>
            <Text variant="feed_desc_evento">{item?.nome}</Text>
          </Box>
          <Box flexDirection="row" justifyContent="flex-start" gap="s4">
            <Text variant="feed_data_hora_bold">Inicio:</Text>
            <Text variant="feed_data_hora">{item?.data_hora_inicio}</Text>
          </Box>
          <Box flexDirection="row" justifyContent="flex-start" gap="s4">
            <Text variant="feed_data_hora_bold">Fim:</Text>
            <Text variant="feed_data_hora">
              {item?.data_hora_final || 'Sem definição'}
            </Text>
          </Box>
          <Box
            flex={1}
            flexDirection="row"
            justifyContent="flex-start"
            gap="s4">
            <Text variant="feed_data_hora_bold">Visibilidade:</Text>
            <Text variant="feed_data_hora">
              {getVisibleName({visibilidade: item.visibilidade})}
            </Text>
          </Box>
          <Box flexDirection="row" justifyContent="flex-start" gap="s4">
            <Text variant="feed_data_hora_bold">Participantes:</Text>
            <Text variant="feed_data_hora">{item.participantes || 0}</Text>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
