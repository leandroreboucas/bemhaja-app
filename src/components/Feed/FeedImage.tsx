import {Image} from 'react-native';

import {RFValue} from 'react-native-responsive-fontsize';

import {Box} from '../Box';

interface FeedImageProps {
  foto: string;
}

export function FeedImage({foto}: FeedImageProps) {
  return (
    <Box flex={1} marginTop="s16">
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
