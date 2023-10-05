import {ComponentProps} from 'react';

import {createBox} from '@shopify/restyle';

import {ThemeProps} from '@themes';

export const Box = createBox<ThemeProps>();
export type BoxProps = ComponentProps<typeof Box>;
