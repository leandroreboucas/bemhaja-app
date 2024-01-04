import {ResizeMode, Video} from 'expo-av';
import {RFValue} from 'react-native-responsive-fontsize';

import {Box} from '../Box';

interface FeedVideoProps {
  uri: string;
}

export function FeedVideo({uri}: FeedVideoProps) {
  if (!uri) {
    return null;
  }
  return (
    <Box flex={1} marginTop="s16">
      <Video
        source={{
          uri,
        }}
        style={{
          height: RFValue(300),
          width: '100%',
          borderRadius: RFValue(8),
        }}
        useNativeControls
        resizeMode={ResizeMode.COVER}
      />
    </Box>
  );
}
