import {useTheme} from '@shopify/restyle';

import {ThemeProps} from '@themes';

export function useAppTheme() {
  return useTheme<ThemeProps>();
}
