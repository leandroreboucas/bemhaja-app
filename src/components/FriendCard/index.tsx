import {Image} from 'react-native';

import {UsuarioDTO} from '@dtos';
import {RFValue} from 'react-native-responsive-fontsize';

import {Box} from '../Box';
import {Text} from '../Text';

interface FriendCardProps {
  item: UsuarioDTO;
}

export function FriendCard({item}: FriendCardProps) {
  return (
    <Box
      flexDirection="row"
      marginHorizontal="s16"
      alignItems="center"
      paddingVertical="s16"
      gap="s16">
      <Image
        source={{uri: item.foto}}
        style={{width: RFValue(48), height: RFValue(48)}}
        borderRadius={RFValue(48) / 2}
        resizeMode="cover"
      />
      <Box>
        <Text variant="friends_card_name">{item.nome}</Text>
        <Text variant="friends_meta_events_count">
          BemHaja: {item.meta?.eventos || 0}
        </Text>
      </Box>
    </Box>
  );
}
