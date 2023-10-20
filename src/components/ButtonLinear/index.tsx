import {ActivityIndicator} from 'react-native';

import {LinearGradient} from 'expo-linear-gradient';
import {RFValue} from 'react-native-responsive-fontsize';

import {useAppTheme} from '@hooks';

import {Box} from '../Box';
import {Icon, IconNames} from '../Icon';
import {Text} from '../Text';
import {
  TouchableOpacityBox,
  TouchableOpacityBoxProps,
} from '../TouchableOpacityBox';

interface ButtonLinearProps extends TouchableOpacityBoxProps {
  title: string;
  loading?: boolean;
  disabled?: boolean;
  buttonWidth?: number;
  iconLeft?: IconNames;
}

export function ButtonLinear({
  title,
  loading,
  disabled = false,
  buttonWidth,
  iconLeft = undefined,
  ...touchableOpacityBoxProps
}: ButtonLinearProps) {
  const {colors} = useAppTheme();

  const buttonContrast = disabled ? 'gray_disabled_Content' : 'white';

  return (
    <LinearGradient
      colors={
        disabled
          ? [colors.gray_disabled_Background, colors.gray_disabled_Background]
          : [colors.primary_500, colors.secondary_300]
      }
      start={{x: 0, y: 1}}
      end={{x: 1, y: 0}}
      style={{
        borderRadius: RFValue(10),
        width: buttonWidth,
      }}>
      <TouchableOpacityBox
        flexDirection="row"
        disabled={disabled || loading}
        paddingHorizontal="s24"
        alignItems="center"
        justifyContent="center"
        height={RFValue(48)}
        {...touchableOpacityBoxProps}>
        {loading ? (
          <ActivityIndicator color={colors.white} />
        ) : (
          <Box flexDirection="row" alignItems="center" justifyContent="center">
            {iconLeft && (
              <Box marginHorizontal="s16">
                <Icon name={iconLeft} color="white" size={24} />
              </Box>
            )}
            <Box>
              <Text variant="button" color={buttonContrast}>
                {title}
              </Text>
            </Box>
          </Box>
        )}
      </TouchableOpacityBox>
    </LinearGradient>
  );
}
