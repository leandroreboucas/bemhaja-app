import {Box} from '../Box';
import {Text} from '../Text';

export function Toast() {
  return (
    <Box
      position="absolute"
      alignSelf="center"
      top={100}
      backgroundColor="primary_300"
      width={150}
      height={100}>
      <Text>Toast</Text>
    </Box>
  );
}
