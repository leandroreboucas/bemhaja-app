import {ReactNode} from 'react';

import {Box} from '../Box';

interface FeedRootProps {
  children: ReactNode;
}

export function FeedRoot({children}: FeedRootProps) {
  return <Box>{children}</Box>;
}
