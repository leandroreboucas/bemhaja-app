import { LinearGradient, LinearGradientProps } from "expo-linear-gradient";

import { useTheme } from "@shopify/restyle";
import { ThemeColors, ThemeProps } from "@themes/index";

import { Text } from "@components/Text";
import { ActivityIndicator } from "react-native";
import {
  TouchableOpacityBox,
  TouchableOpacityBoxProps,
} from "./TouchableOpacityBox";
import { RFValue } from "react-native-responsive-fontsize";

interface ButtonLinearProps extends TouchableOpacityBoxProps {
  title: string;
  loading?: boolean;
  disabled?: boolean;
  buttonWidth?: number;
}

export function ButtonLinear({
  title,
  loading,
  disabled = false,
  buttonWidth,
  ...touchableOpacityBoxProps
}: ButtonLinearProps) {
  const { colors } = useTheme<ThemeProps>();

  const buttonContrast = disabled ? "gray_disabled_Content" : "white";

  return (
    <LinearGradient
      colors={
        disabled
          ? [colors.gray_disabled_Background, colors.gray_disabled_Background]
          : [colors.primary_500, colors.secondary_300]
      }
      start={{ x: 0, y: 1 }}
      end={{ x: 1, y: 0 }}
      style={{
        borderRadius: RFValue(10),
        width: buttonWidth,
      }}
    >
      <TouchableOpacityBox
        disabled={disabled || loading}
        paddingHorizontal="s24"
        alignItems="center"
        justifyContent="center"
        height={RFValue(48)}
        {...touchableOpacityBoxProps}
      >
        {loading ? (
          <ActivityIndicator color={colors.white} />
        ) : (
          <Text variant="button" color={buttonContrast}>
            {title}
          </Text>
        )}
      </TouchableOpacityBox>
    </LinearGradient>
  );
}
