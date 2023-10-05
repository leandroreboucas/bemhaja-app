import {ListRenderItemInfo, Image} from 'react-native';

import {FeedDTO} from '@dtos';
import {RFValue} from 'react-native-responsive-fontsize';

import {Box} from '../Box';
import {Icon} from '../Icon';
import {Text} from '../Text';

interface FeedHeaderProps {
  item: FeedDTO;
}

export function FeedHeader({item}: FeedHeaderProps) {
  return (
    <Box
      flex={1}
      flexDirection="row"
      marginTop="s20"
      marginBottom="s16"
      alignItems="center">
      <Image
        source={{uri: item.usuario.foto}}
        style={{width: RFValue(48), height: RFValue(48)}}
        borderRadius={RFValue(48) / 2}
        resizeMode="cover"
      />
      <Box justifyContent="center" marginLeft="s8" flex={1}>
        <Text variant="feed_user_name">{item.evento?.usuario.nome}</Text>
        <Text variant="feed_data_hora">{item.evento?.data_cadastro}</Text>
      </Box>
      <Box
        marginLeft="s8"
        gap="s4"
        flexDirection="row"
        alignItems="center"
        flex={1}>
        {item.tipo === 'EVENTO_CRIADO' && (
          <>
            <Icon name="events" color="gray_600" size={RFValue(14)} />
            <Text variant="feed_acao">Criou um evento</Text>
          </>
        )}
        {item.tipo === 'EVENTO_FINALIZADO' && (
          <>
            <Icon name="events" color="gray_600" size={RFValue(14)} />
            <Text variant="feed_acao">Finalizou o evento</Text>
          </>
        )}
      </Box>
    </Box>
  );
}