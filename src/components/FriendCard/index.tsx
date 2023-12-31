import {UsuarioDTO} from '@domain';
import {RFValue} from 'react-native-responsive-fontsize';

import {Box} from '../Box';
import {ImageCached} from '../ImageCache';
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
      {/* <Image
        source={{
          uri: item.foto
            ? item.foto
            : `https://ui-avatars.com/api/?name=${item.nome}&size=48`,
        }}
        style={{width: RFValue(48), height: RFValue(48)}}
        borderRadius={RFValue(48) / 2}
        resizeMode="cover"
      /> */}
      <ImageCached
        source={{
          uri: item.foto
            ? item.foto
            : `https://ui-avatars.com/api/?name=${item.nome}&size=48`,
        }}
        style={{
          width: RFValue(48),
          height: RFValue(48),
          borderRadius: RFValue(48) / 2,
        }}
        contentFit="cover"
      />
      <Box>
        <Text variant="friends_card_name">{item.nome}</Text>
        <Text variant="friends_meta_events_count">
          BemHaja: {item.atitudes_realizadas || 0}
        </Text>
      </Box>
    </Box>
  );
}
