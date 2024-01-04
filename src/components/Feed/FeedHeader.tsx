import {FeedDTO} from '@domain';
import {RFValue} from 'react-native-responsive-fontsize';

import {Box} from '../Box';
import {Icon} from '../Icon';
import {ImageCached} from '../ImageCache';
import {Text} from '../Text';

interface FeedHeaderProps {
  item: FeedDTO;
  removeProfile?: boolean;
}

export function FeedHeader({item, removeProfile}: FeedHeaderProps) {
  return (
    <Box
      flex={1}
      backgroundColor="white"
      flexDirection="row"
      marginTop="s16"
      alignItems="center">
      <Box flexDirection="row" flex={1} gap="s8" flexGrow={1}>
        {!removeProfile && (
          // <Image
          //   source={{uri: item.usuario.foto}}
          //   style={{width: RFValue(48), height: RFValue(48)}}
          //   borderRadius={RFValue(48) / 2}
          //   resizeMode="cover"
          // />
          <ImageCached
            source={{uri: item.usuario.foto}}
            style={{
              height: RFValue(48),
              width: RFValue(48),
              borderRadius: RFValue(48) / 2,
            }}
            contentFit="cover"
          />
        )}
        <Box justifyContent="center" flex={1}>
          {!removeProfile && (
            <Text variant="feed_user_name">{item.usuario.nome}</Text>
          )}

          <Text variant="feed_data_hora">{item.data_cadastro}</Text>
        </Box>
      </Box>

      <Box marginLeft="s8" gap="s4" flexDirection="row" alignItems="center">
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
        {item.tipo === 'POSTAGEM_AVULSA' && (
          <>
            <Icon name="events" color="gray_600" size={RFValue(14)} />
            <Text variant="feed_acao">Postagem</Text>
          </>
        )}
        {item.tipo === 'ATITUDE_REALIZADA' && (
          <>
            <Icon name="checked" color="gray_600" size={RFValue(14)} />
            <Text variant="feed_acao">Atitude</Text>
          </>
        )}
      </Box>
    </Box>
  );
}
