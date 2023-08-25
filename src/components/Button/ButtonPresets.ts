import { TouchableOpacityBoxProps } from '@components/TouchableOpacityBox'
import { ThemeColors } from '@themes/index'
import { RFValue } from 'react-native-responsive-fontsize'

export type ButtonPreset = 'primary' | 'outline'

export interface ButtonUI {
  container: TouchableOpacityBoxProps
  content: ThemeColors
}

export const buttonPresets: Record<
  ButtonPreset,
  {
    default: ButtonUI
    disabled: ButtonUI
  }
> = {
  primary: {
    default: {
      container: {
        backgroundColor: 'buttonPrimary'
      },
      content: 'white'
    },
    disabled: {
      container: {
        backgroundColor: 'gray_disabled_Background'
      },
      content: 'gray_disabled_Content'
    }
  },
  outline: {
    default: {
      container: {
        borderWidth: RFValue(1),
        borderColor: 'buttonPrimary'
      },
      content: 'buttonPrimary'
    },
    disabled: {
      container: {
        borderWidth: RFValue(1),
        borderColor: 'gray_disabled_Background'
      },
      content: 'gray_disabled_Content'
    }
  }
}
