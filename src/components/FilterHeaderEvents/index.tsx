import {useState} from 'react';

import {RFValue} from 'react-native-responsive-fontsize';

import {Box} from '../Box';
import {Text} from '../Text';
import {TouchableOpacityBox} from '../TouchableOpacityBox';

const FILTER_HEIGHT = RFValue(40);
const MEUS_EVENTOS = 'MEUS_EVENTOS';
const EVENTOS_AMIGOS = 'EVENTOS_AMIGOS';

export interface FilterHeaderEventsProps {
  setFilterEvents: (filter: string) => void;
}

export function FilterHeaderEvents({setFilterEvents}: FilterHeaderEventsProps) {
  const [filter, setFilter] = useState('');

  function changeFilter(param_filter: string) {
    if (param_filter === filter) {
      setFilter('');
      setFilterEvents('');
      return;
    }
    setFilter(param_filter);
    setFilterEvents(param_filter);
  }

  return (
    <Box
      height={FILTER_HEIGHT}
      flexDirection="row"
      alignItems="center"
      justifyContent="center"
      marginHorizontal="s16"
      gap="s4"
      borderTopStartRadius="br10"
      borderTopEndRadius="br10">
      <TouchableOpacityBox
        flex={1}
        height={FILTER_HEIGHT}
        alignItems="center"
        justifyContent="center"
        borderBottomColor="primary_300"
        borderBottomWidth={RFValue(2)}
        onPress={() => changeFilter(MEUS_EVENTOS)}
        backgroundColor={filter === MEUS_EVENTOS ? 'primary_100' : 'white'}
        borderTopStartRadius="br10"
        borderTopEndRadius="br10">
        <Text
          variant="event_filter_screen"
          color={filter === MEUS_EVENTOS ? 'primary_500' : 'primary_300'}>
          MEUS EVENTOS
        </Text>
      </TouchableOpacityBox>
      <TouchableOpacityBox
        flex={1}
        height={FILTER_HEIGHT}
        alignItems="center"
        justifyContent="center"
        borderBottomColor="primary_700"
        borderBottomWidth={RFValue(2)}
        onPress={() => changeFilter(EVENTOS_AMIGOS)}
        backgroundColor={
          filter === EVENTOS_AMIGOS ? 'gray_background_header' : 'white'
        }
        borderTopStartRadius="br10"
        borderTopEndRadius="br10">
        <Text
          variant="event_filter_screen"
          color={filter === EVENTOS_AMIGOS ? 'primary_700' : 'gray_700'}>
          DEMAIS EVENTOS
        </Text>
      </TouchableOpacityBox>
    </Box>
  );
}
