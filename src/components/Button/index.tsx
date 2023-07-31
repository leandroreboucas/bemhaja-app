import { useTheme } from "@shopify/restyle";
import { ThemeProps } from "@themes/index";

import { Text } from "@components/Text";
import { ActivityIndicator } from "react-native";
import {
  TouchableOpacityBox,
  TouchableOpacityBoxProps,
} from "../TouchableOpacityBox";
import { ButtonPreset, buttonPresets } from "./ButtonPresets";

interface ButtonProps extends TouchableOpacityBoxProps {
  title: string;
  loading?: boolean;
  disabled?: boolean;
  preset?: ButtonPreset;
}

export function Button({
  title,
  loading,
  preset = "primary",
  disabled = false,
  ...touchableOpacityBoxProps
}: ButtonProps) {
  const { colors } = useTheme<ThemeProps>();

  const buttonPreset = buttonPresets[preset][disabled ? "disabled" : "default"];

  return (
    <TouchableOpacityBox
      disabled={disabled || loading}
      paddingHorizontal="s24"
      alignItems="center"
      justifyContent="center"
      borderRadius="br10"
      height={50}
      {...buttonPreset.container}
      {...touchableOpacityBoxProps}
    >
      {loading ? (
        <ActivityIndicator color={colors[buttonPreset.content]} />
      ) : (
        <Text variant="button" color={buttonPreset.content}>
          {title}
        </Text>
      )}
    </TouchableOpacityBox>
  );
}
