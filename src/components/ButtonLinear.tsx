import { ActivityIndicator } from "react-native";

import { useTheme } from "@shopify/restyle";
import { LinearGradient } from "expo-linear-gradient";
import { RFValue } from "react-native-responsive-fontsize";

import { ThemeProps } from "@themes";

import { Text } from "./Text";
import {
  TouchableOpacityBox,
  TouchableOpacityBoxProps,
} from "./TouchableOpacityBox";

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
