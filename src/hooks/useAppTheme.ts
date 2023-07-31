import { useTheme } from '@shopify/restyle'
import { ThemeProps } from '@themes/index'

export function useAppTheme () {
  return useTheme<ThemeProps>()
}
