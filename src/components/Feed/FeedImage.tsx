import {Image} from 'react-native';

import {RFValue} from 'react-native-responsive-fontsize';

import {Box} from '../Box';

interface FeedImage {
  foto: string;
}

export function FeedImage({foto}: FeedImage) {
  return (
    <Box flex={1} marginBottom="s16">
      <Image
        source={{uri: foto}}
        resizeMode="cover"
        style={{
          height: RFValue(300),
          width: '100%',
          borderRadius: RFValue(8),
        }}
      />
    </Box>
  );
}
