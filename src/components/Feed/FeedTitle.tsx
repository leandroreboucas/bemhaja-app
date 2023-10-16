import {Box} from '../Box';
import {Text} from '../Text';

interface FeedTitleProps {
  title: string;
}

export function FeedTitle({title}: FeedTitleProps) {
  if (!title) {
    return null;
  }
  return (
    <Box
      flex={1}
      flexDirection="row"
      alignItems="center"
      justifyContent="center"
      marginTop="s16">
      <Text variant="feed_title">{title}</Text>
    </Box>
  );
}
