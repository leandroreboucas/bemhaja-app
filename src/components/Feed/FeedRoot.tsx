import {ReactNode} from 'react';

import {Box} from '../Box';

interface FeedRootProps {
  children: ReactNode;
}

export function FeedRoot({children}: FeedRootProps) {
  return (
    <Box
      marginHorizontal="s16"
      paddingHorizontal="s8"
      backgroundColor="white"
      borderRadius="br10">
      {children}
    </Box>
  );
}
