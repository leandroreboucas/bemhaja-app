import {Behavior} from '@domain';

import {Box} from '../Box';
import {Text} from '../Text';

interface BehaviorCardProps {
  item: Behavior;
}

export function BehaviorCard({item}: BehaviorCardProps) {
  return (
    <Box
      flexDirection="row"
      marginHorizontal="s16"
      alignItems="center"
      paddingVertical="s16"
      gap="s16">
      <Box>
        <Text variant="friends_card_name">{item.descricao}</Text>
        <Text variant="friends_meta_events_count">{item.grupo}</Text>
      </Box>
    </Box>
  );
}
