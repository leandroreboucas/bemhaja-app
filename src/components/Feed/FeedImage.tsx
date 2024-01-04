import {RFValue} from 'react-native-responsive-fontsize';

import {Box} from '../Box';
import {ImageCached} from '../ImageCache';

interface FeedImageProps {
  foto: string;
}

export function FeedImage({foto}: FeedImageProps) {
  return (
    <Box flex={1} marginTop="s16">
      {/* <Image
        source={{uri: foto, cache: 'only-if-cached'}}
        resizeMode="cover"
        style={{
          height: RFValue(300),
          width: '100%',
          borderRadius: RFValue(8),
        }}
      /> */}
      <ImageCached
        source={{uri: foto}}
        style={{
          height: RFValue(300),
          width: '100%',
          borderRadius: RFValue(8),
        }}
        contentFit="cover"
      />
    </Box>
  );
}
