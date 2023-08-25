import { textVariants } from './textVariants'
import { createTheme } from '@shopify/restyle'
import { spacing } from './spacing'
import { colors } from './colors'
import { RFValue } from 'react-native-responsive-fontsize'

const theme = createTheme({
  colors,
  spacing,
  textVariants,
  borderRadii: {
    br10: RFValue(10)
  }
})

type ThemeProps = typeof theme

type ThemeColors = keyof ThemeProps['colors']

export { theme, ThemeProps, ThemeColors }
