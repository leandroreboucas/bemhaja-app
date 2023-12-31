import {createTheme} from '@shopify/restyle';
import {RFValue} from 'react-native-responsive-fontsize';

import {colors} from './colors';
import {spacing} from './spacing';
import {textVariants} from './textVariants';

const theme = createTheme({
  colors,
  spacing,
  textVariants,
  borderRadii: {
    br4: RFValue(4),
    br10: RFValue(10),
    br20: RFValue(20),
  },
});

type ThemeProps = typeof theme;

type ThemeColors = keyof ThemeProps['colors'];

export {theme, ThemeProps, ThemeColors};
