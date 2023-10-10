import {FeedDTO} from '@dtos';

import {Box} from '../Box';
import {Text} from '../Text';

interface FeedTitleProps {
  item: FeedDTO;
}

export function FeedTitle({item}: FeedTitleProps) {
  return (
    <Box
      flex={1}
      flexDirection="row"
      alignItems="center"
      justifyContent="center"
      marginBottom="s16">
      {item.tipo === 'POSTAGEM_AVULSA' && (
        <Text variant="feed_title">{item.titulo}</Text>
      )}
    </Box>
  );
}
