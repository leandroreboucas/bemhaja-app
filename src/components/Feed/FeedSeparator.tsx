import {RFValue} from 'react-native-responsive-fontsize';

import {Box} from '../Box';

export function FeedSeparator() {
  return (
    <Box
      marginHorizontal="s24"
      flexDirection="row"
      backgroundColor="gray_300"
      height={RFValue(5)}
    />
  );
}
