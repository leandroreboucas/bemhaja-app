import {Box} from '../Box';
import {Text} from '../Text';

interface FeedTextProps {
  text: string;
}

export function FeedText({text}: FeedTextProps) {
  return (
    <Box flex={1} marginTop="s16">
      <Text variant="feed_text" textAlign="justify">
        {text}
      </Text>
    </Box>
  );
}
