import {ActivityIndicator} from 'react-native'

import {useTheme} from '@shopify/restyle'
import {RFValue} from 'react-native-responsive-fontsize'

import {ThemeProps} from '@themes'

import {
  TouchableOpacityBox,
  TouchableOpacityBoxProps
} from '../TouchableOpacityBox'

import {Text} from './../Text'
import {ButtonPreset, buttonPresets} from './ButtonPresets'

interface ButtonProps extends TouchableOpacityBoxProps {
  title: string
  loading?: boolean
  disabled?: boolean
  preset?: ButtonPreset
}

export function Button({
  title,
  loading,
  preset = 'primary',
  disabled = false,
  ...touchableOpacityBoxProps
}: ButtonProps) {
  const {colors} = useTheme<ThemeProps>()

  const buttonPreset = buttonPresets[preset][disabled ? 'disabled' : 'default']

  return (
    <TouchableOpacityBox
      disabled={disabled || loading}
      paddingHorizontal="s24"
      alignItems="center"
      justifyContent="center"
      borderRadius="br10"
      height={RFValue(50)}
      {...buttonPreset.container}
      {...touchableOpacityBoxProps}>
      {loading ? (
        <ActivityIndicator color={colors[buttonPreset.content]} />
      ) : (
        <Text variant="button" color={buttonPreset.content}>
          {title}
        </Text>
      )}
    </TouchableOpacityBox>
  )
}
